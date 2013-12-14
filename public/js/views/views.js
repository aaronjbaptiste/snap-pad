define(['module', 'backbone.raphael', 'raphael', 'raphael.json', 'raphael.export',
	'models/models', 'collections/collections'], function(module, Backbone, Raphael) {

	Raphael.fn.arrow = function (x1, y1, x2, y2, asize, strokeWidth, color) {
		strokeWidth = typeof strokeWidth !== 'undefined' ? strokeWidth : 1;
		color = typeof color !== 'undefined' ? color : "#000000";

	    var angle = Math.atan2(x1-x2,y2-y1);
	    angle = (angle / (2 * Math.PI)) * 360;
	    var arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2 - asize) + " " + (y2 - asize) + " L" + (x2 - asize) + " " + (y2 + asize) + " L" + x2 + " " + y2 ).attr("fill",color).rotate((90+angle),x2,y2);
	    arrowPath.attr({stroke: color,"stroke-width": strokeWidth});
	    var linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);
	    linePath.attr({stroke: color,"stroke-width": strokeWidth});
	    return [linePath,arrowPath];
	}

	App.Views.Main = Backbone.View.extend({
		el: "body",
		initialize: function() {
			this.canvas = new App.Views.Canvas({collection: new App.Collections.Canvas});
			this.canvas.render();
			this.toolbar = new App.Views.Toolbar({canvas: this.canvas});
		}
	});

	App.Views.Toolbar = Backbone.View.extend({
		el: "#toolbar",
		events: {
			"click .drawCircle": "onDrawCircle",
			"click .drawSquare": "onDrawSquare",
			"click .drawFree": "onDrawFree",
			"click .drawArrow": "onDrawArrow",
			"click .save": "onSave",
			"click .export": "onExport",
			"click .delete": "onDelete",
		},
		initialize: function(options) {
			//TODO use pub sub instead?
			this.canvas = options.canvas;
		},
		onDrawCircle: function() {
			this.canvas.draw(App.Views.Circle, App.Models.Circle);
		},
		onDrawSquare: function() {
			this.canvas.draw(App.Views.Square, App.Models.Square);
		},
		onDrawFree: function() {
			this.canvas.draw(App.Views.FreeDraw, App.Models.FreeDraw);
		},
		onDrawArrow: function() {
			this.canvas.draw(App.Views.Arrow, App.Models.Arrow);
		},
		onSave: function() {
			var paperData = {
				paper: this.canvas.paper.toJSON()
			};

			$.ajax({
			  type: "PATCH",
			  url: "/image/" + module.config().image.id,
			  data: paperData,
			  dataType: "json"
			});
		},
		onExport: function() {
			var svg = this.canvas.paper.toSVG();
			var canvas = $('<canvas>')[0];
						
			if (typeof FlashCanvas != "undefined") {
			    FlashCanvas.initElement(canvas);
			}

			canvg(canvas, svg, {
				ignoreMouse: true,
  				ignoreAnimation: true,
  				ignoreClear: true,
  				renderCallback: function() {
	  				setTimeout(function() {
  				    	canvas2png(canvas);
  				  	}, 100);
  				}
			});

			//fixme save.php is failing? I think that used to rename it
		},
		onDelete: function() {
			$.ajax({
			  type: "DELETE",
			  url: "/image/" + module.config().image.id,
			  success: function() {
			  	location.href='/';
			  }
			});
		}
	});

	App.Views.Canvas = Backbone.View.extend({
		el : "#drawing-board",
		initialize: function() {
			var imageJson = module.config().image;
			this.paper = Raphael("drawing-board", imageJson.width, imageJson.height);
			this.collection.on("add", this.addOne, this);
		},
		render: function() {
			var imageJson = module.config().image;
			var paper = this.paper;

			this.collection.each(function(shape) {
				this.addOne(shape);
			}, this);

			//TODO
			//populate collection straight from paperJson
			//need to align model properties with Raphael properties
			//get the server to generate a paper json for just the image?
			//then you dont need to send the image path separately
			
			if (imageJson.paperJson) {
				paper.fromJSON(imageJson.paperJson);
			} else {
				this.collection.add({
					type: "Image",
					src: imageJson.path,
					width: imageJson.width,
					height: imageJson.height
				});
			}

			return this;
		},
		addOne: function(shape) {
			var view = App.Views[shape.get("type")];
			new view({model: shape, paper: this.paper});
		},
		draw: function(view, model) {
			var svg = this.$('svg'),
				that = this;

			svg.off("mousedown");
			svg.mouseup(function() {
		        svg.off("mousemove");
		    });

			svg.mousedown(function(e) {
				var parentOffset = svg.offset(); 
			  	var startX = e.pageX - parentOffset.left;
			  	var startY = e.pageY - parentOffset.top;

			  	var shape = new model().start(startX, startY);
			  	that.collection.add(shape);

				svg.mousemove(function(e) {
				  	shape.move(e.pageX - parentOffset.left, e.pageY - parentOffset.top);
			    });
			});
		}
	});

	App.Views.Circle = Backbone.RaphaelView.extend({
		initialize: function(options) {
			var model = this.model;
			model.on("change", this.render, this);
			var circle = options.paper.ellipse(
				model.get("x"), 
				model.get("y"), 
				model.get("rx"),
				model.get("ry")
			).attr({
				"stroke": model.get("color"),
				"stroke-width": model.get("stroke"),
			});
	        this.setElement(circle);
		},
		render: function() {
			var circle = this.el;
	        var model = this.model;
	        circle.attr({
	            cx: model.get("x"),
	            cy: model.get("y"),
	            rx: model.get("rx"),
	            ry: model.get("ry"),
	            stroke: model.get("color"),
	            "stroke-width": model.get("stroke")
	        });
			return this;
		}
	});

	App.Views.Square = Backbone.RaphaelView.extend({
		initialize: function(options) {
			var model = this.model;
			model.on("change", this.render, this);
			var rect = options.paper.rect(
				model.get("x"), 
				model.get("y"), 
				model.get("width"),
				model.get("height")
			).attr({
				"stroke": model.get("color"),
				"stroke-width": model.get("stroke"),
			});
	        this.setElement(rect);
		},
		render: function() {
			var rect = this.el;
	        var model = this.model;
	        rect.attr({
	            x: model.get("x"),
	            y: model.get("y"),
	            width: model.get("width"),
	            height: model.get("height"),
	            stroke: model.get("color"),
	            "stroke-width": model.get("stroke")
	        });
			return this;
		}
	});

	App.Views.FreeDraw = Backbone.RaphaelView.extend({
		initialize: function(options) {
			var model = this.model;
			model.on("change", this.render, this);
			var path = options.paper.path(this.model.get("path")).attr({
				stroke: model.get("color"),
				"stroke-width": model.get("stroke"),
			});
	        this.setElement(path);
		},
		render: function() {
			var path = this.el;
	        var model = this.model;
	        path.attr({
	            path: model.get('path'),
				stroke: model.get('color'), 
				"stroke-width": model.get('stroke')
	        });
			return this;
		},
	});

	App.Views.Arrow = Backbone.View.extend({
		initialize: function(options) {
			this.model.on("change", this.render, this);
			this.paper = options.paper;
			this.render();
		},
		render: function() {
			var model = this.model;
			this.remove();
	        this.shape = this.paper.arrow(
	        	model.get("tx"), 
	        	model.get("ty"), 
	        	model.get("ax"), 
	        	model.get("ay"), 
	        	model.get("stroke") * 3, 
	        	model.get("stroke"), 
	        	model.get("color")
        	);
        	this.setElement(this.shape);
        	return this;
		},
		remove: function() {
			if(typeof this.shape != "undefined"){
				this.shape[0].remove();
				this.shape[1].remove();
			}
		}
	});

	App.Views.Image = Backbone.RaphaelView.extend({
		initialize: function(options) {
			var model = this.model;
			var image = options.paper.image(
				model.get("src"),
				model.get("x"),
				model.get("y"),
				model.get("width"),
				model.get("height")
			);
			this.setElement(image);
			model.on("change", this.render, this);
		},
		render: function() {
			var model = this.model;
			this.el.attr({
				"src": model.get("src"),
				"x": model.get("x"),
				"y": model.get("y"),
				"width": model.get("width"),
				"height": model.get("height")
			});
			return this;
		}
	});

	return App.Views.Main;

});
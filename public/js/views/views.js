define(['module', 'backbone', 'models/models', 'collections/collections'], function(module, Backbone) {

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
			//todo use pub sub instead?
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
			this.collection.on("add", this.addOne, this);
		},
		render: function() {
			var imageJson = module.config().image;
			var paper = Raphael("drawing-board", imageJson.width, imageJson.height);
			this.paper = paper;
			
			if (imageJson.paperJson) {
				paper.fromJSON(imageJson.paperJson);
			} else {
				var image = imageJson.path;
				paper.image(image, 0, 0, imageJson.width, imageJson.height);
			}

			return this;
		},
		addOne: function(shape) {
			var view = App.Views[shape.get("type")];
			new view({model: shape, el: this.paper}).render();
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

	App.Views.Circle = Backbone.View.extend({
		initialize: function() {
			this.model.on("change", function() {
				this.render();
			}, this)
		},
		render: function() {
			var model = this.model;
			this.remove();
			this.shape = this.el.ellipse(
				model.get("x"), 
				model.get("y"), 
				model.get("rx"), 
				model.get("ry")
			);
			this.shape.attr("stroke", this.model.get("color"));
			this.shape.attr("stroke-width", this.model.get("stroke"));
			return this;
		},
		remove: function() {
			if(typeof this.shape != "undefined"){
				this.shape.remove();
			}
		}
	});

	App.Views.Square = Backbone.View.extend({
		initialize: function() {
			this.model.on("change", function() {
				this.render();
			}, this)
		},
		render: function() {
			var model = this.model;
			this.remove();
			this.shape = this.el.rect(
				model.get("x"), 
				model.get("y"), 
				model.get("width"), 
				model.get("height")
			);
			this.shape.attr("stroke", this.model.get("color"));
			this.shape.attr("stroke-width", this.model.get("stroke"));
			return this;
		},
		remove: function() {
			if(typeof this.shape != "undefined"){
				this.shape.remove();
			}
		}
	});

	App.Views.FreeDraw = Backbone.View.extend({
		initialize: function() {
			this.model.on("change", function() {
				this.render();
			}, this);
			this.shape = this.el.path(this.model.get("path"));
		},
		render: function() {
			var model = this.model;
			var path = this.model.get("path");
			this.shape.attr({
				"path": path,
				"stroke": model.get('color'), 
				"stroke-width": model.get('stroke')
			});
			return this;
		},
		remove: function() {}
	});

	App.Views.Arrow = Backbone.View.extend({
		initialize: function() {
			this.model.on("change", function() {
				this.render();
			}, this)
		},
		render: function() {
			var model = this.model;
			this.remove();
	        this.shape = this.el.arrow(
	        	model.get("tx"), 
	        	model.get("ty"), 
	        	model.get("ax"), 
	        	model.get("ay"), 
	        	model.get("stroke") * 3, 
	        	model.get("stroke"), 
	        	model.get("color")
        	);
        	return this;
		},
		remove: function() {
			if(typeof this.shape != "undefined"){
				this.shape[0].remove();
				this.shape[1].remove();
			}
		}
	});

	return App.Views.Main;

});
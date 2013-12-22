define(['module', 'backbone.raphael', 'raphael', 'raphael.export', 'models/models', 
	'collections/collections', 'backbone.undo', 'jquery.shortcut', 'spectrum'], 
	function(module, Backbone, Raphael) {

	/* utility */
	var evt = _.extend({}, Backbone.Events);
	var undoMan = new Backbone.UndoManager();
	Backbone.UndoManager.removeUndoType("change");

	$.Shortcut.on("ctrl + Z", function (e) {
	    undoMan.undo(true);
	});

	$.Shortcut.on("ctrl + shift + Z", function (e) {
	    undoMan.redo(true);
	});

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
			var model = this.model = new App.Models.Main(module.config().image);

			evt.on("save", model.save, model);
			evt.on("delete", this.delete, this);
			evt.on("export", this.export, this);

			this.render();

			model.on("change:paperJson", function() {
				console.log("changed");
			}, this);

			// setInterval(function() {
			// 	model.fetch();
			// }, 3000);
		},
		render: function() {
			console.log("render main");
			this.canvas = new App.Views.Canvas({
				collection: this.model.get("paperJson")
			});
			this.toolbar = new App.Views.Toolbar();
			undoMan.startTracking();
		},
		delete: function() {
			this.model.destroy({wait: true, success: function () {
		  		location.href='/';
			}});
		},
		export: function() {
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

			//FIXME save.php is failing? I think that used to rename it
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
		initialize: function() {
			this.$("#color").spectrum({
    			color: App.Models.Defaults.color,
    			showPaletteOnly: true,
    			showPalette: true,
			    palette: [
			        ['#1abc9c', '#2ecc71', "#3498db", "#ee799f", "#34495e"],
			        ['#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'],
			        ['#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6'],
			        ['#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'],
			        ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff']
			    ],
			    change: function(color) {
			    	App.Models.Defaults.color = color.toHexString();
			    	console.log(App.Models.Defaults.color);
			    }
			});
			
			this.$('#stroke').on("change", function() {
				App.Models.Defaults.stroke = $(this).val();
			});
		},
		onDrawCircle: function() {
			evt.trigger("draw", "Circle");
		},
		onDrawSquare: function() {
			evt.trigger("draw", "Square");
		},
		onDrawFree: function() {
			evt.trigger("draw", "FreeDraw");
		},
		onDrawArrow: function() {
			evt.trigger("draw", "Arrow");
		},
		onSave: function() {
			evt.trigger("save");
		},
		onExport: function() {
			evt.trigger("export");
		},
		onDelete: function() {
			evt.trigger("delete");
		}
	});

	App.Views.Canvas = Backbone.View.extend({
		el : "#drawing-board",
		initialize: function() {
			var imageJson = module.config().image;
			this.paper = Raphael("drawing-board", imageJson.width, imageJson.height);
			this.collection.on("add", this.addOne, this);
			this.collection.on("remove", this.removeOne, this);
			evt.on("draw", this.drawMode, this);
			undoMan.register(this.collection);
			this.render();
		},
		render: function() {
			console.log("render");
			this.collection.each(function(shape) {
				this.addOne(shape);
			}, this);
			return this;
		},
		addOne: function(shape) {
			console.log("add one");
			var view = App.Views[shape.get("type")];
			new view({model: shape, paper: this.paper});
			return this;
		},
		drawMode: function(type) {
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

			  	console.log("color:", App.Models.Defaults.color);

			  	var shape = new App.Models[type];
			  	shape.start(startX, startY);
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
			model.on("remove", this.remove, this);
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
		remove: function() {
			this.el.remove();
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
			model.on("remove", this.remove, this);
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
		remove: function() {
			this.el.remove();
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
			model.on("remove", this.remove, this);
			var path = options.paper.path(this.model.get("path")).attr({
				stroke: model.get("color"),
				"stroke-width": model.get("stroke"),
				"stroke-linecap": "round",
			});
	        this.setElement(path);
		},
		remove: function() {
			this.el.remove();
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
			this.model.on("remove", this.remove, this);
			this.paper = options.paper;
			this.render();
		},
		remove: function() {
			this.el[0].remove();
			this.el[1].remove();
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
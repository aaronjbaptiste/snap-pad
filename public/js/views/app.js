define(["module", "backbone"], function(module, Backbone) {

	App.Views.Main = Backbone.View.extend({
		el: "body",
		initialize: function() {
			var canvas = new App.Views.Canvas();
			var toolbar = new App.Views.Toolbar({canvas: canvas});
		}
	});

	App.Views.Toolbar = Backbone.View.extend({
		el: "#toolbar",
		events: {
			"click .draw": "onDraw",
			"click .save": "onSave",
			"click .export": "onExport",
			"click .delete": "onDelete",
		},
		initialize: function(options) {
			//TODOs attaching stuff to view like this a good idea?
			//or through a model?
			this.canvas = options.canvas;
		},
		render: function() {
			//render stuff here instead of pre dom?
		},
		onDraw: function() {
			this.canvas.drawCircle();
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

			//save.php is failing? I think that used to rename it
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
		el : "#page",
		initialize: function() {
			var paper = Raphael("drawing-board", this.$el.width(), this.$el.height());
			this.paper = paper;

			//todo canvas stays central and isn't stretched etc
			//scales with canvas
			//can draw anywhere on canvas
			
			if (module.config().image.paperJson) {
				paper.fromJSON(module.config().image.paperJson);
			} else {
				var image = module.config().image.path;
				paper.image(image, 0, 0, this.$el.width(), this.$el.height());
			}
		},
		drawCircle: function() {
			var circle = this.paper.circle(200, 90, 70);
			circle.attr("fill", "#f00");
			circle.attr("stroke", "#fff");
		}
	});

	return App.Views.Main;

});
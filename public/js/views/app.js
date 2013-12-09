define(['module', 'backbone'], function(module, Backbone) {

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
			this.canvas = new App.Views.Canvas();
			this.toolbar = new App.Views.Toolbar({canvas: canvas});
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
			//TODOs attaching stuff to view like this a good idea?
			//or through a model?
			this.canvas = options.canvas;
		},
		render: function() {
			//render stuff here instead of pre dom?
		},
		onDrawCircle: function() {
			this.canvas.drawCircle();
		},
		onDrawSquare: function() {
			this.canvas.drawSquare();
		},
		onDrawFree: function() {
			this.canvas.drawFree();
		},
		onDrawArrow: function() {
			this.canvas.drawArrow();
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
		el : "#page",
		initialize: function() {
			var imageJson = module.config().image;
			var paper = Raphael("drawing-board", imageJson.width, imageJson.height);
			this.paper = paper;
			
			if (imageJson.paperJson) {
				paper.fromJSON(imageJson.paperJson);
			} else {
				var image = imageJson.path;
				paper.image(image, 0, 0, imageJson.width, imageJson.height);
			}
		},
		drawCircle: function() {
			var paper = this.paper;
			var svg = this.$('svg');
			svg.off("mousedown");
			svg.mousedown(function(e) {

				var parentOffset = svg.offset(); 
			  	var startX = e.pageX - parentOffset.left;
			  	var startY = e.pageY - parentOffset.top;

				var ellipse = paper.ellipse(startX, startY, 1, 1);
				ellipse.attr("stroke", "#ff0000");
				ellipse.attr("stroke-width", 3);

				svg.mousemove(function(e) {
					ellipse.remove();
					
				  	var relX = e.pageX - parentOffset.left;
				  	var relY = e.pageY - parentOffset.top;

				  	var topX = 0;
				  	var topY = 0;
				  	var bottomX = 0;
				  	var bottomY = 0;

				  	if (startX <= relX) {
				  		topX = startX;
				  		bottomX = relX;
				  	} else {
				  		topX = relX;
				  		bottomX = startX;
				  	}

				  	if (startY <= relY) {
				  		topY = startY;
				  		bottomY = relY;
				  	} else {
				  		topY = relY;
				  		bottomY = startY;
				  	}

				  	ellipse = paper.ellipse((topX + bottomX)/2, (topY + bottomY)/2, (bottomX - topX)/2, (bottomY - topY)/2);
				  	ellipse.attr("stroke", "#ff0000");
					ellipse.attr("stroke-width", 3);
			    });
			});

			svg.mouseup(function() {
		        svg.off("mousemove");
		    });
			
		},
		drawSquare:function() {
			var paper = this.paper;
			var svg = this.$('svg');
			svg.off("mousedown");
			svg.mousedown(function(e) {

				var parentOffset = svg.offset(); 
			  	var startX = e.pageX - parentOffset.left;
			  	var startY = e.pageY - parentOffset.top;

				var square = paper.rect(startX, startY, 1, 1);
				square.attr("stroke", "#ff0000");
				square.attr("stroke-width", 3);

				svg.mousemove(function(e) {
					square.remove();
					
				  	var relX = e.pageX - parentOffset.left;
				  	var relY = e.pageY - parentOffset.top;

				  	var topX = 0;
				  	var topY = 0;
				  	var bottomX = 0;
				  	var bottomY = 0;

				  	if (startX <= relX) {
				  		topX = startX;
				  		bottomX = relX;
				  	} else {
				  		topX = relX;
				  		bottomX = startX;
				  	}

				  	if (startY <= relY) {
				  		topY = startY;
				  		bottomY = relY;
				  	} else {
				  		topY = relY;
				  		bottomY = startY;
				  	}

				  	square = paper.rect(topX, topY, (bottomX - topX), (bottomY - topY));
				  	square.attr("stroke", "#ff0000");
					square.attr("stroke-width", 3);
			    });
			});

			svg.mouseup(function() {
		        svg.off("mousemove");
		    });
		},
		drawFree:function() {
			var g_masterPathArray;
			var g_masterDrawingBox;
			var paper = this.paper;
			var svg = this.$('svg');

			svg.off("mousedown");
			svg.mousedown(function(e) {
				var parentOffset = svg.offset();
				g_masterPathArray = new Array(); 
			  	var startX = e.pageX - parentOffset.left;
			  	var startY = e.pageY - parentOffset.top;

				svg.mousemove(function(e) {
			        var relX = e.pageX - parentOffset.left;
			        var relY = e.pageY - parentOffset.top;

			        if (g_masterPathArray.length == 0) {
			            g_masterPathArray[0] = ["M",relX,relY];
			            g_masterDrawingBox = paper.path(g_masterPathArray);
			            g_masterDrawingBox.attr({stroke: "#ff0000","stroke-width": 3});
			        } else {
			            g_masterPathArray[g_masterPathArray.length] =["L",relX,relY];
			        }
			        
			        g_masterDrawingBox.attr({path: g_masterPathArray});
			    });
			});

			svg.mouseup(function() {
		        svg.off("mousemove");
		    });
		    
		},
		drawArrow:function() {
			var paper = this.paper;
			var svg = this.$('svg');

			svg.off("mousedown");
			svg.mousedown(function(e) {
				var parentOffset = svg.offset();
			  	var startX = e.pageX - parentOffset.left;
			  	var startY = e.pageY - parentOffset.top;

			  	var arrow = paper.arrow(startX, startY, startX, startY, 9, 5, "#ff0000");

				svg.mousemove(function(e) {
					arrow[0].remove();
					arrow[1].remove();
			        var relX = e.pageX - parentOffset.left;
			        var relY = e.pageY - parentOffset.top;

			        arrow = paper.arrow(startX, startY, relX, relY, 9, 3, "#ff0000");
			    });
			});

			svg.mouseup(function() {
		        svg.off("mousemove");
		    });
		}

	});

	return App.Views.Main;

});
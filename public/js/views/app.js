define(["backbone"], function(Backbone) {

	var AppModel = Backbone.Model.extend({
		initialize: function() {
			this.set({
				paper: null
			})
		}
	});

	var App = Backbone.View.extend({
		el : "#page",
		events: {
			"click #drop-area": "onUploadRequest",
			"change #file-upload-button": "onImageSet",
			"click #save": "onSave",
			"click #export": "exportImage",
		},
		model: new AppModel(),
		initialize: function() {
			var image = this.$("#image-pad");

			if (image.attr("src") === "") {
				$('#main').show();
			} else {
				image.hide();
				var paper = Raphael("drawing-board", image.width(), image.height());

				if (jsonString !== "{}" ) {
					console.log("this has been loaded from the server, well done me.");
					var paperJSON = $.parseJSON(jsonString);
					console.log(paperJSON);
					paper.fromJSON(paperJSON);
				} else {
					console.log("this hasn't, I hope it's a new image");
					console.log("image", image.attr("src"));
					paper.image(image.attr("src"), 0, 0, image.width(), image.height());
					var circle = paper.circle(200, 90, 70);
					circle.attr("fill", "#f00");
					circle.attr("stroke", "#fff");
				}

				this.$el.append($("<button id='save'>Save</button>"));
				this.$el.append($("<button id='export'>export</button>"));
				this.model.set("paper", paper);
			}

		},
		onUploadRequest: function() {
			$('#file-upload-button').click();
		},
		onImageSet: function(e) {
	        this.$('form').submit();
		},
		onSave: function(e) {
			var paper = this.model.get("paper");
			var json = paper.toJSON();
			console.log("saving:", json)
			if (paper) {
				$.ajax({
				  type: "PUT",
				  url: "/image/" + imageId,
				  data: json,
				  dataType: "json"
				});
			}
		},
		exportImage: function() {
			var paper = this.model.get("paper");
			var svg = paper.toSVG();

			var $canvas = $('<canvas>').appendTo('#page');
			var canvas = $canvas[0];
			
			if (typeof FlashCanvas != "undefined") {
			    FlashCanvas.initElement(canvas);
			}

			canvg(canvas, svg, {
				ignoreMouse: true,
  				ignoreAnimation: true,
  				ignoreClear: true,
  				renderCallback: function() {
					$canvas.hide();
  				  setTimeout(function() {
  				  	console.log("png");

  				    canvas2png(canvas);

  				  }, 1000);
  				}
			});

			// setTimeout(function() {
	  //          //fetch the dataURL from the canvas and set it as src on the image
	  //          var dataURL = document.getElementById('canvas').toDataURL("image/png");
	  //          //document.getElementById('image-pad').src = dataURL;
	  //          document.location.href = dataURL.replace("image/png", "image/octet-stream");
	           
	  //      }, 100);
		}
	});

	return App;

});
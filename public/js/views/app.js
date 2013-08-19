define(["backbone"], function(Backbone, raphael) {

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
		},
		model: new AppModel(),
		initialize: function() {
			var image = this.$("#image-pad");

			if (image.attr("src") === "") {
				$('#main').show();
			} else {
				var paper = Raphael("drawing-board", image.width(), image.height());

				if (jsonString !== "{}" ) {
					console.log("this has been loaded from the server, well done me.");
					var paperJSON = $.parseJSON(jsonString);
					paper.fromJSON(paperJSON);
				} else {
					console.log("this hasn't, I hope it's a new image");
					var circle = paper.circle(200, 90, 70);
					circle.attr("fill", "#f00");
					circle.attr("stroke", "#fff");
				}

				this.$el.append($("<button id='save'>Save</button>"));
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
			if (paper) {
				var json = paper.toJSON();
				$.ajax({
				  type: "PUT",
				  url: "/image/" + imageId,
				  data: json,
				  dataType: "json"
				});
			}
		}
	});

	return App;

});
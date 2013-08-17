define(["backbone"], function(Backbone) {

	var App = Backbone.View.extend({
		el : "#page",
		events: {
			"click #drop-area": "onUploadRequest",
			"change #file-upload-button": "onImageSet"
		},
		initialize: function() {
			if (this.$("#image-pad").attr("src") === "") {
				$('#main').show();
			}
		},
		onUploadRequest: function() {
			$('#file-upload-button').click();
		},
		onImageSet: function(e) {
	        this.$('form').submit();
		}
	});

	return App;

});
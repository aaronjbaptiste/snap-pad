define(["backbone"], function(Backbone) {

	var App = Backbone.View.extend({
		el : "#page",
		events: {
			"click #drop-area": "onUploadRequest",
			"change #file-upload-button": "onImageSet"
		},
		onUploadRequest: function() {
			$('#file-upload-button').click();
		},
		onImageSet: function(e) {
		    var input = e.target;
	        if (input.files && input.files[0]) {
	        	//todo, fallback to normal form submit to process image (with ajax) if FileReader isn't supported.
	        	//todo, is the image data bound correctly? If I change the src will it update automatically??
	            var reader = new FileReader();
	            reader.onload = function(e) {
	                $('#image-pad').attr('src', e.target.result);
	                $('#main').hide();
	            }
	            reader.readAsDataURL(input.files[0]);
	        }
		}
	});

	return App;

});
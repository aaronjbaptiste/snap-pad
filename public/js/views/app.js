define(["backbone"], function(Backbone) {

	var App = Backbone.View.extend({
		initialize: function() {
			console.log("Backbone ready");
		}
	});

	return App;

});

//previous ember code for reference
// App.ApplicationController = Ember.ObjectController.extend({
// 	uploadFile: function() {
// 		$('#file-upload-button').change(function(event) { 
// 		    var input = event.target;
// 	        if (input.files && input.files[0]) {
// 	        	//todo, fallback to normal form submit to process image (with ajax) if FileReader isn't supported.
// 	        	//todo, is the image data bound correctly? If I change the src will it update automatically??
// 	            var reader = new FileReader();
// 	            reader.onload = function(e) {
// 	                $('#image-pad').attr('src', e.target.result);
// 	                $('#main').hide();
// 	            }
// 	            reader.readAsDataURL(input.files[0]);
// 	        }
// 		});
// 		$('#file-upload-button').click();
// 	},
// 	uploadImage: function() {
// 		console.log("uploading image", arguments);
// 	}
// });
require.config({
	paths: {
		"jquery": "vendor/jquery/jquery",
		"underscore": "vendor/underscore/underscore",
		"backbone": "vendor/backbone/backbone"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

var App = {
	Views: {},
	Models: {}
};

require(["views/app"], function(Main) {
	new Main();
});
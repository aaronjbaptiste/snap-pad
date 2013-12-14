require.config({
	paths: {
		"jquery": "vendor/jquery/jquery",
		"underscore": "vendor/underscore/underscore",
		"backbone": "vendor/backbone/backbone",
		"raphael": "vendor/raphael/raphael",
		"raphael.json": "vendor/raphael.json/raphael.json",
		"raphael.export": "vendor/raphael.export/raphael.export",
		"backbone.raphael": "vendor/backbone.raphael-amd/backbone.raphael"
	},
	shim: {
		"underscore": {	
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"raphael.json": {
			deps: ["raphael"]
		},
		"raphael.export": {
			deps: ["raphael"]
		}
	}
});

var App = {
	Views: {},
	Models: {},
	Collections: {},
};

require(["views/views"], function(Main) {
	new Main;
});
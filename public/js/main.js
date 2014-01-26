require.config({
	paths: {
		"jquery": "vendor/jquery/jquery",
		"underscore": "vendor/underscore/underscore",
		"backbone": "vendor/backbone/backbone",
		"raphael": "vendor/raphael/raphael",
		"raphael.json": "vendor/raphael.json/raphael.json",
		"raphael.export": "vendor/raphael.export/raphael.export",
		"backbone.raphael": "vendor/backbone.raphael-amd/backbone.raphael",
		"backbone.undo": "vendor/backbone.undo/Backbone.Undo",
		"jquery.shortcut": "vendor/jquery.shortcut/jquery.Shortcut",
		"spectrum": "vendor/spectrum/spectrum",
		"bootstrap-js-dropdown": "vendor/bootstrap-js-dropdown/index"
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
		},
		"backbone.undo": {
			deps: ["backbone"],
			exports: "Backbone"
		},
		"jquery.shortcut": {
			deps: ["jquery"],
			exports: "$"
		},
		"spectrum": {
			deps: ["jquery"],
			exports: "$"
		},
		"bootstrap-js-dropdown": {
			deps: ["jquery"]
		}
	}
});

var App = {
	Views: {},
	Models: {},
	Collections: {},
};

require(["views/views"], function(Main) {
	window.main = new Main();
});
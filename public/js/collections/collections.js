define(['module', 'backbone', 'models/models'], function(module, Backbone) {

    App.Collections.Canvas = Backbone.Collection.extend({
        model: function(attrs) {
            console.log("new in collection");
            return new App.Models[attrs.type](attrs);
        }
    });

    App.Collections.Threads = Backbone.Collection.extend({
        model: App.Models.Thread
    });

    return App.Collections;

});
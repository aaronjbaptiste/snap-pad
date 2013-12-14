define(['module', 'backbone', 'models/models'], function(module, Backbone) {

    App.Collections.Canvas = Backbone.Collection.extend({
        model: function(attrs) {
            return new App.Models[attrs.type];
        }
    });

    return App.Collections;

});
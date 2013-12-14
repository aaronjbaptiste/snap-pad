define(['module', 'backbone'], function(module, Backbone) {

    var config = App.Models.Defaults = {
        stroke: 3,
        color: '#ff0000',
    };

    App.Models.Circle = Backbone.Model.extend({
        defaults: {
            type: "Circle",
            pivotX: 0,
            pivotY: 0,
            x: 1,
            y: 1,
            rx: 1,
            ry: 1,
            stroke: config.stroke,
            color: config.color,
        },
        start: function(x, y) {
            this.set({
                pivotX: x,
                pivotY: y,
                x: x,
                y: y,
            });
            return this;
        },
        move: function(x, y) {
            var pivotX = this.get("pivotX"),
                pivotY = this.get("pivotY"),
                x1, x2, y1, y2;

            if (x < pivotX) {
                x1 = x;
                x2 = pivotX;
            } else {
                x1 = pivotX;
                x2 = x;
            }

            if (y < pivotY) {
                y1 = y;
                y2 = pivotY;
            } else {
                y1 = pivotY;
                y2 = y;
            }

            this.set({
                x: (x1 + x2)/2,
                y: (y1 + y2)/2,
                rx: (x2 - x1)/2,
                ry: (y2 - y1)/2,
            });
            return this;
        }
    });

    App.Models.Square = Backbone.Model.extend({
        defaults: {
            type: "Square",
            pivotX: 0,
            pivotY: 0,
            x: 1,
            y: 1,
            width: 1,
            height: 1,
            stroke: config.stroke,
            color: config.color,
        },
        start: function(x, y) {
            this.set({
                pivotX: x,
                pivotY: y,
                x: x+1,
                y: y+1,
            });
            return this;
        },
        move: function(x, y) {
            var pivotX = this.get("pivotX"),
                pivotY = this.get("pivotY"),
                x1, x2, y1, y2;

            if (x < pivotX) {
                x1 = x;
                x2 = pivotX;
            } else {
                x1 = pivotX;
                x2 = x;
            }

            if (y < pivotY) {
                y1 = y;
                y2 = pivotY;
            } else {
                y1 = pivotY;
                y2 = y;
            }

            this.set({
                x: x1,
                y: y1,
                width: x2 - x1,
                height: y2 - y1,
            });
            return this;
        }
    });

    App.Models.Arrow = Backbone.Model.extend({
        defaults: {
            type: "Arrow",
            tx: 0,
            ty: 0,
            ax: 1,
            ay: 1,
            stroke: config.stroke,
            color: config.color,
        },
        start: function(x, y) {
            this.set({
                tx: x,
                ty: y,
                ax: x+1,
                ay: y+1,
            });
            return this;
        },
        move: function(x, y) {
            this.set({
                ax: x,
                ay: y
            });
            return this;
        }
    });

    App.Models.FreeDraw = Backbone.Model.extend({
        defaults: function () {
            return {
                type: "FreeDraw",
                path: new Array(),
                stroke: config.stroke,
                color: config.color,
            }
        },
        start: function(x, y) {
            var path = this.get("path");
            path[0] = ["M", x, y];
            this.set(path, path);
            return this;
        },
        move: function(x, y) {
            var path = this.get("path");
            path[path.length] =["L", x, y];
            this.set(path, path);
            return this;
        }
    });

    App.Models.Image = Backbone.Model.extend({
        defaults: {
            type: "Image",
            src: "",
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    });

    return App.Models;

});
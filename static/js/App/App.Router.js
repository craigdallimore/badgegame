App.module("Routing", function(Routing, App, Backbone, Marionette, $, _) {

    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            'login': 'login',
            'register': 'register',
            'resetpassword': 'resetPassword',
            'getpoints': 'getPoints'
        }
    });

    Routing.start = function() {

        App.Router = new Router({
            controller: App.Controller.Route
        });

        App.vent.on('navigate', App.Router.navigate);

        if(Modernizr.history) {
            Backbone.history.start({ pushState: true });
        } else {
            // Support IE
            var match = Backbone.history.start({
                pushState: false
            });
        }
    };

    App.vent.on('start', function() {
        Routing.start();
    });

});

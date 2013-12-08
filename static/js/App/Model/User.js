App.module('Model', function(Model, App, Backbone, Marionette, $, _) {

    Model.User = Backbone.Model.extend({

        url: function() {
            return '/api/user/' + this.id;
        },

        initialize: function() {
            App.vent.on('points:demand', this.demandMorePoints, this);
        },

        demandMorePoints: function() {
            var self = this;
            this.fetch({
                success: self.onSuccess,
                error: self.onError
            });
        },

        onSuccess: function(model, response, options) {
            model.set('points', response.points);
            App.vent.trigger('submit:success');
        },

        onError: function(model, xhr, options) {
            App.vent.trigger('submit:error', 'Could not get points :(');
            _.log('Error getting points');
        },

        close: function() {
            App.vent.off('points:demand');
        }

    });

});

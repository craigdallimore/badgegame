App.module('Model', function(Model, App, Backbone, Marionette, $, _) {

    Model.LoginUser = Backbone.Model.extend(
        _.extend({}, App.Mixin.ValidationModel, {

        url: '/login',

        fields: {
            email: {
                type: 'email',
                required: true
            },
            password: {
                type: 'password',
                required: true
            }
        },

        initialize: function() {
            App.vent.on('login:submit', this.login, this);
        },

        login: function(submission) {

            var self = this;
            this.save(submission, {
                trigger: false,
                success: self.onSuccess,
                error: self.onError
            });

        },

        onSuccess: function(model, response, options) {
            _.log('Success: TODO - navigate user', response);
            App.vent.trigger('submit:success');
        },

        onError: function(model, xhr, options) {
            App.vent.trigger('submit:error', 'Could not log in!');
        }

    }));


});

App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Register = Marionette.View.extend(
        _.extend({}, App.Mixin.ValidationView, App.Mixin.RequestView, {

        events: {
            'submit': 'submit'
        },

        initialize: function() {
            var model = this.model,
                self = this;

            this.bindControls();
            this.bindFieldErrors(model.fields, this);
            this.bindSubmitError(this);

            this.listenTo(model, 'request', self.onRequest);
        },

        close: function() {
            this.unbindControls();
            if (! this.model.fields) return;
            var fields = this.model.fields;
            this.unbindErrors(fields);
        },

        submit: function(e) {
            e.preventDefault();

            this.$el
                .find('.error').removeClass('error')
                .find('label').remove();

            var email = this.$el.find('input[name="email"]').val(),
                password = this.$el.find('input[name="password"]').val();

            App.vent.trigger('register:submit', {
                email: email,
                password: password
            });

        }
    }));


});



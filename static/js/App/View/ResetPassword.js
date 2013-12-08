App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.ResetPassword = Marionette.View.extend(
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
            this.clearErrors();
            var email = this.$el.find('input[name="email"]').val();
            App.vent.trigger('resetpassword:submit', { email: email });
        }
    }));
});



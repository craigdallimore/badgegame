App.module('Mixin', function(Mixin, App, Backbone, Marionette, $, _) {

    Mixin.RequestView = {

        bindControls: function() {
            this.$btnSubmit = this.$el.find('input[type="submit"]');
            this.$ajaxSpinner = this.$el.find('.ajaxSpinner');
            App.vent.on('submit:success', this.onRequestComplete, this);
            App.vent.on('submit:error', this.onRequestComplete, this);
        },

        unbindControls: function() {
            App.vent.off('submit:success');
            App.vent.off('submit:error');
        },

        onRequest: function() {
            this.$btnSubmit.attr('disabled', true);
            this.$ajaxSpinner.show();
        },

        onRequestComplete: function() {
            this.$btnSubmit.attr('disabled', false);
            this.$ajaxSpinner.hide();
        }
    };
});

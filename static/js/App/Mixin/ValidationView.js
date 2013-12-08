App.module('Mixin', function(Mixin, App, Backbone, Marionette, $, _) {

    Mixin.ValidationView = {

        bindError: function(fieldName, errorEvent) {
            var $input = this.$el.find('input[name="' + fieldName + '"]'),
                $label;

            App.vent.on(errorEvent, function(message) {
                $label = $('<label>', { 'for': fieldName });
                $label.text(message);
                $label.on('click', function() {
                    $(this).prev().select();
                    $(this).remove();
                });
                $input.parent().addClass('error').append($label);
            });
        },

        bindSubmitError: function(ctx) {
            ctx.bindError('submit', 'submit:error');
        },

        bindFieldErrors: function(fields, ctx) {
            for(var fieldName in fields) {
                var error = 'validate:error:' + fieldName;
                ctx.bindError(fieldName, error);
            }
        },

        unbindErrors: function(fields) {
            App.vent.off('submit:error');
            for(var fieldName in fields) {
                App.vent.off('validate:error:' + fieldName);
            }
        },

        clearErrors: function() {
            this.$el
                .find('.error').removeClass('error')
                .find('label').remove();
        }

    };
});


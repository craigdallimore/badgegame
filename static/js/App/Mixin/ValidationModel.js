App.module('Mixin', function(Mixin, App, Backbone, Marionette, $, _) {

    Mixin.ValidationModel = {

        isEmail: function(email) {
            var re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                isMatch = re.test(email);
            return isMatch;
        },

        validate: function(submissions) {
            var fields = this.fields,
                error = '';

            for(var fieldName in fields) {
                error += this.validateField(fieldName, fields[fieldName], submissions[fieldName]);
            }

            return error;
        },

        validateField: function(fieldName, field, submission) {

            // Does not exist
            if(field.required && !submission)  {
                App.vent.trigger('validate:error:' + fieldName, 'This is required');
                return fieldName + ' required\n';
            }

            // Not valid
            if(field.type === 'email' && !this.isEmail(submission)) {
                App.vent.trigger('validate:error:' + fieldName, 'This is not an email address');
                return submission + ' is not an email address\n';
            }
            return '';
        }
    };

});

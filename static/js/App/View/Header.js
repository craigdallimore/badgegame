App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Header = Marionette.View.extend({
        events: {
            'click .btnToggleNav': 'toggleNav'
        },
        initialize: function() {
            this.$navList = this.$el.find('.navList');
        },

        toggleNav: function(e) {
            e.preventDefault();
            var $nl = this.$navList;
            $nl[ $nl.is(':visible') ? 'hide' : 'show' ]();

        }
    });


});

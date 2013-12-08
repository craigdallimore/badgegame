App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.GetPoints = Marionette.View.extend(
        _.extend({}, App.Mixin.ValidationView, App.Mixin.RequestView, {

        events: {
            'submit': 'submit'
        },

        initialize: function() {
            var model = this.model,
                self = this;

            this.bindControls();
            this.bindSubmitError(this);

            this.listenTo(model, 'request', self.onRequest);
            this.listenTo(model, 'change:points', self.updatePoints);
            this.$score = this.$el.find('.score');
        },

        updatePoints: function(model, points) {
            var from = model.previous('points'),
                to = points;
            this.recurseRenderPoints(from, to, this);
        },

        recurseRenderPoints: function(from, to, ctx) {
            var score = 'Score: ' + from;
            ctx.$score.text(score);

            if(from++ < to) {
                _.delay(ctx.recurseRenderPoints, 30, from, to, ctx);
            }
        },

        submit: function(e) {
            e.preventDefault();

            this.$el
                .find('.error').removeClass('error')
                .find('label').remove();

            App.vent.trigger('points:demand');
        }
    }));

});

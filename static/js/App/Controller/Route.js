App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.Route = {

        login: function() {
            _.log('login route');
            var headerView = new App.View.Header({ el: 'body > header' }),
                loginUser = new App.Model.LoginUser(),
                loginView = new App.View.Login({
                    el: '.login',
                    model: loginUser
                });
        },
        register: function() {
            _.log('register route ');
            var headerView = new App.View.Header({ el: 'body > header' }),
                registerUser = new App.Model.RegisterUser(),
                registerView = new App.View.Register({
                    el: '.register',
                    model: registerUser
                });
        },
        resetPassword: function() {
            _.log('reset password route');
            var headerView = new App.View.Header({ el: 'body > header' }),
                resetUser = new App.Model.ResetPasswordUser(),
                resetView = new App.View.ResetPassword({
                    el: '.resetPassword',
                    model: resetUser
                });
        },
        getPoints: function() {
            _.log('get points route');
            var headerView = new App.View.Header({ el: 'body > header' }),
                user = new App.Model.User(BOOTSTRAP.User),
                getPointsView = new App.View.GetPoints({
                    el: '.getPoints',
                    model: user
                });
        }
    };

});

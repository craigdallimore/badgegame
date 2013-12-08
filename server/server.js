// BadgeRAT

var express = require('express'),
  http      = require('http'),
  port      = 3000,
  App       = express(),
  server    = http.createServer(App),
  routes    = require('./routes')(App);

App.configure(function() {
  App.set('views', __dirname + '/../static/jade/');
  App.use('view engine', 'jade');
  App.use(express.static(__dirname + '/../'));
  App.use(express.static(__dirname + '/../static'));

});

App.configure('development', function() {
  App.use(express.logger());
  App.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

App.configure('production', function() {
  App.use(express.logger());
  App.use(express.errorHandler());
});


server.listen(port);
console.log('BadgeRAT server Listening on port ' + port);


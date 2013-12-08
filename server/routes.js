module.exports = function(App) {

  var points = 300;

  // Navigation
  App.get('/', index);
  App.get('/login', login);
  App.get('/register', register);
  App.get('/resetpassword', resetPassword);
  App.get('/getpoints', getPoints);

  // API
  App.get('/api/user/:id', getUserProfile);

};

// Navigation
function index(req, res) {
  res.render('index.jade');
}

function login(req, res) {
  res.render('login.jade');
}

function register(req, res) {
  res.render('register.jade');
}

function resetPassword(req, res) {
  res.render('resetpassword.jade');
}

function getPoints(req, res) {
  res.render('getpoints.jade');
}

// API
function getUserProfile(req, res) {
  res.send({
    name:   'Decoy',
    points: points += 300
  });
}

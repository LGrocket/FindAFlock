var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./oauth.js');
var request = require('request-json');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var controller = require('./private/LRGgeneral.js');
var dal = require('./private/data_layer.js');

//var routes = require('./routes');

//Facebook auth from:
//http://mherman.org/blog/2013/11/10/social-authentication-with-passport-dot-js/#.U1wKguZdViY
// serialize and deserialize
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new FacebookStrategy({
	clientID: config.facebook.clientID,
	clientSecret: config.facebook.clientSecret,
	callbackURL: config.facebook.callbackURL,
	profileFields: ['id', 'name', 'photos', 'location', 'friends']
},
	function(accessToken, refreshToken, profile, done) {
	  dal.addUser(profile.id, controller.getLocation(), function(err) {
		  console.log(err);
	  });
	  return done(null, profile);
}));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// routes
//var fbGraph = request.newClient('https://graph.facebook.com/');
app.get('/', function(req, res){
	  if(req.isAuthenticated())
		  res.redirect('dashboard');
	  else 
		  res.render('index', { title: 'FindAFlock' });
	}
);
app.get('/dashboard', ensureAuthenticated, function(req, res){
  //var fFlights = [];
  //var fFlightsID = dal.getFriendsFlights(req.user.friends);
  //fFlightsID.forEach(function(flightID) {
	  //fFlights.push( controller.deserializeFlight(flightID) );
  //});
	//TODO: get location and find local flights
	//fbGraph.get(req.user._json.location.id);
		//var loc = [data.location.latitude, data.location.longitude];
		//});
  //var lFlights = [];
  //getLocalFlights(loc, locationRadius).forEach( function(lFlightID) {
	  //lFlights.push ( controller.deserializeFlight(FlightID) );
  //});

  res.render('dashboard', { title: "Dashboard", fFlights: controller.fakeFlights(), lFlights: controller.fakeFlights() } );
  //res.render('dashboard', {title: "Dashboard" });
});
app.get('/account', ensureAuthenticated, function(req, res){
	res.render('account', { user: req.user });
});

app.get('/auth/facebook',
passport.authenticate('facebook'),
function(req, res){
});

app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
 res.redirect('/dashboard');
});
app.get('/logout', function(req, res){
req.logout();
res.redirect('/');
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// test authentication
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/');
}

module.exports = app;


console.log("Server running on localhost:3000");
console.log("If using vagrant, on your normal browser go to http://localhost:8080");

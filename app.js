var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./oauth.js');
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

	  //TODO: fix facebook location function
	  //dal.addUser(profile.id, controller.facebookLocation(profile), function(err) {
	  dal.addUser(profile.id, [42.3803, -72.5236], function(err) {
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
app.get('/', function(req, res){
	  if(req.isAuthenticated())
		  res.redirect('dashboard');
	  else 
		  res.render('index', { title: 'FindAFlock' });
	}
);
app.get('/dashboard', ensureAuthenticated, function(req, res){
  var fFlights = [];
  dal.getFriendsFlights(req.user.friends, function(error, result){
	  result.forEach(function(lFlightID) {
		  fFlights.push( controller.deserializeFlight(flightID) );
	  });
  });
  //TODO: locationRadius is user setting
  var locationRadius = 10;
  var lFlights = [];
  //getUserCurrentLocation(req.user.id, function(error, location) {
	  //dal.getLocalFlights(location, locationRadius, function(error, result) {
		  //if(error) { return; }
		  //result.forEach(function(lFlightID) {
			  //lFlights.push ( controller.deserializeFlight(FlightID) );
		  //});
	  //});
	  var userFlight;
	  dal.getUserCurrentFlight(req.user.id, function(error, result) {
		  if(!error) {
			  userFlight = controller.deserializeFlight(result);
		  }
	  });
  res.render('dashboard', { title: "Dashboard", fFlights: controller.fakeFlights(), lFlights: controller.fakeFlights(), user: req.user, userFlight: userFlight } );
});

app.get('/flight/:id', ensureAuthenticated, function(req, res) {
  //TODO: fakeFlights
	//var flight = controller.serializeFlight(req.route.params.id);
	var fakeFlight = controller.fakeFlights()[0];
	res.render('flightinfo', { title: "Flight Info", user: req.user, flight: fakeFlight, userIsMember: false });
});
app.get('/join/:id', ensureAuthenticated, function(req, res) {
	dal.addUserToFlight(req.route.params.id, req.user.id);
	var fakeFlight = controller.fakeFlights()[0];
	//controller.deserializeFlight(req.route.params.id).members.forEach(function(member) {
		//if (member.id === user.id) { var userIsMember = true; }
	//});
	//TODO: fake
	userIsMember = true;
	req.user.member = true;
	res.render('flightinfo', { title: "Flight Info", user: req.user, flight: fakeFlight, userIsMember: true });
});
app.get('/leave', ensureAuthenticated, function(req, res) {
	//TODO: fake
	//dal.removeUserFromFlight(req.user.id, dal.getUserCurrentFlight(req.user.id));
	res.redirect('/dashboard');
});
app.get('/newflight/:type', ensureAuthenticated, function(req, res) {
	var icon = controller.activityIcon(req.route.params.type);
	res.render('newflight', { title: "New Flight", user: req.user, type: req.route.params.type, icon: icon });
});
app.post('/addFlight', function(req, res) {
	dal.createFlight(function(err, id) {
		dal.addUserToFlight(id, req.user.id);
		dal.setFlightActivityType(id, req.body.type);
		dal.setFlightTime(id, req.body.time);
		dal.setFlightLocation(id, req.body.location);
	});
	res.redirect('/dashboard');
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

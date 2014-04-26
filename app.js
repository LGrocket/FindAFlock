var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./routes');
//var dal = require('../private/data_layer.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
//TODO: needed?
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session({ secret: 'ilovewhiskeywhiskeywhiskey' })); // session secret
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(app.router);

//Controller and routes
//app.get('/', routes.index);
//app.get('/ping', routes.ping);
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});
app.get('/account', ensureAuthenticated, function(req, res) {
	addUser(req.session.passport.user, null, function(err, user) {
		if(err) {
			console.log(err);
		} else {
			res.render('account', { user: user});
		}
	});
});
app.get('/auth/facebook',
	passport.authenticate('facebook'),
	function(req, res){
});
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '' }),
	function(req, res) {
		res.redirect('/account');
});
//app.get('/profile', routes.user);
//app.get('/newflight', routes.newflight);
//app.get('/flight/*', routes.flight);

//test authentication
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/');
}

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


module.exports = app;


console.log("Server running on localhost:3000");
console.log("If using vagrant, on your normal browser go to http://localhost:8080");

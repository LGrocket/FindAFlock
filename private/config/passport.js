// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;

//// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {
	// used to serialize the user for the session,
	// TODO: not sure if I need this
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
	 passport.deserializeUser(function(obj, done) {
			 done(null, obj);
		 });
	 })
    
	// =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
		// pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },
    // facebook will send back the token and profile
	 function(token, refreshToken, profile, done) {
		 process.nextTick(function() {  // asynchronous
			 // find the user in the database based on their facebook id, will
			 // return user whether they were added or found
			 //addUser(token, getLocation(), function(err, user) {
				 //if (err)
					 //return done(err);
				 //else (user) {
					 ////TODO: make sure done function is correct
					 //return done(null, user); // user found, return that user
				 //}
			 //});
			 return done(null, profile);
		 });
	 }));

};

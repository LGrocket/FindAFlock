//from http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs

var databaseUrl =  "vagrant@10.0.2.2/test"
var collections = ["users"]

var db = require('mongojs').connect(databaseUrl, collections);

//	*****************
//	*      Users	*
//	*****************


exports.addUser = function(userID, cb){
	//TODO: Implement
	cb(null, true);
}
exports.setLocation = function(userID, location, cb){
	//TODO: Implement
	cb(null, true);
}
exports.setFlock = function(userID, flockID, cb){
	//TODO: Implement
	cb(null, true);
}
exports.getUserCurrentLocation = function(userID, cb){
	//TODO: Implement
	cb(null,[14,22]);
}
exports.getUserCurrentFlight = function(userID, cb){
	//TODO: Implement
	cb(null, 1);
}

//	*****************
//	*    Flights	*
//	*****************

exports.createFlight = function(cb){
	//TODO: Implement
	cb(null,1);
}
exports.addUserToFlight = function(flightID, userID, cb){
	//TODO: Implement
	cb(null, true);
}
exports.setFlightActivityType = function( activityType, cb){
	//TODO: Implement
	cb(null, true);
}
exports.setFlightTime = function(flightID, startTime, cb){
	//TODO: Implement
	cb(null,true);
}
exports.setFlightLocation = function(flightID, startTime, cb){
	//TODO: Implement
	cb(null,true);
}
exports.getLocalFlights = function(location, distance, cb){
	//TODO: Implement
	cb(null,[1]);
}
exports.getFlightMembers = function(flightID, cb){
	//TODO: Implement
	cb(null, "Jonny");
}
exports.getFlightActivityType = function(flightID, cb){
	//TODO: Implement
	cb(null,"Dining");
}
exports.getFlightDoC = function(flightID, cb){
	//TODO: Implement
	cb(null,new Date());
}
exports.getFlightTime = function(flightID, cb){
	//TODO: Implement
	cb(null, new Date());
}
exports.getFlightLocation = function(flightID, cb){
	//TODO: Implement
	cb(null, "Applebees");
}

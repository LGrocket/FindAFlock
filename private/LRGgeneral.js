var dal = require('./data_layer.js');
//Returns the class of the Font Awesome icon associated with the
//passed activityType in plaintext
exports.activityIcon = function(activityType) {
	switch (activityType) {
		case "Drinks":
			return "fa fa-glass";
		case "Foods":
			return "fa fa-cutlery";
		case "Anything":
			return "fa fa-users";
	}
};

exports.deserializeFlight = function (flightID) {
	return {
		flightID : flightID,
		activityType: dal.getFlightActivityType(flightID),
		time: dal.getFlightTime(flightID),
		location: dal.getFlightLocation(flightID),
		members: dal.getFlightMembers(flightID),
		dateOfCreation: dal.getFlightDoC(flightID)
	};
};

//Get location stub
exports.getLocation = function () {
	return "Amerhst";
};

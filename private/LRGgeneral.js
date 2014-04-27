var dal = require('./data_layer.js');
//Returns the class of the Font Awesome icon associated with the
//passed activityType in plaintext
exports.activityIcon = function(activityType) {
	switch (activityType) {
		case "Drinks":
			return "fa fa-glass";
		case "Food":
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

exports.fakeFlights = function() {
	return [{
		flightID : 0,
		activityType: "Drinks",
		time: "10:34am",
		location: "High Horse",
		members: [0, 2, 4],
		dateOfCreation: "10:00am"
	},
	{
		flightID : 1,
		activityType: "Food",
		time: "2:45am",
		location: "Amherst",
		members: [1, 3],
		dateOfCreation: "10:00am"
	},{
		flightID : 2,
		activityType: "Anything",
		time: "12:00pm",
		location: "Student Union",
		members: [2],
		dateOfCreation: "10:00am"
	}];
};

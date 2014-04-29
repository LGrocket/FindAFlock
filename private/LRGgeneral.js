var dal = require('./data_layer.js');
var request = require('superagent');

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

exports.facebookLocation = function(user) {
	request.get('https://graph.facebook.com/'+user._json.location.id).end(function(res) {
		return [JSON.parse(res.text).location.latitude, JSON.parse(res.text).location.longitude]; });
};

exports.deserializeFlight = function (flightID, cb) {
	var thisFlightID = flightID;
	var aT, t, l, m, d;
	dal.getFlightActivityType(thisFlightID, function(error, result) {
		aT = result;
		dal.getFlightTime(thisFlightID, function(error, result ) {
			t = result;
			dal.getFlightLocation(thisFlightID, function(error, result) {
				l = result;
				dal.getFlightMembers(thisFlightID, function(error, result) {
					m = result;
					dal.getFlightDoC(thisFlightID, function(error, result) {
						d = result;
						return cb({
							id: thisFlightID,
							activityType: aT,
							time: t,
							location: l,
							members: m,
							dateOfCreation: d
						});
					});
				});
			});
		});
	});
};

//Get location stub
exports.getLocation = function () {
	return "Amerhst";
};

exports.fakeFriendFlight = function(cb) {
	dal.getUserCurrentFlight('717096257', function(error, result) {
		return cb(result);
	});
};

exports.fakeFlights = function() {
	return [{
		id: 0,
		activityType: "Drinks",
		activityIcon: "fa fa-glass",
		time: "10:34am",
		location: "High Horse",
		members: [{
			id: '1557156321', 
			name:
				{ familyName: 'Gutterman',
				  givenName: 'Lucas',
					 middleName: 'Rockett' },
			photos: [ { value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/t1.0-1/p50x50/1898055_10203278142625148_6400395_t.jpg' } ]
			}],
		dateOfCreation: "10:00am"
	},
	{
		id: 1,
		activityType: "Food",
		activityIcon: "fa fa-cutlery",
		time: "2:45am",
		location: "Amherst",
		members: [{
			id: '1557156321', 
			name:
				{ familyName: 'Gutterman',
				  givenName: 'Lucas',
					 middleName: 'Rockett' },
			photos: [ { value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/t1.0-1/p50x50/1898055_10203278142625148_6400395_t.jpg' } ]
			}],
		dateOfCreation: "10:00am"
	},{
		id: 2,
		activityType: "Anything",
		activityIcon: "fa fa-user",
		time: "12:00pm",
		location: "Student Union",
		members: [{
			id: '1557156321', 
			name:
				{ familyName: 'Gutterman',
				  givenName: 'Lucas',
					 middleName: 'Rockett' },
			photos: [ { value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/t1.0-1/p50x50/1898055_10203278142625148_6400395_t.jpg' } ]
			}],
		dateOfCreation: "10:00am"
	}];
};

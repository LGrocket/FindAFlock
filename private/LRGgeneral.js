var dal = require('./data_layer.js');
var request = require('https');

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

//Extract a latlong from Facebook (used if geolocation is not possible)
// Primary reference: http://nodejs.org/api/https.html#https_https_get_options_callback
exports.facebookLocation = function(user, cb) {
	if (user._json.location){
		request.get('https://graph.facebook.com/' + user._json.location.id, function(res) {
			res.on('data', function(d) {
				if (typeof cb === 'function')
					cb(null,[ JSON.parse(d).location.latitude, JSON.parse(d).location.longitude]);
			});

		}).on('error', function(e) {
			console.error(e);
		});
	} else {
		// If they have no facebook location, set at some point
		cb(null, [10, 10]);
	};
};

exports.deserializeFlight = function(flightID, cb) {
	if (!flightID){
		return cb(null, null);
	}
	var thisFlightID = require("mongojs")({}).ObjectId(flightID);;
	var aT, t, l, m, d;
	dal.getFlightActivityType(thisFlightID, function(error, result) {
		aT = result;
		dal.getFlightTime(thisFlightID, function(error, result) {
			t = result;
			dal.getFlightActivity(thisFlightID, function(error, result) {
				l = result;
				dal.getFlightMembers(thisFlightID, function(error, result) {
					m = result;
					dal.getFlightDoC(thisFlightID, function(error, result) {
						d = result;
						return cb(null,{
							id: thisFlightID,
							activityType: aT,
							time: t,
							location: l, //old value: location
							members: m,
							dateOfCreation: d
						});
					});
				});
			});
		});
	});
};

//
//	Mock data below
//

//Get location stub
exports.getLocation = function() {
	return "Amerhst";
};

exports.fakeFriendFlight = function(cb) {
	dal.getUserCurrentFlight('717096257', function(error, result) {
		return cb(result);
	});
};

exports.fakeFlights2 = function() {
	return [{
		id: 0,
		activityType: "Drinks",
		activityIcon: "fa fa-glass",
		time: "6:34pm",
		location: "High Horse",
		members: [{
			id: '717096257',
			name: {
				familyName: 'Yacono',
				givenName: 'Christina'
			},
			photos: [{
				value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/c0.7.50.50/p50x50/1382921_10152292795321258_1931574293_t.jpg'
			}],
			dateOfCreation: "10:00am"
		}]
	}];
};
exports.fakeFlights1 = function() {
	return [{
		id: 0,
		activityType: "Drinks",
		activityIcon: "fa fa-glass",
		time: "6:34pm",
		location: "High Horse",
		members: [{
			id: '717096257',
			name: {
				familyName: 'Gutterman',
				givenName: 'Lucas',
				middleName: 'Rockett'
			},
			photos: [{
				value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/t1.0-1/p50x50/1898055_10203278142625148_6400395_t.jpg'
			}]
		}, {
			id: '717096257',
			name: {
				familyName: 'Yacono',
				givenName: 'Christina'
			},
			photos: [{
				value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/c0.7.50.50/p50x50/1382921_10152292795321258_1931574293_t.jpg'
			}],
			dateOfCreation: "10:00am"
		}]
	}];
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
			name: {
				familyName: 'Gutterman',
				givenName: 'Lucas',
				middleName: 'Rockett'
			},
			photos: [{
				value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/t1.0-1/p50x50/1898055_10203278142625148_6400395_t.jpg'
			}]
		}],
		dateOfCreation: "10:00am"
	}, {
		id: 1,
		activityType: "Food",
		activityIcon: "fa fa-cutlery",
		time: "2:45am",
		location: "Amherst",
		members: [{
			id: '1557156321',
			name: {
				familyName: 'Gutterman',
				givenName: 'Lucas',
				middleName: 'Rockett'
			},
			photos: [{
				value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/t1.0-1/p50x50/1898055_10203278142625148_6400395_t.jpg'
			}]
		}],
		dateOfCreation: "10:00am"
	}, {
		id: 2,
		activityType: "Anything",
		activityIcon: "fa fa-user",
		time: "12:00pm",
		location: "Student Union",
		members: [{
			id: '1557156321',
			name: {
				familyName: 'Gutterman',
				givenName: 'Lucas',
				middleName: 'Rockett'
			},
			photos: [{
				value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/t1.0-1/p50x50/1898055_10203278142625148_6400395_t.jpg'
			}]
		}],
		dateOfCreation: "10:00am"
	}];
};
exports.fakeFlights1 = function() {
	return [{
		id: 0,
		activityType: "Drinks",
		activityIcon: "fa fa-glass",
		time: "6:00PM",
		location: "High Horse",
		members: [{
			id: '1557156321',
			name: {
				familyName: 'Gutterman',
				givenName: 'Lucas',
				middleName: 'Rockett'
			},
			photos: [{
				value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/t1.0-1/p50x50/1898055_10203278142625148_6400395_t.jpg'
			}]
		}, {
			id: '717096257',
			name: {
				familyName: 'Yoooho',
				givenName: 'Christina',
				middleName: 'Rockett'
			},
			photos: [{
				value: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/c0.7.50.50/p50x50/1382921_10152292795321258_1931574293_t.jpg'
			}]
		}],
		dateOfCreation: "10:00am"
	}];
};
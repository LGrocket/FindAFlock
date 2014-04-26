//Returns the class of the Font Awesome icon associated with the
//passed activityType in plaintext
function activityIcon(activityType) {
	switch (activityType) {
		case "Drinks":
			return "fa fa-glass";
		case "Foods":
			return "fa fa-cutlery";
		case "Anything":
			return "fa fa-users";
	}
}

function serializeFlight(flightID) {
	return {
		flightID : flight,
		activityType: getFlightActivityType(flightID),
		time: getFlightTime(flightID),
		location: getFlightLocation(flightID),
		members: getFlightMembers(flightID),
		dateOfCreation: getFlightDoC(flightID)
	};
}

//Get location stub
function getLocation() {
	return "Amerhst";
}

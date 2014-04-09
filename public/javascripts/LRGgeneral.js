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

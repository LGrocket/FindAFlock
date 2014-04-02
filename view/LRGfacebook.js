function getFriendFlights(user) {
	var friends = getFacebookFriends(user.facebookID);
	var friendFlights;
	friends.forEach( function(friend) { 
		friendFlights.push( getFlight(getFlock(getUser(friend.facebookID).current_flock).flockID));
	});
	return friendFlights;
}


/* GET page on specific flight id in path */
exports.index = function(req, res){
  var flightID = req.url;
  res.render('flight', {
		flight: {
			flightID: flightID,
			activityType: getFlightActivityType(flightID),
			time: getFlightTime(flightID),
			location: getFlightLocation(flightID),
			members: getFlightMembers(flightID),
			dateOfCreation: getFlightDoC(flightID)
		}
  });
};

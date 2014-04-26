/* GET dashbaord if authenticaed, login page if unauthenticated */
//require('private/LRGgeneral.js');
//exports.index = function(req, res){
  //var localFlights = [];
  //getLocalFlights(getUserCurrentLocation(user)).forEach(function(flightID) {
	  //localFlights.push(serializeFlight(flightID));
  //});
  ////TODO: crafted mongodb query for flights of friends? returns flightID
  ////if not logged in:
  ////res.render('login');
  ////else {
	  //res.render('index', {
			//localFlights: localFlights,
			//friendFlights: { 
			//}
	  //});
  ////}
//};


exports.index = function(req, res) {
	res.render('index');
};

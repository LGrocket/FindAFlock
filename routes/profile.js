/* GET profile page and settings page */
if (isloggedin(req, res)) {
	exports.profile = function(req, res){
	  res.render('profile', { user: req.user });
	};
}

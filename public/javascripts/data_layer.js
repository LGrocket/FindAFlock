//from http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs

var databaseUrl =  "vagrant@10.0.2.2/test"
var collections = ["users"]

var db = require('mongojs').connect(databaseUrl, collections);

exports.getUser = function(facebookID, callback) {
	db.users.findOne(   {"facebookID": facebookID}, 
						function(err,docs)
							{ 
								if (err) { 
									callback(err);
								} else {
									callback(null,docs);
								}
							}
	);
}

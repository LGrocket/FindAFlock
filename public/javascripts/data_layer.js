//from http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs

var databaseUrl =  "vagrant@127.0.0.1/test"
var collections = ["users","flocks","flights"]

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

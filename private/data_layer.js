//from http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs

var databaseUrl =  "vagrant@10.0.2.2/test";
var collections = ["users", "flights"];

var db = require('mongojs').connect(databaseUrl, collections);


//    *****************
//    *      Users    *
//    *****************
// Users: [{userID, current_location:[lat, long], current_flight:flightID}]

exports.getFriendsFlights = function(users, cb) { 
    db.users.distinct("current_flight"
                    , {"userID": { $in: users }}
                    , function(err, result){
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!result) {
                                cb("Connection Error");
                            } else {
                                cb(null, result);
                            }
                        }
                    }
    );
    return this;
};

exports.addUser = function(userID, location, cb){
    db.users.update( {"userID": userID}
            ,{"userID": userID, "location": location}
            ,{upsert: true}
            ,function(err, result){
                if (typeof cb === 'function'){
                    if (err){
                        cb(err);
                    } else if (!result) {
                        cb("Connection Error");
                    } else {
                        cb(null, true);
                    }
                }
            }
    );
    return this;
};
exports.setLocation = function(userID, location, cb){
    db.users.update( {"userID": userID}
            ,{ $set: {"location": location} }
            ,{}
            ,function(err, result){
                if (typeof cb === 'function'){
                    if (err){
                        cb(err);
                    } else if (!result) {
                        cb("Connection Error");
                    } else {
                        cb(null, true);
                    }
                }
            }
    );
    return this;
};
exports.setFlight = function(userID, flockID, cb){
    db.users.update( {"userID": userID}
            ,{ $set: {"current_flock": flockID} }
            ,{}
            ,function(err, result){
                if (typeof cb === 'function'){
                    if (err){
                        cb(err);
                    } else if (!result) {
                        cb("Connection Error");
                    } else {
                        cb(null, true);
                    }
                }
            }
    );
    return this;
};
exports.getUserCurrentLocation = function(userID, cb){
    db.users.findOne({"userID": userID},
            function(err, user) {
                if (typeof cb === 'function'){
                    if (err){
                        cb(err);
                    } else if (!user) {
                        cb("User not found");
                    } else {
                        cb(null, user.location);
                    }
                }
            }
    );
    return this;
};
exports.getUserCurrentFlight = function(userID, cb){
    db.users.findOne({"userID": userID},
            function(err, user) {
                if (typeof cb === 'function'){
                    if (err){
                        cb(err);
                    } else if (!user) {
                        cb("User not found");
                    } else {
                        cb(null, user.current_flock);
                    }
                }
            }
    );
    return this;
};

//    *****************
//    *    Flights    *
//    *****************
// Flight: [{flightID(_id), activity_type, date_of_creation, time, location, flock:[user1, user2…]}]

exports.createFlight = function(cb){
    db.flights.insert({"date_of_creation": new Date(), "flock": []}
            ,function(err, result){
                if (typeof cb === 'function'){
                    if (err){
                        cb(err);
                    } else if (!result) {
                        cb("Connection Error");
                    } else {
                        cb(null, result._id);
                    }
                }
            }
    );
    return this;
}
exports.addUserToFlight = function(flightID, userID, cb){
    this.removeUserFromFlight(userID, flightID, null);
    this.setFlight(userID, flightID, null);
    db.flights.update({"_id": flightID}
                    ,{ $push : { "flock": userID}}
                    ,function(err, user) {
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!user) {
                                cb("User not found");
                            } else {
                                cb(null, user.current_flock);
                            }
                        }
                    }
    );
    return this;
};
exports.removeUserFromFlight = function(userID, flightID, cb){
    this.setFlight(userID, null, null);
    db.flight.update({"_id": flightID}
                    ,{ $pull: { "flock": userID } }
                    ,function(err, result){
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!result) {
                                cb("Connection Error");
                            } else {
                                cb(null, result.activity_type);
                            }
                        }
                    }
    );
    return this;
};
exports.setFlightActivityType = function(flightID, activity_type, cb){
    db.flights.update( {"_id": flightID}
        ,{ $set: {"activity_type": activity_type} }
        ,{}
        ,function(err, result){
            if (typeof cb === 'function'){
                if (err){
                    cb(err);
                } else if (!result) {
                    cb("Connection Error");
                } else {
                    cb(null, result.activity_type);
                }
            }
        }
    );
    return this;
};
exports.setFlightActivity = function(flightID, activity, cb){
    db.flights.update( {"_id": flightID}
        ,{ $set: {"activity": activity} }
        ,{}
        ,function(err, result){
            if (typeof cb === 'function'){
                if (err){
                    cb(err);
                } else if (!result) {
                    cb("Connection Error");
                } else {
                    cb(null, true);
                }
            }
        }
    );
    return this;
};
exports.setFlightTime = function(flightID, start_time, cb){
     db.flights.update( {"_id": flightID}
        ,{ $set: {"time": start_time} }
        ,{}
        ,function(err, result){
            if (typeof cb === 'function'){
                if (err){
                    cb(err);
                } else if (!result) {
                    cb("Connection error");
                } else {
                    cb(null, true);
                }
            }
        }
    );
    return this;
};
exports.setFlightLocation = function(flightID, location, cb){
    db.flights.update( {"_id": flightID}
        ,{ $set: {"location": location} }
        ,{}
        ,function(err, result){
            if (typeof cb === 'function'){
                if (err){
                    cb(err);
                } else if (!result) {
                    cb("Connection error");
                } else {
                    cb(null, true);
                }
            }
        }
    );
    return this;
};
exports.getLocalFlights = function(location, distance, cb){
    db.flights.find({'location.0': { $gte: location[0]-distance, $lte: location[0]+distance}, 'location.1': { $gte: location[1]-distance, $lte: location[1]+distance}}
                    ,{_id: 1}
                    ,function(err, result){
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!result) {
                                cb("Connection error");
                            } else {
                                var array = [];
                                for (var i = 0; i < result.length; i++)
                                    array.push( result[i]._id);
                                cb(null, array);
                            }
                        }
                    }
    );
    return this;
};
exports.getFlightMembers = function(flightID, cb){
    db.flights.findOne({"_id": flightID},
                    function(err, result){
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!result) {
                                cb("Connection Error");
                            } else {
                                cb(null, result.flock);
                            }
                        }
                    }
    );
    return this;
};
exports.getFlightActivity = function(flightID, cb){
    db.flights.findOne({"_id": flightID},
                    function(err, result){
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!result) {
                                cb("Connection Error");
                            } else {
                                cb(null, result.activity);
                            }
                        }
                    });
    return this;
};
exports.getFlightActivityType = function(flightID, cb){
    db.flights.findOne({"_id": flightID},
                    function(err, result){
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!result) {
                                cb("Connection Error");
                            } else {
                                cb(null, result.activity_type);
                            }
                        }
                    }
    );
    return this;
};
exports.getFlightDoC = function(flightID, cb){
    db.flights.findOne({"_id": flightID},
                    function(err, result){
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!result) {
                                cb("Connection Error");
                            } else {
                                cb(null, result.date_of_creation);
                            }
                        }
                    }
    );
    return this;
};
exports.getFlightTime = function(flightID, cb){
    db.flights.findOne({"_id": flightID},
                    function(err, result){
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!result) {
                                cb("Connection Error");
                            } else {
                                cb(null, result.time);
                            }
                        }
                    }
    );
    return this;
};
exports.getFlightLocation = function(flightID, cb){
    db.flights.findOne({"_id": flightID},
                    function(err, result){
                        if (typeof cb === 'function'){
                            if (err){
                                cb(err);
                            } else if (!result) {
                                cb("Connection Error");
                            } else {
                                cb(null, result.location);
                            }
                        }
                    }
    );
    return this;
};

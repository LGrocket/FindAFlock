db.users.insert({userID: "5f8307329ed5d632", current_location:[40.2, 72.5], current_flight:3});
db.users.insert({userID: "2617c68bfa4c3481", current_location:[10.2, 72.5], current_flight:2});
db.users.insert({userID: "566650ced1200d6a", current_location:[10.1, 72.5], current_flight:2});
db.users.insert({userID: "2a4a1ec8dfc81c42", current_location:[40.2, 72.5], current_flight:0});
db.users.insert({userID: "398aef791aacbd19", current_location:[40.3, 72.5], current_flight:3});

db.flight.insert({flightID: 2, activityType: "Food", date_of_creation: "14042014", time: "2100", location: [10.2, 72.5], flock:["2617c68bfa4c3481", "566650ced1200d6a"]});
db.flight.insert({flightID: 3, activityType: "Movies", date_of_creation: "14042014", time: "2100", location: [10.2, 72.5], flock:["5f8307329ed5d632", "398aef791aacbd19"]});

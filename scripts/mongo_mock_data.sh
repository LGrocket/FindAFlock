db.facebook.insert({facebookID: "5f8307329ed5d632", profilePicture: "http://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/grumpy-dog-11.jpg", name: "Alice X", friendList: ["566650ced1200d6a","2a4a1ec8dfc81c42","2617c68bfa4c3481"]});
db.facebook.insert({facebookID: "2617c68bfa4c3481", profilePicture: "https://pbs.twimg.com/profile_images/3274461853/52263042d7ca94ca26b0685d89132ba2.jpeg", name: "Bobby Y", friendList: ["5f8307329ed5d632","398aef791aacbd19"]});
db.facebook.insert({facebookID: "566650ced1200d6a", profilePicture: "https://pbs.twimg.com/profile_images/378800000499629039/36b10524fa9f4d0d8194fd308c3b1b0b.jpeg", name: "Carol Z", friendList: ["5f8307329ed5d632","2a4a1ec8dfc81c42"]});
db.facebook.insert({facebookID: "2a4a1ec8dfc81c42", profilePicture: "http://a429.phobos.apple.com/us/r30/Purple/5d/1c/56/mzl.pgoejyne.128x128-75.png", name: "Ducky Q", friendList: ["5f8307329ed5d632","566650ced1200d6a"]});
db.facebook.insert({facebookID: "398aef791aacbd19", profilePicture: "https://pbs.twimg.com/profile_images/413977145858220032/IiIfu9tE.png", name: "Eziekel T", friendList: ["2617c68bfa4c3481"]});

db.users.insert({facebookID: "5f8307329ed5d632", current_location:[40.2, 72.5], current_flight:3});
db.users.insert({facebookID: "2617c68bfa4c3481", current_location:[10.2, 72.5], current_flight:2});
db.users.insert({facebookID: "566650ced1200d6a", current_location:[10.1, 72.5], current_flight:2});
db.users.insert({facebookID: "2a4a1ec8dfc81c42", current_location:[40.2, 72.5], current_flight:0});
db.users.insert({facebookID: "398aef791aacbd19", current_location:[40.3, 72.5], current_flight:3});

db.flight.insert({flightID: 2, activityType: "Food", date_of_creation: "14042014", time: "2100", location: [10.2, 72.5], flock:["2617c68bfa4c3481", "566650ced1200d6a"]});
db.flight.insert({flightID: 3, activityType: "Movies", date_of_creation: "14042014", time: "2100", location: [10.2, 72.5], flock:["5f8307329ed5d632", "398aef791aacbd19"]});

var fnFindUser = User.find({ uid: uidIn }, function (err, user) {
    if (err) {
        console.log("error encountered");
        res.status(500);
        return res.send("Error occured ");
    }
    console.log("in the block of db query");
    console.log(user);
    try {
        console.log("accessing the user object " + user[0].uid + "//");

        if (user[0].pw == pwIn) {
            console.log("comparing " + user[0].uid.pw + " - " + pwIn)
            return res.send("Good Credentials for -- " + user[0].uid);
        } else {
            return res.send("Bad Credentials for -- " + user[0].uid);
        }
    } catch (e) {
        console.log("some non technical db error ");
        res.status(500);
        res.send("Non technical error, Pls reflect on your actions, Sir and be charitable to the humble computer");
    }

});


	// save the user
	// newUser.save(function (err) {
	// 	if (err) throw err;
	// 	console.log('User created!');
	// });

	// db.collection("USERS").findOne({uid:req.body.uid});

	// // Creates a new collection named "users" 
	// //      (if it's already created, it will just return it instead)
	// db.collection("users").then(collection => {
	// 	// Inserts a new document into the collection
	// 	collection.insert({ name: "John", lastName: "Abruzzi" }).then(document => {
	// 		console.log(document);  // -> { name: "John", lastName: "Abruzzi" }

	// 		// Performs a query against this collection, fetching all the results
	// 		users.find({ name: "John" }).then(documents => {
	// 			if(req.body.uid==document.name){
	// 				return res.send("Good Credentials for -- " + document.name);
	// 			}
	// 		});
	// 	});
	// });


	// return res.send("Invalid Credentials for -- " + document.name);

module.exports = {
    findUser: fnFindUser

};


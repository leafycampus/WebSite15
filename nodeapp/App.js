const express = require('express')

const app = express()
const port = 3000
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
// var  mongo= require("mongo-portable").MongoPortable;

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(passport.initialize());
app.use(passport.session());

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/DATABASE_16';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var User = require('./user');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var router = express.Router();
var path = __dirname + '/views/';
app.use(express.static(__dirname + '/public'));

app.use("/", router);
router.get("/univ", function (req, res) {
	res.sendFile(path + "Universities.html");
});
router.get("/univ1", function (req, res) {
	res.sendFile(path + "Universities_r.html");
});
router.get("/login", function (req, res) {
	res.sendFile(path + "Login.html");
});
router.post("/loginSubmit1",
	function (req, res) {

		if (req.body.pw == 'hello') {
			return res.sendFile(path + "Universities.html");
		} else {
			res.status(403);
			return res.send("Invalid Credentials for " + req.params.pw);
		}
	}
)
router.post('/loginSubmit', (req, res) => {

	// var newUser = User({
	// 	uid: 'k',
	// 	pw: 'k'
	// });
	var pwIn = req.body.pw;
	console.log("getting the pw from request "+pwIn);
	var uidIn = req.body.uid;
	var userFromDb = User.find({ uid: uidIn }, function (err, user) {
		if (err) {
			console.log("error encountered");
			res.status(500);
			return res.send("Error occured "  );
		}
		console.log("in the block of db query");
		console.log(user);
		try{
		console.log("accessing the user object "+user[0].uid+"//");
	
		if (user[0].pw == pwIn) {
			console.log("comparing "+user[0].uid.pw+" - "+pwIn)
			return res.send("Good Credentials for -- " + user[0].uid);
		} else {
			return res.send("Bad Credentials for -- " + user[0].uid);
		}
		}catch(e){
			console.log("some non technical db error ");
			res.status(500);
			res.send("non technical error, Pls reflect on your actions, Sir and be charitable to the humble computer");
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
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
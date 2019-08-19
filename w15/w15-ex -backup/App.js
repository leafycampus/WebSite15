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

router.post('/loginSubmit', (req, res) => {

	// var newUser = User({
	// 	uid: 'k',
	// 	pw: 'k'
	// });


	var pwIn = req.body.pw;
	console.log("getting the pw from request " + pwIn);
	var uidIn = req.body.uid;
	var userFromDb = User.find({ uid: uidIn }, function (err, user) {
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
})
var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
	usernameField: 'uid',
	passwordField: 'pw'
},
	(username, password, done) => {
		findUser1(username, password, (err, user) => {
			console.log("in the passport use method");
			if (err) {
				return done(err)
			}
			// User not found
			if (user) {
				console.log("authenticated");
				return done(user, false)

			}
			// Always use hashed passwords and fixed time comparison
		})
	}
));
function findUser1(uidIn, pwIn, callback) {

	console.log("getting the user from request " + uidIn);

	var userFromDb = User.find({ uid: uidIn }, function (err, user) {
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
				console.log("comparing " + user[0].pw + " - " + pwIn)
				return callback(null, user[0]);
			} else {
				return callback(null, null);
			}
		} catch (e) {
			console.log("some non technical db error ");

		}

	});
}
passport.serializeUser(function(user, done) {
	done(null, user.uid);
  });
  
  passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
	  done(err, user);
	});
  });
// app.post('/loginSubmit2', function (req, res) {
// 	passport.authenticate('local-login'), () => {
// 		if (passport.isAuthenticated) {

// 			return res.redirect('/univ2');
// 		}
// 		return res.redirect('/login');
// 	}
// }
// );
app.post("/loginSubmit2",
	passport.authenticate("local", { 
		successRedirect: "/",
		failureRedirect: "/login" }),
	function (req, res) {
		res.redirect("/univ");
	});

router.get("/univ2", authenticationMiddleware(), function (req, res) {

	res.sendFile(path + "Universities_r.html");
});
// file:app/authentication/middleware.js
function authenticationMiddleware() {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		}
		res.redirect('/login')
	}
}

router.post("/loginSubmit1",
	function (req, res) {
		const passport = require('passport')
		const LocalStrategy = require('passport-local').Strategy
		passport.use(new LocalStrategy(
			(username, password, done) => {
				findUser(username, (err, user) => {
					if (err) {
						return done(err)
					}
					// User not found
					if (user) {
						console.log("authenticated");
						return done(null, false)

					}
					// Always use hashed passwords and fixed time comparison
				})
			}
		))
		function findUser(username, callback) {
			var pwIn = req.body.pw;
			console.log("getting the pw from request " + pwIn);
			var uidIn = req.body.uid;
			var userFromDb = User.find({ uid: uidIn }, function (err, user) {
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
						return callback(null, user[0]);
					} else {
						return res.send("Bad Credentials for -- " + user[0].uid);
					}
				} catch (e) {
					console.log("some non technical db error ");
					res.status(500);
					res.send("Non technical error, Pls reflect on your actions, Sir and be charitable to the humble computer");
				}

			});
		}
		return res.send("some processing done");
	}
)




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
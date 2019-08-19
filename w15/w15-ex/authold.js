router.post("/loginSubmitx",
	function (req, res) {
		const passport = require('passport')
		const LocalStrategy = require('passport-local').Strategy
		passport.use(new LocalStrategy(
			(username, password, done) => {
				findUser(username, (err, user) => {
					if (err) {
						console.log("not authenticated");
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
					return res.redirect("Error occured ");
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


})


function authenticationMiddleware() {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		}
		res.redirect('/login')
	}
}



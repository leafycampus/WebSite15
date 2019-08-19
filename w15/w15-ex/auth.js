//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/DATABASE_16';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var User = require('./user');
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// var  mongo= require("mongo-portable").MongoPortable;

function authenticationMiddleware() {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		}
		res.redirect('/login')
	}
}



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
            console.log(e)
            console.log("some non technical db error ");
    
        }
    
    });
    }

    
module.exports = {
    auth: authenticationMiddleware,
    fuser: findUser1,
    User:User
}
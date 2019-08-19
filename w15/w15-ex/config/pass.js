// var passport = require('passport')
// , LocalStrategy = require('passport-local').Strategy;

// const express = require('express')
// const app = express()
// var router = express.Router();
// app.use("/", router);

// //Import the mongoose module
// var mongoose = require('mongoose');
// //Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/DATABASE_16';
// mongoose.connect(mongoDB, { useNewUrlParser: true });
// var User = require('../user');
// var db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// // var  mongo= require("mongo-portable").MongoPortable;

// passport.use(new LocalStrategy({
//     usernameField: 'uid',
//     passwordField: 'pw'
//     },
//     (username, password, done) => {
//         findUser1(username, password, (err, user) => {
//             console.log("in the passport use method");
//             if (err) {
//                 return done(null, false, { errors: { 'email or password': 'is invalid' } });
//             }
//             // User not found
//             if (user) {
//                 console.log("authenticated");
//                 // passport.authenticate()			
//                 console.log(passport.isAuthenticated)
//                 return done(null, user);
                
//             }
           
//         })
//     }
//     ));
//     function findUser1(uidIn, pwIn, callback) {
    
//     console.log("getting the user from request " + uidIn);
    
//     var userFromDb = User.find({ uid: uidIn }, function (err, user) {
//         if (err) {
//             console.log("error encountered");
//             res.status(500);
//             return res.send("Error occured ");
//         }
//         console.log("in the block of db query");
//         console.log(user);
//         try {
//             console.log("accessing the user object " + user[0].uid + "//");
    
//             if (user[0].pw == pwIn) {
//                 console.log("comparing " + user[0].pw + " - " + pwIn)
//                 return callback(null, user[0]);
//             } else {
//                 return callback(null, null);
//             }
//         } catch (e) {
//             console.log(e)
//             console.log("some non technical db error ");
    
//         }
    
//     });
//     }
//     passport.serializeUser(function (user, done) {
//     done(null, user.uid);
//     });
    
//     passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
//     });
//     function authenticationMiddleware() {
//         return function (req, res, next) {
//             if (passport.isAuthenticated()) {
//                 return next()
//             }
//             res.redirect('/login')
//         }
//     }
    
//     router.post("/loginSubmit2",
//     passport.authenticate("local", {
//         successRedirect: "/univ",
//         failureRedirect: "/login"
//     }),
//     function (req, res) {
//         res.sendFile(path + "Universities_r.html");
//         // res.redirect("/univ");
//     });

//     module.exports=authenticationMiddleware
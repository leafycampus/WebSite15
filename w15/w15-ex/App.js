const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());
app.use(bodyParser());
// app.use(session({ secret: 'keyboard cat' }));
app.use(session({ secret: 'somethingdfsafsafsafsafasfsfasfa', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

var auth = require('./auth')
var fuser =auth.fuser
var authfilter = auth.auth
var User = auth.User

const errorHandler = require('errorhandler');
var morgan = require('morgan')

var router = express.Router();
var path = __dirname + '/views/';



// const { body, validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static(__dirname + '/public'));
app.use("/", router);
app.use(errorHandler());
app.use(morgan('tiny'));



router.get("/univ", function (req, res) {
	res.sendFile(path + "Universities.html");
});
router.get("/univ1", function (req, res) {

	res.sendFile(path + "Universities_r.html");
});
router.get("/login", function (req, res) {
	res.sendFile(path + "Login.html");
});
router.get("/univ2", authfilter(), function (req, res) {
	res.sendFile(path + "Universities_r.html");
});


router.post("/loginSubmit2",
passport.authenticate("local", {
    successRedirect: "/univ2",
    failureRedirect: "/login"
}),
function (req, res) {
    res.sendFile(path + "Universities_r.html");
    // res.redirect("/univ");
});


app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
  });








app.listen(port, () => console.log(`Example app listening on port ${port}!`))






passport.use(new LocalStrategy({
usernameField: 'uid',
passwordField: 'pw'
},
(username, password, done) => {
    fuser(username, password, (err, user) => {
        console.log("in the passport use method");
        if (err) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
        // User not found
        if (user) {
            console.log("authenticated");
			// passport.authenticate()			
            console.log(passport.isAuthenticated)
            return done(null, user);
            
        }
       
    })
}
));

passport.serializeUser(function (user, done) {
done(null, user._id);
});

passport.deserializeUser(function (id, done) {
User.findById(id, function (err, user) {
    done(err, user);
});
});
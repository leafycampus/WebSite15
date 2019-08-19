var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: false,
    },
    pw: {
        type: String,
        unique: false,
    }
});

var User = mongoose.model('User', userSchema);
// var newUser = User({
// 	uid: 'k',
// 	pw: 'k'
// });

module.exports=User;
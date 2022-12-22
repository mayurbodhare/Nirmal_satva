const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

var ROLE = {
    admin: 'admin',
    user: 'user'
}

var userSchema = new mongoose.Schema({
    // role: ROLE,
    username: {
        type: String,
        required: 'Name Cannot be Blank!',
        unique: true
    },
    password : {
        type: String,
        // required: 'Password Cannot be Empty!'
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

var db = require("../model");

var middleware = {};

middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('You are not logged in !!!');
    res.redirect("/admin/login"); 
}

module.exports = middleware;
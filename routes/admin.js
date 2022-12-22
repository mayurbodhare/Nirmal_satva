var express = require("express");
var router = express.Router();
var passport = require("passport");

var db = require('../model');
var helpers = require("../helpers");
var middleware = require("../middleware");
var fs = require("fs")
const { post } = require(".");

router.route("/register")
    .get((req, res) =>{ 
    res.render('product-admin/register');
    })
    .post(helpers.adminRegister);

router.route("/login")
    .get((req, res) => {
        res.render('product-admin/login');
    })
    .post(passport.authenticate('local', {
        successRedirect: "/admin/products",
        failureRedirect: "/admin/login"
    }));

router.get('/logout',middleware.isLoggedIn, helpers.logout);

// admin functionalities
// 
router.get("/products",middleware.isLoggedIn,helpers.getAllProductsAdmin);

router.get("/new",middleware.isLoggedIn,function (req, res) {
    res.render("product-admin/new");
});

router.post("/new",middleware.isLoggedIn,helpers.upload.single('image'), helpers.createNewProduct);

router.get('/:id', middleware.isLoggedIn, helpers.getOneProductAdmin);

router.get("/:id/edit", middleware.isLoggedIn, helpers.getOneProductAdminEdit);

router.put('/:id', middleware.isLoggedIn, helpers.upload.single('image'), helpers.editProduct);

router.delete('/:id', middleware.isLoggedIn, helpers.deleteProduct);

module.exports = router;
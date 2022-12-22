var express = require("express");
var router = express.Router();
var passport = require("passport");

var db = require("../model");
var helpers = require("../helpers");

router.route('/')
    .get((req, res) => {
        res.render('product/landing');
    });

router.route('/products')
    .get(helpers.getAllProducts);

router.route('/:id')
    .get(helpers.getOneProduct);

router.route('/:id/bill')
    .get((req, res) => {
        res.render('product/billing',{id: req.params.id});
    })

router.route('/:id/order')
    .post(helpers.createNewOrder);

module.exports = router;
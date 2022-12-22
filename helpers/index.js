var passport = require("passport");
var db       = require("../model");
var multer       = require("multer");
var path         = require("path");
var fs = require("fs")

exports.getAllProducts = (req, res) => {
        db.Product.find()
        .then((allProducts) => 
            res.render('product/products',{Products : allProducts}))
        .catch((err) => {
            console.log(err);
        });
}

exports.getAllProductsAdmin = (req, res) => {
    db.Product.find()
    .then((allProducts) => 
        res.render('product-admin/products',{Products : allProducts}))
    .catch((err) => {
        console.log(err);
    });
}

exports.getOneProduct = (req,res) =>{
        db.Product.findById(req.params.id)
            .then((foundProduct) => {
                console.log(foundProduct);
                res.render("product/show", {Product: foundProduct});
            })
            .catch((err) => {
                console.log(err);
            })
}

exports.getOneProductAdmin = (req,res) =>{
    db.Product.findById(req.params.id)
        .then((foundProduct) => {
            console.log(foundProduct);
            res.render("product-admin/show", {Product: foundProduct});
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getOneProductAdminEdit = (req,res) =>{
    db.Product.findById(req.params.id)
        .then((foundProduct) => {
            console.log(foundProduct);
            res.render("product-admin/edit", {product: foundProduct});
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.adminRegister = (req, res) => {
    var newAdmin = new db.User({username: req.body.username});
    db.User.register(newAdmin, req.body.password)
        .then((admin) => {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/admin/products");
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log("Your are logged out!!!");
      }
      else{ 
        res.redirect('/');
      }
    });
}

exports.createNewProduct = (req, res) => {
    var newProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: {
        data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
        contentType: 'image/jpeg'
      }
    };
    db.Product.create(newProduct)
        .then((newlyCreated) => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.createNewOrder = (req, res) => {
    var newOrder = req.body.Order;

    db.Order.create(newOrder)
        .then((newlyCreatedOrder) => console.log("new order created"))
        .catch((err) => console.log(err))
}

exports.editProduct = (req, res) => {
    var newProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: {
        data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
        contentType: 'image/jpeg'
      }
    };
    db.Product.findByIdAndUpdate(req.params.id ,newProduct, (err, newlyCreated) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin/products");
      }
    });
}

exports.deleteProduct = (req, res) => {
    db.Product.findByIdAndRemove(req.params.id)
        .then(() => res.redirect("/admin/products"))
        .catch( err => {
            console.log(err);
            res.redirect("/admin/products");
        })
}

exports.upload = multer({
    storage: multer.diskStorage ({
        destination : (req, file, cb) => {
            cb(null, './uploads');
        },
        filename : function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })
})


module.exports = exports;
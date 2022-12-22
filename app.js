var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    localStrateegy  = require("passport-local"),
    db              = require("./model"),
    User            = db.User,
    Product         = db.Product,
    ejs             = require("ejs");
const path=require("path");
    
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/uploads')); //

var indexRoutes = require('./routes/index');
var adminRoutes = require('./routes/admin');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set('views',path.join(__dirname,"./views") );


app.use(
    require('express-session')({
        secret : "IronMan",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrateegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.User;
    next();
});


app.use('/', indexRoutes);
app.use('/admin', adminRoutes);

var port = 3000;
app.listen(port, () => {
    console.log(`Server is started at ${port} !!!`);
})
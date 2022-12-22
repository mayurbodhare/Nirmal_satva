var mongoose = require("mongoose");
// mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/Nirmal-satva', {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect('mongodb+srv://mayurbodhare:Mayur@123@cluster0.qzkunw7.mongodb.net/Nirmal-satva?retryWrites=true&w=majority')
mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Product = require('./product');
module.exports.Order = require('./order');

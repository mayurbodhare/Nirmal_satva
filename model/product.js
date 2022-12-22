var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name:{
        type: String,
        required : 'Product name cannot be Empty'
    },
    description:{
        type: String,
        required : 'Product description cannot be Empty'
    },
    image:
    {
        data: Buffer,
        contentType: String,
        // required : 'Product image cannot be Empty'
    },
    price:{
        type: String,
        required : 'Product price cannot be Empty'
    },
    
});

module.exports = mongoose.model("Product", productSchema);
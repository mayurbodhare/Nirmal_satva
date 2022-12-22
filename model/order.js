var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    email:{
        type: String
    },
    mobile:{
        type: String
    },
    address:{
        type: String
    },
    state:{
        type: String
    },
    city:{
        type: String
    },
    PIN:{
        type: String
    },
    quantity:{
        type: Number
    }    
});

module.exports = mongoose.model("Order", orderSchema);
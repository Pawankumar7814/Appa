let mongoose = require("mongoose");

var Product = mongoose.Schema({
    Productname: {
        type: String
    },

    Productdescription: {
        type: String
    },

    Productprice: {
        type: String
    },

    Productquantity: {
        type: String
    },

    Productcolor: {
        type: String
    }
})

module.exports = Product = mongoose.model("Product", Product);
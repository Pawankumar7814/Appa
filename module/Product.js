let mongoose = require("mongoose");
var uuid = require("uuid");
var Product = mongoose.Schema({
    Pid: {
        type: String,
        default: uuid.v4()
    },
    Title: {
        type: String
    },
    Description: {
        type: String
    },
    CostPrice: {
        type: Number
    },
    SalePrice: {
        type: Number
    },
    Qty: {
        type: Number
    },
    ItemInPack: {
        type: Number
    },
    Color: {
        type: String
    },
    Images: {
        type: Array,
        "default": []
    },
    Rating: {
        type: Number,
        default: 5
    },
    GST: {
        type: Number,
        default: 12
    },
    HowToUse: {
        type: String,
        default: "Soak in oil and use like all ordinary cotton wick.^ Always light Banana Stem wicks with Ghee facing North and East which gives positive results. Light these wicks for 48 days continuously.",
    },
    AddDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = Product = mongoose.model("Product", Product);
const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    products: [{
        productId: String,
        quantity: Number,
        pname: String,
        pprice: Number
    }],
    active: {
        type: Boolean,
        default: true
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
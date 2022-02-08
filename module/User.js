const mongooes = require('mongoose');
const user = new mongooes.Schema({
    UID: {
        type: String,
        unique: true,
        required: [true, "ID can't be blank"],
        index: true
    },
    UFname: {
        type: String
    },
    ULname: {
        type: String
    },
    UEmail: {
        type: String,
        unique: true,
        required: [true, "Email can't be blank"],
        index: true
    },
    UPhone: {
        type: String
    },
    UPass: {
        type: String
    },
    Ustatus: {
        type: String,
        enum: ['Active', 'NotActive'],
        default: "Active",
        required: [true, "Select from List"]
    },
    // Address: [{
    //     HouseNo: String,
    //     GaliNo: String,
    //     BlockNo: String,
    //     City: String,
    //     State: String,
    //     PinCode: String,
    //     ContactNumber: String,
    //     NearBuy: String
    // }],
    U_added_date: {
        type: Date,
        default: Date.now
    },
    U_Last_log_inDate: {
        type: Date
    }
});

module.exports = User = mongooes.model('user', user);
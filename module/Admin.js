const mongooes = require('mongoose');
const admin = new mongooes.Schema({
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
    Address: {
        HouseNo: {
            type: String,
            default: " "
        },
        StreetNo: {
            type: String,
            default: " "
        },
        City: {
            type: String,
            default: " "
        },
        State: {
            type: String,
            default: " "
        },
        PIN: {
            type: Number,
            default: " "
        },
        Country: {
            type: String,
            default: " "
        },
        NearBy: {
            type: String,
            default: " "
        },
        Address_UUID: {
            type: String
        }

    },
    U_added_date: {
        type: Date,
        default: Date.now
    },
    U_Last_log_inDate: {
        type: Date
    }
});

module.exports = Admin = mongooes.model('admin', admin);
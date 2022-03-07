const mongooes = require('mongoose');
const { stringify } = require('uuid');
const contactUsUser = new mongooes.Schema({
    FName: {
        type: String
    },
    LName: {
        type: String
    },
    Email: {
        type: String
    },
    Phone: {
        type: String
    },
    Msg: {
        type: String
    },
    reply: {
        type: String,
        default: ""
    },
    added_date: {
        type: Date,
        default: Date.now
    },
    resolved: {
        type: Boolean,
        enum: [true, false],
        default: true,
        required: [true, "Select from List"]
    },
    resolved_date: {
        type: Date
    },
    feedback: [{
        Msg: { type: String },
        Msgdate: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = ContactUsUSer = mongooes.model('contactUsUser', contactUsUser);
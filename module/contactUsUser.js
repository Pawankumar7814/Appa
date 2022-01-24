const mongooes = require('mongoose');
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
        default: false
    },
    resolved_date: {
        type: Date
    },
});

module.exports = ContactUsUSer = mongooes.model('contactUsUser', contactUsUser);
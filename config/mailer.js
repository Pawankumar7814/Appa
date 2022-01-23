const nodemailer = require("nodemailer");
let config = require("./config.json");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config.email,
        pass: config.password,
    },
});

module.exports = transporter;
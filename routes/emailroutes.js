const express = require("express");
var router = express.Router();
let config = require("../config/config.json");
let transporter = require("../config/mailer");
let ejs = require("ejs");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//route for sending emails
router.post("/sendemail", (req, res) => {
    console.log(req.body);
    let data = {
        UNAME: req.body.UNAME,
        Uemail: req.body.Uemail,
        Uphone: req.body.Uphone,
        Umsg: req.body.Umsg,
    };
    ejs.renderFile("views/email/thanks.ejs", { udata: data }, async(err, tfile) => {
        if (err) {
            console.log(err);
        } else {
            console.log(tfile);
            let info = await transporter.sendMail({
                from: config.email, // sender address
                to: data.Uemail, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: tfile, // html body
            });
            res.status(200).redirect("/");
        }
    });
});

router.get("/test", (req, res) => {
    res.render("../views/email/thanks.ejs");
});

module.exports = router;
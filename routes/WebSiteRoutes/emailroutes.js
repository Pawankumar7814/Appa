const express = require('express');
const router = express.Router();
var SendEmail = require("../../controllers/Website/emailSendController");
var EmailData = require("../../controllers/Website/emailDataController");
var sendemail = new SendEmail();
var emaildata = new EmailData();
let finalreturnvalue = {};

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//route for sending emails
router.post("/sendemail", async(req, res) => {
    await sendemail.SendOnContactUSform(req.body, async function(returnvalue) {
        await emaildata.SaveContactUserEmail(req.body, function(data) {});
        finalreturnvalue = returnvalue;
        //console.log(finalreturnvalue);
    });
    setTimeout(() => {
        if (finalreturnvalue.Status == "err") {
            req.flash("error", finalreturnvalue.Msg);
            res.status(200).redirect('/contact')
        } else {
            req.flash("success", finalreturnvalue.Msg);
            req.session.save(function() { res.status(200).redirect('/contact') });
        }
    }, 3000);
});

router.get("/test", (req, res) => {
    res.render("../views/WebSite/email/thanks.ejs", { title: "thank" });
});

module.exports = router;
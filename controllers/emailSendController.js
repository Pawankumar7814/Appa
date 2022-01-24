var transporter = require("../config/mailer");
var ejs = require("ejs");

class EmailSend {

    // use to send email to contact us form 
    SendOnContactUSform(data, cb) {
        ejs.renderFile('views/email/thanks.ejs', { name: data.UNAME }, function(err, data) {
            if (err) {
                // console.log(err);
                return cb({ Status: "err", Msg: "Error while file compling" });
            } else {
                var mainOptions = {
                    from: '"Appa" <Appa@gmail.com>',
                    to: data.Uemail,
                    subject: 'Thanks For Reaching Us',
                    html: data
                };
                console.log("html data ======================>", mainOptions.html);
                transporter.sendMail(mainOptions, function(err, info) {
                    if (err) {
                        return cb({ Status: "err", Msg: "Error Sending Email" });
                    } else {
                        return cb({ Status: "Suc", Msg: "Your Messeage Sent, We will contact you soon" });
                    }
                });
            }
        });
    }
}

module.exports = EmailSend;
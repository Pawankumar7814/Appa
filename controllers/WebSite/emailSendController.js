var transporter = require("../../config/mailer");
var ejs = require("ejs");

class EmailSend {

    // use to send email to contact us form 
    async SendOnContactUSform(data, cb) {
        ejs.renderFile('./views/email/thanks.ejs', { Udata: data }, function(err, tfile) {
            if (err) {
                console.log(err);
                return cb({ Status: "err", Msg: "Error while file compling" });
            } else {
                var mainOptions = {
                    from: '"Appa" <Appa@gmail.com>',
                    to: data.Uemail,
                    subject: 'Thanks For Reaching Us',
                    html: tfile
                };
                // console.log(data);
                // console.log("html data ======================>", mainOptions.html);
                transporter.sendMail(mainOptions, function(err, info) {
                    if (err) {
                        // console.log(err);
                        return cb({ Status: "err", Msg: "Error Sending Email" });
                    } else {
                        return cb({ Status: "Suc", Msg: "Your Messeage Sent, We will contact you soon" });
                    }
                });
            }
        });
    }

    async forgetpasswordemail(data, cb) {
        ejs.renderFile('./views/email/forgetpassword.ejs', { Udata: data }, function(err, tfile) {
            if (err) {
                console.log(err);
                return cb({ Status: "err", Msg: "Error while file compling" });
            } else {
                var mainOptions = {
                    from: '"Appa" <Appa@gmail.com>',
                    to: data.UEmail,
                    subject: 'Thanks For Reaching Us',
                    html: tfile
                };
                // console.log(data);
                // console.log("html data ======================>", mainOptions.html);
                transporter.sendMail(mainOptions, function(err, info) {
                    if (err) {
                        // console.log(err);
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
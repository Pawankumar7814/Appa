var User = require('../module/User');
var connectDBDev = require('../config/connection');
var uuid = require("uuid");
var EmailSend = require("./emailSendController");
var emailSend = new EmailSend();
class UserData {

    //Save the User
    async SaveUser(UserInfo, cb) {
        let user = {};
        user.UID = uuid.v4();
        user.UFname = UserInfo.Ufname;
        user.ULName = UserInfo.Ulname;
        user.UEmail = UserInfo.Uemail;
        user.UPhone = UserInfo.Uphone;
        user.UPass = UserInfo.Upass
        let userModel = new User(user);
        await userModel.save((err, done) => {
            if (err) {
                return cb({ Status: "err", Msg: "User Allredy Exist", data: err });
            } else {
                return cb({ Status: "suc", Msg: "User Detail Saved", data: done });
            }
        });
    }

    //Check User in Database
    async CheckUser(UserInfo, cb) {
        User.findOne({ UEmail: UserInfo.Uemail, UPass: UserInfo.Upass }, (err, user) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (user == null) {
                return cb({ Status: "err", Msg: "User Does not Exist", data: err });
            } else {
                let user2 = JSON.stringify(user);
                let user1 = JSON.parse(user2);
                delete user1.UPass;
                delete user1.Ustatus;
                delete user1.U_added_date;
                delete user1._id;
                //    console.log(typeof user1);
                return cb({ Status: "suc", Msg: "User found", data: user1 });
            }
        });
    }

    // user user with udi
    async CheckUserByUID(UserInfo, cb) {
        User.findOne({ UID: UserInfo }, (err, user) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (user == null) {
                return cb({ Status: "err", Msg: "User Does not Exist", data: err });
            } else {
                let user2 = JSON.stringify(user);
                let user1 = JSON.parse(user2);
                delete user1.UPass;
                delete user1.Ustatus;
                delete user1.U_added_date;
                delete user1._id;
                // console.log(typeof user1);
                return cb({ Status: "suc", Msg: "User found", data: user1 });
            }
        });
    }

    //Update User
    async UpdateUser(UserInfo, cb) {
        let user = {};
        user.UFname = UserInfo.Ufname;
        user.ULName = UserInfo.Ulname;
        user.UPhone = UserInfo.Uphone;

        await User.findOneAndUpdate({ UID: UserInfo.UID }, { $set: { user } }, (err, done) => {
            if (err) {
                return cb({ Status: "err", Msg: "User Allredy Exist", data: err });
            } else {
                return cb({ Status: "suc", Msg: "User Detail Saved", data: done });
            }
        });
    }

    //forgot user
    async ForgetPassword(UserInfo, cb) {
        console.log(UserInfo);
        User.findOne({ UEmail: UserInfo.emailid }, (err, user) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (user == null) {
                return cb({ Status: "err", Msg: "Email or Phone Does not Exist", data: err });
            } else {
                let user2 = JSON.stringify(user);
                let user1 = JSON.parse(user2);
                // delete user1.UPass;
                delete user1.Ustatus;
                delete user1.U_added_date;
                delete user1._id;
                console.log(typeof user1);
                emailSend.forgetpasswordemail(user1, (info) => {
                    if (info.Status == "err") {
                        return cb({ Status: "err", Msg: "Error sending email", data: err });
                    } else {
                        return cb({ Status: "suc", Msg: "Check your email for password", data: user1 });
                    }
                });

            }
        });
    }
}

module.exports = UserData
var User = require('../module/User');
var connectDBDev = require('../config/connection');
var uuid = require("uuid");

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
                return cb({ Status: "err", Msg: "Error while Saving Data", data: err });
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
            } else {
                delete user.UPass;
                console.log(user);
                return cb({ Status: "suc", Msg: "User found", data: user });
            }
        });
    }
}

module.exports = UserData
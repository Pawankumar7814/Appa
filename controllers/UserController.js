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
                let user2 = JSON.stringify(user);
                let user1 = JSON.parse(user2);
                delete user1.UPass;
                delete user1.Ustatus;
                delete user1.U_added_date;
                delete user1._id;
                return cb({ Status: "suc", Msg: "User found", data: user1 });
            }
        });
    }
}

module.exports = UserData
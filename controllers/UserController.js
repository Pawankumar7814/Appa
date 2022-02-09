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
            // if (UserInfo.Upass == UserInfo.upass1) {
            //     if (UserInfo.Upass > 8) {
            //         // document.getElementById("message").innerHTML = "Password must be atleast 8 Characters";
            //         console.log("8");
            //         return false;
            //     } else if (UserInfo.Upass < 15) {
            //         // document.getElementById("message").innerHTML = "Password must be less than 15 characters";
            //         console.log("18");
            //         return true;
            //     }
            //     user.UPass = UserInfo.Upass;
            // } else {
            //     // document.getElementById("message").innerHTML = "Password must be same";
            //     console.log("Password must be same");
            //     return false;
            // }
        let userModel = new User(user);
        await userModel.save((err, done) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error while Saving Data", data: err });
            } else {
                return cb({ Status: "suc", Msg: "User Detail Saved", data: done });
            }
        });
    }

}

module.exports = UserData
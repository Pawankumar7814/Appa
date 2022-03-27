// All require modules
var express = require("express");
var router = express.Router();
var User = require("../../controllers/Website/UserController");
var JWT = require('../../controllers/Website/jwt');
var uuid = require('uuid');
var user = new User();
var jwt = new JWT();
var usermiddleware = require("../../middleware/userverification")(jwt);
var OgData = require("../../config/Og.json");

//log In Routes
{
    // Get Route 
    router.get(["/", "/index", "/Signin", "/Login"], usermiddleware.checkuserexicte, (req, res) => {
        OgData.title = "Log In page";
        OgData.description = "LogIn to Appa page now";
        OgData.image = "/Images/ganesha-left.jpeg";
        console.log(OgData);
        return res.status(200).render("../views/WebSite/User/index.ejs", { title: "LogIn - Appa", Og: OgData });
    });

    // Post Route 
    router.post(["/Signin", "/Login"], usermiddleware.checkuserexicte, (req, res) => {
        user.CheckUser(req.body, (udata) => {
            if (udata.Status == "err") {
                req.flash("error", udata.Msg);
                return res.status(200).redirect("/User/Login");
            } else {
                var token = jwt.generateAccessToken({ UD: udata.data.UID });
                res.cookie("token", token, { maxAge: 60 * 1000 * 60, httpOnly: true });
                res.cookie("UserName", udata.data.UFname, { maxAge: 60 * 1000 * 60, httpOnly: true });
                req.flash("success", udata.Msg);
                return res.status(200).redirect("/");
            }
        });
    });
}

//Registrations Route
{
    // get Route 
    router.get(["/Signup", "/Register"], usermiddleware.checkuserexicte, (req, res) => {
        OgData.title = "Register page";
        OgData.description = "Register to Appa page now";
        OgData.image = "/Images/ganesha-left.jpeg";
        console.log(OgData);
        return res.status(200).render("../views//WebSite/User/Register.ejs", { title: "Register  - Appa", Og: OgData });
    });

    // post Route 
    router.post(["/Signup", "/Register"], usermiddleware.checkuserexicte, (req, res) => {
        // console.log(req.body);
        user.SaveUser(req.body, (info) => {
            console.log(info);
            if (info.Status == "err") {
                req.flash("error", info.Msg);
                return res.status(200).redirect("/User/Signup");
            } else {
                req.flash("success", "User Registration Done Try to Login");
                return res.status(200).redirect("/User/LogIn");
            }
        });
    });
}

//User Profile Route
{
    // get Route to View User
    router.get(["/view"], usermiddleware.authenticateToken, (req, res) => {
        let udata = jwt.getUID(res.locals.user);
        //console.log(udata.UD);
        user.CheckUserByUID(udata.UD, (info) => {
            if (info.Status == "err") {
                req.flash("error", "Pls LogIn Again");
                return res.status(200).redirect("/User/LogIn");
            } else {
                console.log(info.data);
                OgData.title = "User Profile";
                OgData.description = "Here user can view his or her details.";
                return res.status(200).render("../views/WebSite/User/View.ejs", { title: "Profile - Appa", data: info.data, Og: OgData });
            }
        });
    });

    //get Route to Edit Profile
    router.get(["/userupdate", "/userprofile", "/profile", "/Edit"], usermiddleware.checkcookie, usermiddleware.authenticateToken, (req, res) => {
        let udata = jwt.getUID(res.locals.user);
        user.CheckUserByUID(udata.UD, (info) => {
            if (info.Status == "err") {
                req.flash("error", "Pls LogIn Again");
                return res.status(200).redirect("/User/LogIn");
            } else {
                return res.status(200).render("../views/WebSite/User/Edit.ejs", { title: "Update User - Appa", data: info.data, Og: OgData });
            }
        });
    });

    //get Route to Edit Profile
    router.post(["/userupdate", "/userprofile", "/profile", "/Edit"], usermiddleware.checkcookie, usermiddleware.authenticateToken, (req, res) => {
        let udata = jwt.getUID(res.locals.user);
        user.CheckUserByUID(udata.UD, (info) => {
            if (info.Status == "err") {
                req.flash("error", "Pls LogIn Again");
                return res.status(200).redirect("/User/LogIn");
            } else {
                let udata = req.body;
                udata.UID = info.data.UID;
                // console.log(udata);
                user.UpdateUser(req.body, (updateData) => {
                    if (updateData.Status == "err") {
                        return res.status(200).render("../views/WebSite/User/Edit.ejs", { title: "Update User - Appa", data: info.data });
                    } else {
                        return res.status(200).redirect("/USer/View");
                    }
                });
            }
        });
    });
}

//forgot passwword route
{
    // get Route to forget password
    router.get(["/forgetpassword"], usermiddleware.checkuserexicte, (req, res) => {
        OgData.title = "Forget Password";
        OgData.description = "Enter your Email if you Forget your Password";
        OgData.image = "/Images/ganesha-left.jpeg";
        return res.status(200).render("../views/WebSite/User/forgetPssword.ejs", { title: "Forget Password - Appa", Og: OgData });
    });

    // post Route to get data for forget password and email it
    router.post(["/forgetpassword"], usermiddleware.checkuserexicte, (req, res) => {
        // console.log(req.body);
        user.forgetPassword(req.body, (info) => {
            //   console.log(info);
            if (info.Status == "err") {
                req.flash("error", info.Msg);
                return res.status(200).redirect("/User/Signup");
            } else {
                req.flash("success", "Password send to Registred email");
                return res.status(200).redirect("/User/LogIn");
            }
        });

    });
}

// Change Password
{

    router.get(["/changepassword", "/ChangePassword"], usermiddleware.checkcookie, usermiddleware.authenticateToken, (req, res) => {
        OgData.title = "Change Password";
        OgData.description = "Change Password Page";
        OgData.image = "/Images/ganesha-left.jpeg";
        return res.status(200).render("../views/WebSite/User/changepassword", { title: "Change Password", Og: OgData });
        OgData.description = "Enter new password if you want to change your Password";
        OgData.image = "/Images/ganesha-left.jpeg";
        res.status(200).render("../views/WebSite/User/changepassword", { title: "Change Password", Og: OgData });
    });

    router.post(["/changepassword", "/ChangePassword"], usermiddleware.checkcookie, usermiddleware.authenticateToken, (req, res) => {
        let udata = jwt.getUID(res.locals.user);
        user.CheckUserByUID(udata.UD, (info) => {
            if (info.Status == "err") {
                req.flash("error", "Pls LogIn Again");
                return res.status(200).redirect("/User/LogIn");
            } else {
                let udata = req.body;
                udata.UID = info.data.UID;
                //  console.log(udata);
                user.changePassword(udata, (updateData) => {
                    if (updateData.Status == "err") {
                        return res.status(200).render("../views/WebSite/User/Edit.ejs", { title: "Update User - Appa", data: info.data });
                    } else {
                        return res.status(200).redirect("/USer/View");
                    }
                });
            }
        });
    });
}

// Route to log out
router.get(["/Logout", "/SignOut"], (req, res) => {
    res.cookie('connect.sid', '', { expires: new Date(0), httpOnly: true });
    res.clearCookie('connect.sid', { path: '/' });
    res.cookie("token", null, { expires: new Date(0), httpOnly: true });
    res.clearCookie("token");
    res.cookie("UserName", null, { expires: new Date(0), httpOnly: true });
    res.clearCookie("UserName");
    req.session.tim = null;
    res.locals.is_User = false;
    req.flash("success", "Log Out Done");
    OgData.title = "Log Out- Appa";
    OgData.description = "signing out from our appa website";
    OgData.image = "/Images/ganesha-left.jpeg";
    return res.status(200).redirect("/User/LogIn");
});

module.exports = router;
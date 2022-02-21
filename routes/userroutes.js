// All require modules
var express = require("express");
const res = require("express/lib/response");
var router = express.Router();
var User = require("../controllers/UserController");
var user = new User();

checkuserexist = function(req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        next();
    } else {
        req.flash("error", "User Already login.");
        res.status(200).render("../views/mainpages/index.ejs", { title: "Home - Appa" });
    }
}

checkusernotexist = function(req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        req.flash("Error", "Please login");
        res.status(200).render("../views/User/index.ejs"), { title: "Login - Appa" };
    } else {
        next();
    }
}

//log In Routes
{
    // Get Route 
    router.get(["/", "/index", "/Signin", "/Login"], (req, res) => {
        res.status(200).render("../views/User/index.ejs", { title: "LogIn - Appa" });
    });

    // Post Route 
    router.post(["/Signin", "/Login"], (req, res) => {
        user.CheckUser(req.body, (data) => {
            console.log(data);
            if (data.Status == "err") {
                req.flash("error", data.Msg);
                return res.status(200).redirect("/User/Login");
            } else {
                req.flash("success", data.Msg);
                return res.status(200).redirect("/User/View");
            }
        });
    });
}


//Registrations Route
{
    // get Route 
    router.get(["/Signup", "/Register"], (req, res) => {
        res.status(200).render("../views/User/Register.ejs", { title: "Register  - Appa" });
    });

    // post Route 
    router.post(["/Signup", "/Register"], (req, res) => {
        // console.log(req.body);
        user.SaveUser(req.body, (info) => {
            console.log(info);
            if (info.Status == "err") {
                req.flash("error", info.Msg);
                res.status(200).redirect("/User/Signup");
            } else {
                req.flash("success", "User Registration Done Try to Login");
                res.status(200).redirect("/User/LogIn");
            }
        });
    });
}


//User Profile Route
{
    // get Route to profile
    router.get("/profile", (req, res) => {
        res.status(200).render("../views/User/userprofile.ejs", { title: "Profile - Appa" });
    });

    // get Route to View User
    router.get(["/view"], (req, res) => {
        res.status(200).render("../views/User/ViewUser.ejs", { title: "Profile - Appa" });
    });

    //get Route to user profile edit page
    router.get(["/userupdate", "/userprofile"], (req, res) => {
        res.status(200).render("../views/User/userprofile.ejs", { title: "Update User - Appa" });
    });

}


// Route to log out
router.get(["/Logout", "/SignOut"], (req, res) => {
    res.status(200).render("../views/User/LogOut.ejs", { title: "Bye  - Appa" });
});

//forgot passwword route
{
    // get Route to forget password
    router.get(["/forgetpassword"], (req, res) => {
        res.status(200).render("../views/User/forgetPssword.ejs", { title: "Forget Password - Appa" });
    });

    // post Route to get data for forget password and email it
    router.post(["/forgetpassword"], (req, res) => {
        // console.log(req.body);
        user.ForgetPassword(req.body, (info) => {
            //   console.log(info);
            if (info.Status == "err") {
                req.flash("error", info.Msg);
                res.status(200).redirect("/User/Signup");
            } else {
                req.flash("success", "Password send to Registred email");
                res.status(200).redirect("/User/LogIn");
            }
        });

    });
}

module.exports = router;
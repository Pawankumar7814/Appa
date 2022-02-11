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

// Route to index page
router.get(["/", "/index", "/Signin", "/Login"], (req, res) => {
    res.status(200).render("../views/User/index.ejs", { title: "LogIn - Appa" });
});

// Route to index page
router.post(["/", "/index", "/Signin", "/Login"], (req, res) => {
    user.CheckUser(req.body, (data) => {
        console.log(data);
        if (data.Status == "err") {
            res.status(200).render("../views/User/Register.ejs", { title: "Register  - Appa" });
        } else {
            res.status(200).render("../views/User/index.ejs", { title: "LogIn - Appa" });
        }
    });
});

// Route to index page
router.get(["/Signup", "/Register"], (req, res) => {
    res.status(200).render("../views/User/Register.ejs", { title: "Register  - Appa" });
});

// Route to index page
router.post(["/Signup", "/Register"], (req, res) => {
    // console.log(req.body);
    user.SaveUser(req.body, (info) => {
        console.log(info);
        if (info.Status == "err") {
            res.status(200).render("../views/User/Register.ejs", { title: "Register  - Appa" });
        } else {
            res.status(200).render("../views/User/index.ejs", { title: "LogIn - Appa" });
        }
    });
});

// Route to index page
router.get(["/Logout", "/SignOut"], (req, res) => {
    res.status(200).render("../views/User/LogOut.ejs", { title: "Bye  - Appa" });
});

module.exports = router;
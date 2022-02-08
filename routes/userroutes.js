// All require modules
var express = require("express");
var router = express.Router();
var User = require("../controllers/UserController");
var user = new User();

// Route to index page
router.get(["/", "/index", "/Signin", "/Login"], (req, res) => {
    res.status(200).render("../views/User/index.ejs", { title: "LogIn - Appa" });
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
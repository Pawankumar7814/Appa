// All require modules
var express = require("express");
var router = express.Router();

// Route to index page
router.get(["/", "/index", "/Signin", "/Login"], (req, res) => {
    res.status(200).render("../views/User/index.ejs", { title: "LogIn - Appa" });
});

// Route to index page
router.get(["/Signup", "/Register"], (req, res) => {
    res.status(200).render("../views/User/Register.ejs", { title: "Register  - Appa" });
});

// Route to index page
router.get(["/Logout", "/SignOut"], (req, res) => {
    res.status(200).render("../views/User/LogOut.ejs", { title: "Register  - Appa" });
});

module.exports = router;
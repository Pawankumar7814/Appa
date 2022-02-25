// All require modules
var express = require("express");
var router = express.Router();

// Route to index page
router.get(["/", "/index", "/Signin", "/Login"], (req, res) => {
    res.status(200).render("../views/Admin/mainpages/index.ejs", { title: "Home - Appa" });
});


// Route to log out
router.get(["/Logout", "/SignOut"], (req, res) => {
    return res.status(200).redirect("/Admin/LogIn");
});

module.exports = router;
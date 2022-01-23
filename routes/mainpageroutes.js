// All require modules
var express = require("express");
var router = express.Router();

// Route to index page
router.get(["/", "/index"], (req, res) => {
    res.status(200).render("../views/mainpages/index.ejs");
});

// Route to index page
router.get(["/contactus", "/contact"], (req, res) => {
    res.status(200).render("../views/mainpages/contactus.ejs");
});

router.get("*", (req, res) => {
    res.status(404).render("../views/mainpages/error404.ejs");
});

module.exports = router;
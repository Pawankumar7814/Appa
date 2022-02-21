// All require modules
var express = require("express");
var router = express.Router();

// Route to index page
router.get(["/", "/index"], (req, res) => {
    res.status(200).render("../views/mainpages/index.ejs", { title: "Home - Appa" });
});
// Route to index page
router.get(["/indexsh"], (req, res) => {
    res.status(200).render("../views/mainpages/indexsh.ejs", { title: "Home - Appa" });
});

router.get(["/index1"], (req, res) => {
    res.status(200).render("../views/mainpages/index1.ejs", { title: "Home - Appa" });
});

// Route to index page
router.get(["/contactus", "/contact"], (req, res) => {
    res.status(200).render("../views/mainpages/contactus.ejs", { title: "Contact us - Appa" });
});

// Route to about page
router.get(["/aboutus", "/about"], (req, res) => {
    res.status(200).render("../views/mainpages/aboutus.ejs", { title: "About us - Appa" });
});

// Route to about page
router.get(["/aboutus1", "/about1"], (req, res) => {
    res.status(200).render("../views/mainpages/aboutus1.ejs", { title: "About us - Appa" });
});

router.get("/*", (req, res) => {
    res.status(404).render("../views/mainpages/error404.ejs", { title: "Error 404 " });
});

module.exports = router;
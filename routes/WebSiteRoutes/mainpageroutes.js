// All require modules
var express = require("express");
var router = express.Router();
var OgData = require("../../config/Og.json");

// Route to index page
router.get(["/", "/index"], (req, res) => {
    console.log(OgData);
    res.status(200).render("../views/WebSite/mainpages/index.ejs", { title: "Home - Appa", Og: OgData });
});

router.get(["/indexsh"], (req, res) => {
    res.status(200).render("../views/WebSite/mainpages/indexsh.ejs", { title: "Home - Appa" });
});

router.get(["/index1"], (req, res) => {
    res.status(200).render("../views/WebSite/mainpages/index1.ejs", { title: "Home - Appa" });
});

router.get(["/index2"], (req, res) => {
    res.status(200).render("../views/WebSite/mainpages/index2.ejs", { title: "Home - Appa" });
});

router.get(["/index3"], (req, res) => {
    res.status(200).render("../views/WebSite/mainpages/index3.ejs", { title: "Home - Appa" });
});

// Route to contact page
router.get(["/contactus", "/contact"], (req, res) => {
    res.status(200).render("../views/WebSite/mainpages/contactus.ejs", { title: "Contact us - Appa", Og: OgData });
});

// Route to about page
router.get(["/aboutus", "/about"], (req, res) => {
    res.status(200).render("../views/WebSite/mainpages/aboutus.ejs", { title: "About us - Appa", Og: OgData });
});

router.get(["/aboutus1", "/about1"], (req, res) => {
    res.status(200).render("../views/WebSite/mainpages/aboutus1.ejs", { title: "About us - Appa" });
});

module.exports = router;
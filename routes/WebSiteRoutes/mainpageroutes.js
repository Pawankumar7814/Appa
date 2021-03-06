// All require modules
var express = require("express");
var router = express.Router();
var Product = require("../../controllers/Admin/ProductController");
var product = new Product();
var OgData = require("../../config/Og.json");

// Route to index page
router.get(["/", "/index"], (req, res) => {
    OgData.title = "Home Page.";
    OgData.description = "Home Page All new products are shown on this page.";
    OgData.image = "/Images/ganesha-left.jpeg";
    product.getAllProducts((CbData) => {
        if (CbData.status == "err") {
            return res.status(404).redirect("/error404");
        } else {
            res.status(200).render("../views/WebSite/mainpages/index.ejs", { title: "Home - Appa", data: CbData.data, Og: OgData });
        }
    });
});

router.get(["/indexsh"], (req, res) => {
    OgData.title = "Home Page.";
    OgData.description = "Home Page All new products are shown on this page.";
    OgData.image = "/Images/ganesha-left.jpeg";
    res.status(200).render("../views/WebSite/mainpages/indexsh.ejs", { title: "Home - Appa", Og: OgData });
});

router.get(["/index1"], (req, res) => {
    OgData.title = "Home Page.";
    OgData.description = "Home Page All new products are shown on this page.";
    OgData.image = "/Images/ganesha-left.jpeg";
    res.status(200).render("../views/WebSite/mainpages/index1.ejs", { title: "Home - Appa", Og: OgData });
});

router.get(["/index2"], (req, res) => {
    OgData.title = "Home Page.";
    OgData.description = "Home Page All new products are shown on this page.";
    OgData.image = "/Images/ganesha-left.jpeg";
    res.status(200).render("../views/WebSite/mainpages/index2.ejs", { title: "Home - Appa", Og: OgData });
});

router.get(["/index3"], (req, res) => {
    OgData.title = "Home Page.";
    OgData.description = "Home Page All new products are shown on this page.";
    OgData.image = "/Images/ganesha-left.jpeg";
    res.status(200).render("../views/WebSite/mainpages/index3.ejs", { title: "Home - Appa", Og: OgData });
});

router.get(["/index4"], (req, res) => {
    OgData.title = "Home Page.";
    OgData.description = "Home Page All new products are shown on this page.";
    OgData.image = "/Images/ganesha-left.jpeg";
    res.status(200).render("../views/WebSite/mainpages/index4.ejs", { title: "Home - Appa", Og: OgData });
});

// Route to contact page
router.get(["/contactus", "/contact"], (req, res) => {
    OgData.title = "Contact Page.";
    OgData.description = "A user can ask any query or give suggestions through this page.";
    OgData.image = "/Images/ganesha-left.jpeg";
    res.status(200).render("../views/WebSite/mainpages/contactus.ejs", { title: "Contact us - Appa", Og: OgData });
});

// Route to about page
router.get(["/aboutus", "/about"], (req, res) => {
    OgData.title = "About Us - Appa";
    OgData.description = "These braided cotton threads that are used to hold flames for lamps have been widely produced in the temple town of Pattanam, Madurai, for years. The concept of Appa revolves around bringing these hand-crafted wicks made by traditional wick-makers of Madurai to the rest of the world. What makes Appa wicks different from their competitors is its precise braiding techniques that sustain the wick longer and burn durably with no soot."
    OgData.image = "/Images/diya.jpeg";
    res.status(200).render("../views/WebSite/mainpages/aboutus.ejs", { title: "About us - Appa", Og: OgData });
});

// Route to Refund
router.get(["/Return-Refunds-Cancellation"], (req, res) => {
    OgData.title = "Return Refunds & Cancellation - Appa";
    OgData.description = "These braided cotton threads that are used to hold flames for lamps have been widely produced in the temple town of Pattanam, Madurai, for years. The concept of Appa revolves around bringing these hand-crafted wicks made by traditional wick-makers of Madurai to the rest of the world. What makes Appa wicks different from their competitors is its precise braiding techniques that sustain the wick longer and burn durably with no soot."
    OgData.image = "/Images/diya.jpeg";
    res.status(200).render("../views/WebSite/mainpages/Return.ejs", { title: "Return Refunds & Cancellation - Appa", Og: OgData });
});

// Route to Term and conditions
router.get(["/customer-terms-and-conditions"], (req, res) => {
    OgData.title = "Customer???s Terms & Conditions - Appa";
    OgData.description = "These braided cotton threads that are used to hold flames for lamps have been widely produced in the temple town of Pattanam, Madurai, for years. The concept of Appa revolves around bringing these hand-crafted wicks made by traditional wick-makers of Madurai to the rest of the world. What makes Appa wicks different from their competitors is its precise braiding techniques that sustain the wick longer and burn durably with no soot."
    OgData.image = "/Images/diya.jpeg";
    res.status(200).render("../views/WebSite/mainpages/Term_condition.ejs", { title: "Customer???s Terms & Conditions - Appa", Og: OgData });
});

router.get(["/aboutus1", "/about1"], (req, res) => {
    OgData.title = "About us - Appa";
    OgData.description = "In this page we have our introduction";
    res.status(200).render("../views/WebSite/mainpages/aboutus1.ejs", { title: "About us - Appa", Og: OgData });
});

module.exports = router;
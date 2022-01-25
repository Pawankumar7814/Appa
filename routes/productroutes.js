// All require modules
var express = require("express");
var router = express.Router();

// Route to index page
router.get(["/products/", "/products/index"], (req, res) => {
    res.status(200).render("../views/products/index.ejs", { title: "Products - Appa" });
});

// Route to index page
router.get(["/product/abc", "/product"], (req, res) => {
    res.status(200).render("../views/products/product.ejs", { title: "Wick 1  - Appa" });
});

module.exports = router;
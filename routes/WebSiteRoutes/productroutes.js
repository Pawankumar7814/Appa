// All require modules
var express = require("express");
var router = express.Router();
var Product = require("../../controllers/Admin/ProductController");
var product = new Product();

// Route to index page
router.get(["/products/", "/products/index"], (req, res) => {
    product.getAllProducts((CbData) => {
        if (CbData.status == "err") {
            return res.status(404).redirect("/error404");
        } else {
            res.status(200).render("../views/WebSite/products/index.ejs", { title: "Products - Appa", data: CbData.data });
        }
    });
});


// Route for one product
router.get(["/product/:id"], (req, res) => {
    console.log(req.params.id);
    product.getProductById(req.params.id, (CbData) => {
        if (CbData.status == "err") {
            console.log(err);
            return res.status(404).redirect("/error404");
        } else {
            res.status(200).render("../views/WebSite/products/product.ejs", { title: "Wick 1 - Appa", data: CbData.data });
        }
    });
});


module.exports = router;
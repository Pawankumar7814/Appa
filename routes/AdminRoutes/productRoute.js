// All require modules
var express = require("express");
var router = express.Router();
var Product = require("../../controllers/Admin/ProductController");
var product = new Product();

//Route for product page show and add
{

    router.get("/Add", (req, res) => {
        res.status(200).render("../views/Admin/products/Add.ejs", { title: "Add New Product - Appa" });
    });

    router.post("/Add", (req, res) => {
        console.log(req.body);

        product.saveProduct(req.body, (CbData) => {
            console.log(CbData);
        });
    });

}

module.exports = router;
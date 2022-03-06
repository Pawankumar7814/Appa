// All require modules
var express = require("express");
var router = express.Router();
var Product = require("../../module/Product");

//Route for product page show and add
{
    router.get("/Addproduct", (req, res) => {
        res.status(200).render("../views/Admin/products/Add.ejs", { title: "Add New Product - Appa" });
    });

    router.post("/Add", (req, res) => {
        console.log(req.body);
        let productdata = {
            Productname: req.body.pname,
            Productdescription: req.body.pdescription,
            Productprice: req.body.pprice,
            Productquantity: req.body.pquantity,
            Productcolor: req.body.pcolor
        };

        var Addnewproduct = Product(productdata);
        Addnewproduct.save((err, savedata) => {
            if (err) {
                req.flash("Error", "Some error while saving.");
                res.status("200").redirect("/Admin/Add");
            } else {
                req.flash("Success", "Product details saved successfully.");
                console.log(Addnewproduct);
                res.status("200").redirect("/Admin/Add");
            }
        });
    });
}

module.exports = router;
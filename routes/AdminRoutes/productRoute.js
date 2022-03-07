// All require modules
var express = require("express");
var router = express.Router();
var Product = require("../../module/Product");
const multer = require("multer");
var uid = require("uuid");
var newFileName;

// Uploading a file using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var spath = "public/uploads/";
        cb(null, spath);
    },
    filename: (req, file, cb) => {
        file.originalname = uid.v4() + ".jpeg"
        newFileName = file.originalname;
        cb(null, file.originalname);
    }
});

//midleware to save file
const upload = multer({ storage });

//Route for product page show and add
{
    router.get("/Addproduct", (req, res) => {
        res.status(200).render("../views/Admin/products/Add.ejs", { title: "Add New Product - Appa" });
    });

    router.post("/Add", upload.array('pimg'), (req, res) => {
        console.log(req.body);
        let productdata = {
            Productname: req.body.pname,
            Productdescription: req.body.pdescription,
            Productprice: req.body.pprice,
            Productquantity: req.body.pquantity,
            Productcolor: req.body.pcolor,
            ProductImage: newFileName
        };

        var Addnewproduct = Product(productdata);
        newFileName = "";
        Addnewproduct.save((err, savedata) => {
            if (err) {
                req.flash("Error", "Some error while saving.");
                res.status("200").redirect("/Admin/Product/Addproduct");
            } else {
                req.flash("Success", "Product details saved successfully.");
                console.log(Addnewproduct);
                res.status("200").redirect("/Admin/Product/Addproduct");
            }
        });
    });
}

module.exports = router;
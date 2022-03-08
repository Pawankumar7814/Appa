// All require modules
var express = require("express");
var router = express.Router();
var Product = require("../../controllers/Admin/ProductController");
var product = new Product();
const multer = require('multer');
const uuid = require('uuid');
var imagesPath = [];

//Multer to upload file start

//toupload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var soratepath = 'Public/uploads/';
        cb(null, soratepath);
    },
    filename: (req, file, cb) => {
        // let extArray = file.mimetype.split("/");
        // let extension = extArray[extArray.length - 1];
        file.originalname = uuid.v4() + "_" + file.originalname;
        //  file.originalname = uuid.v4() + "." + extension;
        console.log(file);
        const { originalname } = file;
        // uuid, or fieldname
        imagesPath.push(originalname);
        // console.log(imagesPath);
        cb(null, originalname);
    }
});

//midlewear to save file
const upload = multer({ storage });

//Multer to upload file End

//Route for product page show and add
{

    router.get("/Add", (req, res) => {
        res.status(200).render("../views/Admin/products/Add.ejs", { title: "Add New Product - Appa" });
    });

    router.post("/Add", (req, res) => {
        console.log("imagesPath");
        product.saveProduct(req.body, imagesPath, (CbData) => {
            console.log(CbData);
        });
    });

}

module.exports = router;
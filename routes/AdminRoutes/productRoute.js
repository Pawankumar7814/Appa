// All require modules
var express = require("express");
var router = express.Router();
var Product = require("../../controllers/Admin/ProductController");
var product = new Product();
const multer = require('multer');
const uuid = require('uuid');
var imagesPath = [];
var OgData = require('../../config/Og.json');

//Multer to upload file start

//toupload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var soratepath = 'Public/uploads/';
        cb(null, soratepath);
    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        //   file.originalname = uuid.v4() + "_" + file.originalname;
        file.originalname = uuid.v4() + "." + extension;

        const { originalname } = file;
        imagesPath.push(originalname);
        cb(null, originalname);
    }
});

//midlewear to save file
const upload = multer({ storage });

//Multer to upload file End

//Route for product page show and add
{

    router.get("/Add", (req, res) => {
        return res.status(200).render("../views/Admin/products/Add.ejs", { title: "Add New Product - Appa" });
    });

    router.post("/Add", upload.array("pimg"), (req, res) => {
        product.saveProduct(req.body, imagesPath, (CbData) => {
            if (CbData.Status == "err") {
                return res.status(200).redirect("/Admin/Product/Add");
            } else {
                return res.status(200).redirect("/Admin/Product/AllProducts");
            }
        });
    });

    router.get(["/AllProducts", "/ShowAllProduct"], (req, res) => {
        product.getAllProducts((CbData) => {
            if (CbData.Status == "err") {
                return res.status(404).redirect("/error404");
            } else {
                return res.status(200).render("../views/Admin/products/Allproductpage.ejs", { title: "All Products - Appa", data: CbData.data });
            }
        });
    });

    router.get("/Edit/:id", (req, res) => {
        product.getProductById(req.params.id, (CbData) => {
            if (CbData.Status == "err") {} else {
                return res.status(200).render("../views/Admin/products/editproduct.ejs", { title: "Edit Product - Appa", data: CbData.data });
            }
        });
    });

    router.post("/Edit/:id", (req, res) => {
        product.updateProductById(req.params.id, req.body, (CbData) => {
            return res.status(200).redirect("../Edit/" + req.params.id);
        });
    });

    router.get("/EditImages/:id", (req, res) => {
        product.getProductById(req.params.id, (CbData) => {
            if (CbData.Status == "err") {} else {
                return res.status(200).render("../views/Admin/products/editImages.ejs", { title: "Edit Product - Appa", data: CbData.data });
            }
        });
    });

    router.post("/EditImages/:id", upload.array("pimg"), (req, res) => {
        product.addProductImageById(req.params.id, imagesPath, (CbData) => {
            if (CbData.Status == "err") {} else {
                return res.status(200).redirect("/Admin/Product/EditImages/" + req.params.id);
            }
        });
    });


    router.get("/EditImage/:id/:file", (req, res) => {
        product.deleteProductImageById(req.params.id, req.params.file, (CbData) => {
            if (CbData.Status == "err") {} else {
                var pp = "../EditImages/" + req.params.id;
                return res.status(200).redirect("/Admin/Product/EditImages/" + req.params.id);
            }
        });
    });

    router.get("/Delelte/:id", (req, res) => {
        product.deleteProductById(req.params.id, (CbData) => {
            if (CbData.Status == "err") {
                console.log("???? ~ file: productRoute.js ~ line 110 ~ product.deleteProductById ~ CbData", CbData)
            } else {
                return res.status(200).redirect("../AllProducts")
            }
        });
    });


}

module.exports = router;
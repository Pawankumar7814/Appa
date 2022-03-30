// All require modules
var express = require("express");
var router = express.Router();
var Cart = require("../../controllers/WebSite/CartController");
var cart = new Cart();
var OgData = require("../../config/Og.json");
var jwt = require('jsonwebtoken');

var JWT = require('../../controllers/Website/jwt');
var usermiddleware = require("../../middleware/userverification")(new JWT());


router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Route to cart
router.get(["/index", "/"], usermiddleware.checkcookie, (req, res) => {
    OgData.title = "Add To Cart - Appa";
    OgData.description = "In this page you can add whatever product you like to buy them in future";
    var output;
    try {
        output = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
    } catch (E) {
        req.flash("error", "Due to Network Isssue you get logout");
        return res.status(200).redirect("/User/LogOut");
    }
    console.log("🚀 ~ file: Cart.js ~ line 35 ~ router.get ~ output", output)
    cart.findAllProductsInCart(output, (CbData) => {
        console.log("🚀 ~ file: Cart.js ~ line 29 ~ cart.findAllProductsInCart ~ CbData", CbData)
        if (CbData.Status == "err" || CbData.data == null) {
            return res.status(200).render("../views/WebSite/cart/index.ejs", { title: "cart - Appa", Og: OgData, data: null });
        } else {
            var obdata = (CbData.data);
            return res.status(200).render("../views/WebSite/cart/index.ejs", { title: "cart - Appa", Og: OgData, data: obdata });
        }
    });
});


router.post(["/Add/:id"], usermiddleware.authenticateToken, (req, res) => {

    var output = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
    cart.addProductsInCart(output, req.params.id, req.body, (CbData) => {});
    return res.status(200).redirect("/Cart");
});

module.exports = router;
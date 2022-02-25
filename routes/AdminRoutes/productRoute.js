// All require modules
var express = require("express");
var router = express.Router();

//Route for product page show and add
{

    router.get("/Add", (req, res) => {
        res.status(200).render("../views/Admin/products/Add.ejs", { title: "Add - Appa" });
    });

}



module.exports = router;
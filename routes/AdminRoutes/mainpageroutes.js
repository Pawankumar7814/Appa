// All require modules
var express = require("express");
var router = express.Router();
var Admin = require("../../controllers/Admin/AdminController");
var admin = new Admin();
var User = require("../../controllers/WebSite/UserController");
var user = new User();
var Sender = require("../../controllers/WebSite/emailDataController");
var sender = new Sender();
var JWT = require('../../controllers/Website/jwt');
var jwt = new JWT();
var adminMiddleware = require("../../middleware/userverification")(jwt);

//Admin LogIn Routes
{

    // Route to index page
    router.get(["/", "/index", "/Signin", "/Login"], (req, res) => {
        return res.status(200).render("../views/Admin/mainpages/index.ejs", { title: "Home - Appa" });
    });

    // Route to index page
    router.post(["/Login"], (req, res) => {
        console.log(req.body);
        admin.CheckAdmin(req.body, (CbData) => {
            if (CbData.Status == "err") {
                req.flash("error", CbData.Msg);
                return res.status(200).redirect("/Admin/");
            } else {
                var atoken = jwt.generateAccessToken({ UD: CbData.data.UID });
                res.cookie("atoken", atoken, { maxAge: 60 * 1000 * 60, httpOnly: true });
                res.cookie("AdminName", CbData.data.UFname, { maxAge: 60 * 1000 * 60, httpOnly: true });
                return res.status(200).redirect("/Admin/");
            }
        });
    });

}


// Route All Admin
router.get(["/ShowAllAdmin"], (req, res) => {
    admin.GetAllAdmin((CbData) => {
        if (CbData.Status == "err") {
            req.flash("error", CbData.Msg);
            return res.status(200).redirect("/Admin/");
        } else {
            return res.status(200).render("../views/Admin/mainpages/ShowAllAdmin.ejs", { title: "All Admin - Appa", data: CbData.data });
        }
    });
});

// Route to All User
router.get(["/ShowAllUser"], (req, res) => {
    user.GetAllUser((CbData) => {
        if (CbData.Status == "err") {
            req.flash("error", CbData.Msg);
            return res.status(200).redirect("/Admin/");
        } else {
            return res.status(200).render("../views/Admin/mainpages/ShowAllUser.ejs", { title: "All User - Appa", data: CbData.data });
        }
    });
});

// Route to All Constatc us Msg
router.get(["/ShowAllMsg"], (req, res) => {
    sender.GetAllMsg((CbData) => {
        if (CbData.Status == "err") {
            req.flash("error", CbData.Msg);
            return res.status(200).redirect("/Admin/");
        } else {
            //   console.log(CbData.data);
            return res.status(200).render("../views/Admin/mainpages/ShowAllMsg.ejs", { title: "All User - Appa", data: CbData.data });
        }
    });
});

//route for Admin page show and save
{

    router.get(["/Add"], (req, res) => {
        return res.status(200).render("../views/Admin/mainpages/Add.ejs", { title: "Add - Appa" });
    });

    router.post(["/Add"], (req, res) => {
        console.log(req.body);
        admin.SaveAdmin(req.body, (CbData) => {
            if (CbData.Status == "err") {
                req.flash("error", CbData.Msg);
                return res.status(200).redirect("/Admin");
            } else {
                req.flash("success", "Admin Registration Done Try to Login");
                return res.status(200).redirect("/Admin");
            }
        });
    });

}

// Route to log out
router.get(["/Logout", "/SignOut"], (req, res) => {
    res.cookie("atoken", null, { expires: new Date(0), httpOnly: true });
    res.clearCookie("atoken");
    res.cookie("AdminName", null, { expires: new Date(0), httpOnly: true });
    res.clearCookie("AdminName");
    req.session.tim = null;
    res.locals.is_Admin = false;
    req.flash("success", "Log Out Done");
    return res.status(200).redirect("/Admin/LogIn");
});

module.exports = router;
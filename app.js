// All require modules
var express = require("express");
var ejs = require("ejs");
var flash = require("connect-flash");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var favicon = require("./config/favicon");
var https = require("https");
var OgData = require("../../config/Og.json");
var httpsOptions = require("./config/https.js");

// Creating appp
var app = express();

// Set view engine
app.set("view engine", "ejs");

// assign port number
var port = 3100 | process.env.port;

//token for jwt
process.env.TOKEN_SECRET = require("crypto").randomBytes(64).toString('hex');

//seting favicon by passing app
favicon(app);

//conected to flash message

app.use(flash());
app.use(cookieParser("this is cokkie for appa"));
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'Masha',
    resave: false,
    saveUninitialized: false
}));

//for http data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//some session variables i have created for work
app.use(function(req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    var token = req.cookies.token;
    var UserName = req.cookies.UserName;
    var atoken = req.cookies.atoken;
    var AdminName = req.cookies.AdminName;
    if (token == null) {
        res.locals.is_User = false;
        res.locals.user = "";
        res.locals.UserName = "";
    } else {
        res.locals.user = token;
        res.locals.UserName = UserName;
        res.locals.is_User = true;
    }
    if (atoken == null) {
        res.locals.is_Admin = false;
        res.locals.admin = "";
        res.locals.AdminName = "";
    } else {
        res.locals.admin = atoken;
        res.locals.AdminName = AdminName;
        res.locals.is_Admin = true;
    }
    next();
});

// Route to Public 
app.use("/Images", express.static(__dirname + "/Public/Images"));
app.use("/CSS", express.static(__dirname + "/Public/CSS/style.css"));
app.use("/JS", express.static(__dirname + "/Public/JS/"));
app.use("/uploadproductimage", express.static(__dirname + "/Public/uploads"));

// Website Routes
app.use("/user", require("./routes/WebSiteRoutes/userroutes"));
app.use("/", require("./routes/WebSiteRoutes/productroutes"));
app.use("/", require("./routes/WebSiteRoutes/emailroutes"));
app.use("/", require("./routes/WebSiteRoutes/mainpageroutes"));

// Admin Routes
app.use("/Admin/Product", require("./routes/AdminRoutes/productRoute"));
app.use("/Admin", require("./routes/AdminRoutes/mainpageroutes"));


app.get("/*", (req, res) => {
    OgData.title = "Error 404";
    OgData.description = "Page not Found";
    OgData.image = "/Images/404error.jpg";
    console.log(OgData);
    res.status(404).render("../views/WebSite/mainpages/error404.ejs", { title: "Error 404 ", Og: OgData });
});

// Creating server
https.createServer(httpsOptions, app).listen(port, () => {
    console.log("port number = " + port);
});
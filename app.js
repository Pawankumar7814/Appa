{
    "name": "appa",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "Pawan Kumar",
    "license": "ISC",
    "dependencies": {
        "connect-flash": "^0.1.1",
        "cookie-parser": "^1.4.6",
        "ejs": "^3.1.6",
        "express": "^4.17.2",
        "express-session": "^1.17.2",
        "flash": "^1.1.0",
        "fs": "0.0.1-security",
        "https": "^1.0.0",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^6.1.7",
        "multer": "^1.4.4",
        "nodemailer": "^6.7.2",
        "serve-favicon": "^2.5.0",
        "uuid": "^8.3.2"
    }
}
pp.use(flash());
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


// Website Routes
app.use("/user", require("./routes/WebSiteRoutes/userroutes"));
app.use("/", require("./routes/WebSiteRoutes/productroutes"));
app.use("/", require("./routes/WebSiteRoutes/emailroutes"));
app.use("/", require("./routes/WebSiteRoutes/mainpageroutes"));

// Admin Routes
app.use("/Admin/Product", require("./routes/AdminRoutes/productRoute"));
app.use("/Admin", require("./routes/AdminRoutes/mainpageroutes"));


app.get("/*", (req, res) => {
    res.status(404).render("../views/WebSite/mainpages/error404.ejs", { title: "Error 404 " });
});

// Creating server
https.createServer(httpsOptions, app).listen(port, () => {
    console.log("port number = " + port);
});
// All require modules
var express = require("express");
var http = require("http");
var ejs = require("ejs");
var flash = require("connect-flash");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var favicon = require("./config/favicon");


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
    if (token == null) {
        res.locals.is_User = false;
        res.locals.user = "";
        res.locals.UserName = "";
    } else {
        res.locals.user = token;
        res.locals.UserName = req.flash("UserName");;
        res.locals.is_User = true;
    }
    console.log(token);
    console.log(process.env.TOKEN_SECRET);
    next();
});

// Route to Public 
app.use("/Images", express.static(__dirname + "/Public/Images"));
app.use("/CSS", express.static(__dirname + "/Public/CSS/style.css"));


// Routes


app.use("/user", require("./routes/userroutes"));
app.use("/", require("./routes/productroutes"));
app.use("/", require("./routes/emailroutes"));
app.use("/", require("./routes/mainpageroutes"));

// Creating server
http.createServer(app).listen(port, () => {
    console.log("port number = " + port);
});
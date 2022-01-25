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


//some session variables i have created for work
app.use(function(req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    var token = req.cookies.token;
    if (token == null) {
        res.locals.is_User = false;
    } else {
        res.locals.user = token;
        res.locals.is_User = true;
    }
    next();
});

// Route to Public 
app.use("/Images", express.static(__dirname + "/Public/Images"));
app.use("/CSS", express.static(__dirname + "/Public/CSS/style.css"));

// Routes

app.use("/", require("./routes/productroutes"));
app.use("/", require("./routes/emailroutes"));
app.use("/", require("./routes/mainpageroutes"));

// Creating server
http.createServer(app).listen(port, () => {
    console.log("port number = " + port);
});
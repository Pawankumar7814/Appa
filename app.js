// All require modules
var express = require("express");
var http = require("http");
var ejs = require("ejs");

// Creating appp
var app = express();

// Set view engine
app.set("view engine", "ejs");

// assign port number
var port = 3100 | process.env.port;

// Route to Public 
app.use("/Images", express.static(__dirname + "/Public/Images"));
app.use("/CSS", express.static(__dirname + "/Public/CSS/style1.css"));

// Route to pages
app.use("/", require("./routes/mainpageroutes.js"));

// Creating server
http.createServer(app).listen(port, () => {
    console.log("port number = " + port);
});
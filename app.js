const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

//View routes

//Root
app.get("/", async function(req, res){
    var imageURLs = await tools.getRandomImages("", 9);
    //console.log("imageURLs using Promises: " + imageURLs);
    res.render("index", {"imageURL":imageURLs});
});

//Search
app.get("/search", async function(req, res){
    var keyword = req.query.keyword;

    var imageURLs = await tools.getRandomImages(keyword, 9);
    console.log("imageURLs using Promises: " + imageURLs);
    res.render("results", {"imageURLs":imageURLs});

    //getRandomImages_cb(keyword, 9, function(imageURLs){
    //    console.log("imageURLs: " + imageURLs);
    //    res.render("results", {"imageURLs":imageURLs});
    //});
});


//Server listener
app.listen("8081", "127.0.0.1", function(){
    console.log("Express server running.");
});


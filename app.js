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
    res.render("results", {"imageURLs":imageURLs, "keyword":keyword});

    //getRandomImages_cb(keyword, 9, function(imageURLs){
    //    console.log("imageURLs: " + imageURLs);
    //    res.render("results", {"imageURLs":imageURLs});
    //});
});

app.get("/api/updateFavorites", function(req, res){

    var conn = tools.createConnection();

    var sql;
    var sqlParams;  

    if (req.query.action == "add") {
        sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?);";
        sqlParams = [req.query.imageURL, req.query.keyword];
    }
    else {
        sql = "DELETE FROM favorites WHERE imageURL = ?";
        sqlParams = [req.query.imageURL];
    }
    
    conn.connect(function(err){

        if (err) throw err;

        conn.query(sql, sqlParams, function(err, result){  //Query error check 
            if (err) throw err;
        });

    });

    res.send("it works!");

});

app.get("/displayKeywords", function(req, res){
    var conn = tools.createConnection();
    var sql = "SELECT DISTINCT keyword FROM img_gallery.favorites ORDER BY keyword;";

    conn.connect(function(err){
        conn.query(sql, function(err, result){
            if (err) throw err;
            res.render("favorites", {"rows":result});
            console.log(result);

        });
    });

});

//Server listener
app.listen("8081", "127.0.0.1", function(){
    console.log("Express server running.");
});


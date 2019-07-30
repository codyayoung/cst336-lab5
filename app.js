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
    var imageURLs = await tools.getRandomImages("", 1);
    res.render("index", {"imageURLs":imageURLs});
});

//Search
app.get("/search", async function(req, res){
    var keyword = req.query.keyword;

    var imageURLs = await tools.getRandomImages(keyword, 9);
    
    res.render("results", {"imageURLs":imageURLs, "keyword":keyword});
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

});

app.get("/displayKeywords", async function(req, res){
    var imageURLs = await tools.getRandomImages("", 1);
    var conn = tools.createConnection();
    var sql = "SELECT DISTINCT keyword FROM img_gallery.favorites ORDER BY keyword;";

    conn.connect(function(err){
        conn.query(sql, function(err, result){
            if (err) throw err;
            res.render("favorites", {"rows":result, "imageURLs":imageURLs}); 
        });
    });

});


app.get("/api/displayFavorites", function(req, res){
    var conn = tools.createConnection();
    var sql = "SELECT imageURL FROM img_gallery.favorites WHERE keyword = ?;";
    var sqlParams = [req.query.keyword];

    conn.connect( function(err){
        conn.query(sql, sqlParams, function(err, results){
            if (err) throw err;
            res.send(results); 
        });
    });

});

// Localhost server listener
app.listen("8081", "127.0.0.1", function(){
    console.log("Local Express server running.");
});

// Heroku listener
//app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("Heroku server running.")
//});


const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");

//View routes

//Root
app.get("/", function(req, res){
    var requestURL = "https://api.unsplash.com/photos/random?client_id=69c6610d92b1426c8a6a99aac12a2e723148b958d0f53d4bc743e68bd611cf74&orientation=landscape";
    request(requestURL, function(error, response, body){

        if (!error) {
            var parsedData = JSON.parse(body);
            var imageURL = parsedData.urls.regular;
            res.render("index", {"imageURL":imageURL});
        }
        else {
            res.render("index", {"error": "Unable to access Unsplash API."});
        }
    });

});

//Search
app.get("/search", function(req, res){
    //console.log(req.query.keyword);
    var keyword = req.query.keyword;
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count=9&client_id=69c6610d92b1426c8a6a99aac12a2e723148b958d0f53d4bc743e68bd611cf74&orientation=landscape";
    request(requestURL, function(error, response, body){

        if (!error) {
            var parsedData = JSON.parse(body);
            
            //Initialize array to hold random image URLs, populate array
            var imageURLs = [];
            for(let i=0; i<9; i++){
                imageURLs.push(parsedData[i].urls.regular);
            }
       
            res.render("results", {"imageURLs":imageURLs});
        }
        else {
            res.render("results", {"error": "Unable to access Unsplash API."});
        }
    });

});

//Server listener
app.listen("8081", "127.0.0.1", function(){
    console.log("Express server running.");
});


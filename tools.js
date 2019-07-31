const request = require('request');
const mysql = require('mysql');

module.exports = {

/**
 * Returns random image URLs from an API.
 * @param string keyword - Search term
 * @param int imageCount - Number of images to return 
 * @return Array of image URLs 
 */
getRandomImages_cb: function(keyword, imageCount, callback){
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=69c6610d92b1426c8a6a99aac12a2e723148b958d0f53d4bc743e68bd611cf74&orientation=landscape";
    request(requestURL, function(error, response, body){

        if (!error) {
            var parsedData = JSON.parse(body);
            
            //Initialize array to hold random image URLs, populate array
            var imageURLs = [];
            for(let i=0; i<9; i++){
                imageURLs.push(parsedData[i].urls.regular);
            }
       
        callback(imageURLs);
        }
        else {
            console.log("error", error);
        }
    });
},

/**
 * Returns random image URLs from an API.
 * @param string keyword - Search term
 * @param int imageCount - Number of images to return 
 * @return Array of image URLs 
 */
getRandomImages: function(keyword, imageCount){
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=69c6610d92b1426c8a6a99aac12a2e723148b958d0f53d4bc743e68bd611cf74&orientation=landscape";

    return new Promise( function(resolve, reject){
        request(requestURL, function(error, response, body){

            if (!error) {
                var parsedData = JSON.parse(body);
                
                //Initialize array to hold random image URLs, populate array
                var imageURLs = [];
                for(let i=0; i < imageCount; i++){
                    imageURLs.push(parsedData[i].urls.regular);
                }
                
                //Returns array of images through resolve function
                resolve(imageURLs);
            }
            else {
                console.log("error", error);
            }
        });
    }); 
},//end function

/**
 * Creates database connection
 * @return Database connection
 */
createConnection :function(){

    var conn = mysql.createConnection({
        host: "us-cdbr-iron-east-02.cleardb.net",
        user: "bf68038fb3d2e6",
        password: "14bffc2c",
        database: "heroku_1adc652eab64a59",
    });

    return conn;
}

}

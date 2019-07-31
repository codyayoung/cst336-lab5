$(document).ready(function(){

    $("#favorites").html("");

    $(document).on("click", ".favoriteIcon", function(){

    var imageURL = $(this).prev().attr("src");

    if($(this).attr("src") == "img/favorite.png") {
        $(this).attr("src", "img/favorite_on.png");
        updateFavorite("add", imageURL);       //Inserts new record (favorites image)
    } else {
        $(this).attr("src", "img/favorite.png");
        updateFavorite("delete", imageURL);       //Deletes record (unfavorites image)
    }

    });

    //Displays favorite images on keyword click 
    $(".keywordLink").on("click", function(){

        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: {
                    "keyword" : $(this).text().trim(),
                    
                  },
            success: function(rows, status) {

                $("#favorites").html("");

                rows.forEach(function(row, i){
                    if (i%4 == 0) {
                        $("#favorites").append("<br>");
                    }
                    else {
                        $("#favorites").append("<img class='imageContainer' src='"+row.imageURL+"' width='200' height='200'><img class='favoriteIcon' src='/img/favorite_on.png' width ='20'></div>");
                    } 
                });
            }

        }); //ajax
    });

    function updateFavorite(action, imageURL) {
        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {"imageURL" : imageURL,
                    "keyword" : $("#keyword").val(),
                    "action" : action
                  }

        }); //ajax
    }

});


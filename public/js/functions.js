$(document).ready(function(){

    $(".favoriteIcon").on("click", function(){

    //alert($(this).prev().attr("src"));
    var imageURL = $(this).prev().attr("src");

    if($(this).attr("src") == "img/favorite.png") {
        $(this).attr("src", "img/favorite_on.png");
        updateFavorite("add", imageURL);       //Inserts new record (favorites image)
    } else {
        $(this).attr("src", "img/favorite.png");
        updateFavorite("delete", imageURL);       //Deletes record (unfavorites image)
    }

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


/*global $*/

$(document).ready(function(){
    
    $("#search").on("keyup", function(){
        
        $.ajax({
           
           url: "/campgrounds",
           method: "GET",
           dataType: "json",
           data: {"search": $("#search").val()},
           
           success: function(result){
               
               $(".flex.row").empty();
               result.forEach(function(campground){
                   
                   $(".flex.row").append(
                       
                       "<div class='col-md-3 col-sm-6'><div class='thumbnail'><img src=" + campground.image + "><div class='caption'><h3>" + campground.name + "</h3><a class='btn btn-default' href='/campgrounds/" + campground._id + "'>Read More</a></div></div></div>"
                    );
               });
           },
           
           error: function(error){
               console.log(error);
           }
            
            
            
        });
       
       
        
    });
    
    
});
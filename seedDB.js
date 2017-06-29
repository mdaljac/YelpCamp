var Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    
    data = [
        {
            name: "Salmon Creek",
            image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
        },
        {
            name: "Granite Hill",
            image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"
        },
        {
            name: "Mountain Goat's rest",
            image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"
        },
        {
            name: "Salmon Creek",
            image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
        },
        {
            name: "Granite Hill",
            image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"
        },
        {
            name: "Mountain Goat's rest",
            image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"
        }
    ],
    
    
    initDB = function(){
        Campground.remove({}, function(err){
            if (err) console.log("error occured!");
            else{
                Comment.remove({}, function(err){
                    if (err) console.log("error occured!");
                    else {
                        data.forEach(function(campground){
                        Campground.create(campground, function(err, createdCampground){
                            if (err) console.log("error occured!!");
                            else{
                                Comment.create({
                                    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, commodi, libero sed tenetur ullam minus excepturi molestiae beatae voluptates voluptatibus adipisci qui assumenda. Atque, blanditiis omnis nesciunt ullam vitae nobis!",
                                    author: "Mustafa Daljac"
                                    
                                    }, function(err, comment){
                                        if (err) console.log("error creating comment!!");
                                        else {
                                            createdCampground.comments.push(comment);
                                            createdCampground.save();
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    };
    
module.exports = initDB;
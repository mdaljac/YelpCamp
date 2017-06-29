var mongoose = require("mongoose"),
    Comment = require("../models/comment"),
    campgroundSchema = new mongoose.Schema({
        name: String,
        image: String,
        description: String,
        price: String,
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }],
        author:
        {
            id:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        }
    });
    
    campgroundSchema.post("remove", function(campground){
        Comment.remove({ _id: { $in: campground.comments }}).exec();
    });
    
    
module.exports = mongoose.model("Campground", campgroundSchema);
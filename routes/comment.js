var express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

router.get("/comments/new", middleware.isLoggedIn, function(req, res) {

    Campground.findById(req.params.id, function(err, campground) {
        if (err) req.flash("error", "Campground not found");
        else res.render("comments/new", {
            campground: campground
        });
    });
});

router.post("/comments", middleware.isLoggedIn, function(req, res) {

    Campground.findById(req.params.id, function(err, campground) {
        if (err) console.log("error occured!");
        else {
            var newComment = {
                text: req.body.text,
                author: {
                    id: req.user._id,
                    username: req.user.username
                }
            };
            Comment.create(newComment, function(err, comment) {
                if (err) req.flash("error", "Ooops, something went wrong");
                else {
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment successfully added");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

router.get("/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {

    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) console.log("error occurred!!!");
        else res.render("comments/edit", {
            campground_id: req.params.id,
            comment: foundComment
        });
    });
});

router.put("/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) req.flash("error", "Ooops, something went wrong");
        else {
            req.flash("success", "Comment successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) console.log("error occured!!!");
        else {
            req.flash("success", "Comment successfully removed");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;

var Campground = require("../models/campground"),
    Comment = require("../models/comment");

var middlewareObj = {
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) return next();

        req.flash("error", "You must be logged in to do that");
        res.redirect("/login");
    },

    checkCampgroundOwnership: function(req, res, next) {
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, foundCampground) {
                if (err) req.flash("error", "Campground not found");
                else {
                    if (res.locals.currentUser._id.equals(foundCampground.author.id)) next();
                    else res.redirect("back");
                }
            });
        }
        else {
            res.render("auth/login");
        }
    },

    checkCommentOwnership: function(req, res, next) {
        if (req.isAuthenticated()) {

            Comment.findById(req.params.comment_id, function(err, foundComment) {

                if (err) req.flash("error", "Comment not found");
                else {
                    if (res.locals.currentUser._id.equals(foundComment.author.id)) next();
                    else res.redirect("back");
                }
            });
        }
        else res.render("auth/login");
    }
};

module.exports = middlewareObj;

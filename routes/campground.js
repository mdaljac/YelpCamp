var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");


router.get("/", function(req, res) {

    Campground.find({}, function(err, campgrounds) {
        if (err) console.log("error occured!!");
        else res.render("campgrounds/campgrounds", {
            campgrounds: campgrounds,
            page: "campgrounds"
        });
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
        if (err) req.flash("error", "Campground not found, try again later");
        else res.render("campgrounds/show", {
            campground: campground
        });
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {

    req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
    }

    Campground.create(req.body.campground, function(err, newCampground) {
        if (err) req.flash("error", "Ooops, something went wrong");
        else {
            req.flash("success", "Campground successfully added");
            res.redirect("/campgrounds");
        }
    })
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {

    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/edit", {
                campground: foundCampground
            });
        }
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log("error occured");
        }
        else {
            req.flash("success", "Campground successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) console.log("error ocurred!!");
        else {
            foundCampground.remove(function(err) {
                if (err) console.log("error occurred!!");
                else {
                    req.flash("success", "Campground successfully removed");
                    res.redirect("/campgrounds");
                }
            });
        }
    })
});

module.exports = router;

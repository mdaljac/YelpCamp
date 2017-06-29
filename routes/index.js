var express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    passport = require("passport");


router.get("/", function(req, res) {
    res.render("landing");
});

router.get("/login", function(req, res) {
    res.render("auth/login", {page: "login"});
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            req.flash("error", info.message);
            return res.redirect("/login");
        }
        if (!user) {
            req.flash("error", info.message);
            return res.redirect("/login");
        }
        req.logIn(user, function(err) {
            if (err) {
                req.flash("error", info.message);
                return res.redirect("/login");
            }
            else {
                req.flash("success", "Welcome " + req.user.username);
                res.redirect("/campgrounds");
            }
        });
    })(req, res, function() {});
});


router.get("/register", function(req, res) {
    res.render("auth/register", {page: "register"});
});

router.post("/register", function(req, res) {

    var newUser = new User({
        username: req.body.username
    });

    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome " + req.user.username)
            res.redirect("/campgrounds");
        });
    });
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/campgrounds");
});

router.get("*", function(req, res) {
   res.redirect("/campgrounds");
});

module.exports = router;

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    User = require("./models/user"),
    Comment = require("./models/comment"),
    expressSession = require("express-session"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");

var campgroundRoutes = require("./routes/campground"),
    commentRoutes = require("./routes/comment"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/Yelp-Camp");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSession({
    secret: "Today is very hot day",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(methodOverride("_method"));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id", commentRoutes);
app.use(indexRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SERVER HAS STARTED!");
});

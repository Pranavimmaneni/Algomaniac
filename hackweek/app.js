var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var Quesion = require("./models/questions");

var indexRoutes = require("./routes/index");
var quesRoutes = require("./routes/questions");

mongoose.connect("mongodb://127.0.0.1:27017/test_app",{useNewUrlParser: true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "just a test",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});


app.use("/", indexRoutes);
app.use("/questions",quesRoutes);

app.get("/code",function(req,res){
    res.render("demo");
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000,function(){
    console.log("Started");
});
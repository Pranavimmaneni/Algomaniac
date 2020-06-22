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

mongoose.connect(process.env.DATAURL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log("ERROR:",err.message);
});
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

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server has started!");
 });

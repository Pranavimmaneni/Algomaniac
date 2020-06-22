var express = require("express");
var router  = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/",function(req,res){
    res.render("landing");
});

router.get("/rank",function(req,res){
    User.find({}, function(err, allusers){
        if(err){
            console.log(err);
        } else {
           res.render("rank",{users :allusers});
        }
     });
});

router.get("/register", function(req, res){
    res.render("register"); 
 });
 
 //handle sign up logic
 router.post("/register", function(req, res){
     var newUser = new User({name: req.body.name, username: req.body.username, year: req.body.year});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             console.log(err);
             return res.render("register");
         }
         passport.authenticate("local")(req, res, function(){
            res.redirect("/questions"); 
         });
     });
 });
 
 //show login form
 router.get("/login", function(req, res){
    res.render("login"); 
 });
 
 //handling login logic
 router.post("/login", passport.authenticate("local", 
     {
         successRedirect: "/questions",
         failureRedirect: "/login"
     }), function(req, res){
 });
 
 // logout route
 router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/questions");
 });
 
 //middleware
 function isLoggedIn(req, res, next){
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect("/login");
 }
 
 module.exports = router;
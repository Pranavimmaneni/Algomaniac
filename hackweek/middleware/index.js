var User = require("../models/user");
var middlewareObj = {};

middlewareObj.checkOwnership = function(req,res,next){

    if(req.isAuthenticated()){

        if(req.user.username === "Admin"){
            next();
        }
        else {
            res.redirect("back");
        }
    } else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;
var express = require("express");
var router  = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var Question = require("../models/questions");
var middleware = require("../middleware");

router.get("/", function(req, res){

    Question.find({}, function(err, allquestions){
       if(err){
           console.log(err);
       } else {
          res.render("questions",{questions:allquestions});
       }
    });
});

router.post("/",middleware.isLoggedIn,function(req, res){

    var name = req.body.name;
    var prompt = req.body.prompt;
    var sampleinput1 = req.body.sampleinput1;
    var sampleoutput1 = req.body.sampleoutput1;
    var sampleinput2 = req.body.sampleinput2;
    var sampleoutput2 = req.body.sampleoutput2;
    var newQuestion = {name: name, prompt: prompt, sampleinput1: sampleinput1, sampleoutput1: sampleoutput1,sampleinput2: sampleinput2,sampleoutput2: sampleoutput2}

    Question.create(newQuestion, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/questions");
        }
    });
});

router.get("/new",middleware.checkOwnership, function(req, res){
    res.render("new"); 
 });

router.get("/:id", function(req, res){
    Question.findById(req.params.id).exec(function(err, foundQuestion){
        if(err){
            console.log(err);
        } else {
            console.log(foundQuestion)
            res.render("show", {question: foundQuestion});
        }
    });
});

// router.get("/:id/edit",middleware.checkOwnership,function(req,res){
//     Question.findById(req.params.id,function(err,foundQuestion){
//         res.render("edit",{question: foundQuestion});
//     });
// });

// router.put("/:id",middleware.checkOwnership,function(req,res){
//     Campground.findByIdAndUpdate(req.params.id,req.body.question,function(err, updatedQuestion){
//         if(err){
//             res.redirect("/questions");
//         }
//         else{
//             res.redirect("/questions/" + req.params.id);
//         }
//     });
// });

// router.delete("/:id",middleware.checkOwnership,function(req,res){
//     console.log("Enter");
//     Question.findOneAndDelete(req.params.id,function(err){
//         if(err){
//             res.redirect("/");
//             console.log("Error");
//         }
//         else {
//             res.redirect("/");
//             console.log("here");
//         }
//     });
// });

module.exports = router;

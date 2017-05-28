var express = require("express");
var router = express.Router({mergeParams: true});
var Spaceground = require("../models/spaceground");
var Comment = require("../models/comment");

//comments new
router.get("/new", isLoggedIn, function(req, res){
  Spaceground.findById(req.params.id, function(err, spaceground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {spaceground: spaceground});
    }
  });
});

//comments create
router.post("/", isLoggedIn, function(req, res){
  Spaceground.findById(req.params.id, function(err, spaceground){
    if(err){
      console.log(err);
      res.redirect("/spacegrounds");
    }else {
      Comment.create(req.body.comment, function(err2, comment){
        if(err2){
          console.log(err2);
        }else {
          //add username and id to comment: req.user
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          console.log(comment.author);
          spaceground.comments.push(comment);
          spaceground.save();
          res.redirect("/spacegrounds/" + spaceground._id);
        }
      });
    }
  });
});

//middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;

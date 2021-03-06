var express = require("express");
var router = express.Router({mergeParams: true});
var Spaceground = require("../models/spaceground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); // index.js is default

//comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
  Spaceground.findById(req.params.id, function(err, spaceground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {spaceground: spaceground});
    }
  });
});

//comments create
router.post("/", middleware.isLoggedIn, function(req, res){
  Spaceground.findById(req.params.id, function(err, spaceground){
    if(err){
      console.log(err);
      res.redirect("/spacegrounds");
    }else {
      Comment.create(req.body.comment, function(err2, comment){
        if(err2){
          req.flash("error", "Something went wrong, please try again.");
          console.log(err2);
        }else {
          //add username and id to comment: req.user
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          spaceground.comments.push(comment);
          spaceground.save();
          res.redirect("/spacegrounds/" + spaceground._id);
        }
      });
    }
  });
});

//Comment edit
// /spacegrounds/:id/comments/:comment_id/edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundSpaceground){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {spaceground_id: req.params.id, comment: foundSpaceground});
    }
  });
});

//Comment update
// /spacegrounds/:id/comments/:comment_id
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/spacegrounds/" + req.params.id);
    }
  });
});


//Comment Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Successfully deleted comment");
      res.redirect("/spacegrounds/" + req.params.id);
    }
  });
  // res.send("this is the delete page");
});



module.exports = router;

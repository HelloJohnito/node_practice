//all middleware goes here
var Spaceground = require("../models/spaceground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkSpacegroundOwnership = function(req, res ,next){
  //check if user is logged in
  if(req.isAuthenticated()){
    Spaceground.findById(req.params.id, function(err, foundSpaceground){
      if(err){
        req.flash("error", "Spaceground not found");
        res.redirect("back");
      } else {
        //check if the user owns the spaceground
        //foundSpaceground.author.id is a mongoose object.
        if(foundSpaceground.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "Permission Denied.");
          res.redirect("back");
        }
      }
    });
  } else{
    req.flash("error", "Please login first");
    res.redirect("back");
  }
};


middlewareObj.checkCommentOwnership = function(req, res ,next) {
  //check if user is logged in
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
        //check if the user owns the comment
        //foundComment.author.id is a mongoose object.
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "Permission Denied.");
          res.redirect("back");
        }
      }
    });
  } else{
    req.flash("error", "Please login first");
    res.redirect("back");
  }
};


middlewareObj.isLoggedIn= function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Need to login first");
  res.redirect("/login");
};


module.exports = middlewareObj;

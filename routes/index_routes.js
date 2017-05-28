var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require('../models/user');


//===========================
// Home
//==========================

router.get("/", function(req,res){
  res.render("home_page");
});

//===========================
// Auth
//==========================

// show register form
router.get("/register", function(req, res){
  res.render("auth/register");
});

//create new user
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("auth/register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/spacegrounds");
    });
  });
});

//show login
router.get("/login", function(req, res){
  res.render("auth/login");
});

//login user
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/spacegrounds",
    failureRedirect: "/login"
  }), function(req, res){
});

//logout
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/spacegrounds");
});


//middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;

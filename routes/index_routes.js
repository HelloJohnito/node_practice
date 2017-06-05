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
      req.flash("error", err.message);
      console.log(err);
      return res.render("auth/register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to Spaceground" + user.username);
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
    failureRedirect: "/login",
    failureFlash: "Username or password is incorrect.",
    successFlash: "Welcome back!"
  }), function(req, res){
});

// router.post("/login", function(req, res, next){
//   passport.authenticate("local", function(err, user, info){
//     if(err){
//       return next(err);
//     }
//     if(!user){
//       req.flash("error", "username or password is incorrect");
//       return res.redirect("/login");
//     }
//     req.logIn(user, function(err){
//       if(err){return next(err);}
//       var redirectTo = req.session.redirectTo? req.session.redirectTo : "/spacegrounds";
//       delete req.session.redirectTo;
//       req.flash("sucess", "welcom back!");
//       res.redirect(redirectTo);
//     });
//   })(req,res,next);
// });

//logout
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You logged out!");
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

var express = require("express");
var router = express.Router();
var Spaceground = require("../models/spaceground");


//Index Route
router.get("/", function(req, res){
  Spaceground.find({}, function(err, allSpacegrounds){
    if(err){
      console.log(err);
    } else {
      res.render("spacegrounds/index", {spacegrounds: allSpacegrounds});
    }
  });
});


//Create Route
router.post("/", isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newSpaceground = {
    name: name,
    image: image,
    description: description,
    author: author
  };

  //create and push to the database
  Spaceground.create(newSpaceground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect("/spacegrounds");
    }
  });
});


//New Route
// MUST BE IN FRONT OF SHOW ROUTES
router.get("/new", isLoggedIn, function(req,res){
  res.render("spacegrounds/new");
});


//Show Route
router.get("/:id", function(req, res){
  Spaceground.findById(req.params.id).populate("comments").exec(
    function(err, foundSpaceground){
      if(err){
        console.log(err);
      }else {
        res.render("spacegrounds/show", {spaceground: foundSpaceground});
      }
    }
  );
});

//edit
router.get("/:id/edit", function(req, res){
  Spaceground.findById(req.params.id, function(err, foundSpaceground){
    if(err){
      res.redirect("/spacegrounds");
    }else {
      res.render("spacegrounds/edit", {spaceground: foundSpaceground});
    }
  });
});


//update
router.put("/:id", function(req, res){
  Spaceground.findByIdAndUpdate(req.params.id, req.body.spaceground, function(err, updatedSpaceground){
    if(err){
      res.redirect("/spacegrounds");
    }else {
      res.redirect("/spacegrounds/" + req.params.id);
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

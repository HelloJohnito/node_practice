var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Spaceground = require("./models/spaceground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");


//APP CONFIG
mongoose.Promise = global.Promise; // gets rid of deprecation error
mongoose.connect("mongodb://localhost/camp");  //creates the mongodb
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //for css
app.set("view engine", "ejs");


//seed data
seedDB();

//ROUTES

app.get("/", function(req,res){
  res.render("home_page");
});

//Index Route
app.get("/spacegrounds", function(req, res){
  Spaceground.find({}, function(err, allSpacegrounds){
    if(err){
      console.log(err);
    } else {
      res.render("spacegrounds/index", {spacegrounds: allSpacegrounds});
    }
  });
});

//New Route
// MUST BE IN FRONT OF SHOW ROUTES
app.get("/spacegrounds/new", function(req,res){
  res.render("spacegrounds/new");
});

//Show Route
app.get("/spacegrounds/:id", function(req, res){

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


//Create Route
app.post("/spacegrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newSpaceground = {
    name: name,
    image: image,
    description: description
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

//////////////////////////////////////////////////////
// Comments Route

app.get("/spacegrounds/:id/comments/new", function(req, res){
  Spaceground.findById(req.params.id, function(err, spaceground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {spaceground: spaceground});
    }
  });
});

app.post("/spacegrounds/:id/comments", function(req, res){
  Spaceground.findById(req.params.id, function(err, spaceground){
    if(err){
      console.log(err);
      res.redirect("/spacegrounds");
    }else {
      Comment.create(req.body.comment, function(err2, comment){
        if(err2){
          console.log(err2);
        }else {
          spaceground.comments.push(comment);
          spaceground.save();
          res.redirect("/spacegrounds/" + spaceground._id);
        }
      });
    }
  });
});

app.listen("3000", function(){
  console.log("Server has started");
});

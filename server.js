var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Spaceground   = require("./models/spaceground"),
    User          = require("./models/user"),
    Comment       = require("./models/comment"),
    seedDB        = require("./seeds");


//APP CONFIG
mongoose.Promise = global.Promise; // gets rid of deprecation error
mongoose.connect("mongodb://localhost/camp");  //creates the mongodb
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); //for css
app.set("view engine", "ejs");

//seed data
seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Sentence used to encode and decode.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});


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

app.get("/spacegrounds/:id/comments/new", isLoggedIn, function(req, res){
  Spaceground.findById(req.params.id, function(err, spaceground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {spaceground: spaceground});
    }
  });
});

app.post("/spacegrounds/:id/comments", isLoggedIn, function(req, res){
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

//=======================
// AUTH Routes
//======================

// show register form
app.get("/register", function(req, res){
  res.render("auth/register");
});

app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
  res.render("auth/login");
});

app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/spacegrounds",
    failureRedirect: "/login"
  }), function(req, res){
});

//logout
app.get("/logout", function(req, res){
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



app.listen("3000", function(){
  console.log("Server has started");
});

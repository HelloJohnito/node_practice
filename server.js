var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");


//creates the mongodb
mongoose.connect("mongodb://localhost/camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//SCHEMA Setup
var spacegroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

//Models
var Spaceground = mongoose.model("Spaceground", spacegroundSchema);

// Spaceground.create(
//   {
//     name: "gal",
//     image: "http://vignette1.wikia.nocookie.net/uncyclopedia/images/0/0c/Planets.jpg/revision/latest?cb=20170215154255"
//   }, function(err, newlyCreated){
//       if(err){
//         console.log(err);
//       } else {
//         console.log(newlyCreated);
//       }
//     }
// );

// var spacegrounds = [
//   {name: "Sal", image: "http://data.whicdn.com/images/45686773/superthumb.jpg"},
//   {name: "gal", image: "http://vignette1.wikia.nocookie.net/uncyclopedia/images/0/0c/Planets.jpg/revision/latest?cb=20170215154255"},
//   {name: "rainbow", image: "http://www.constellation-guide.com/wp-content/uploads/2011/07/Circinus-Galaxy-Supernova-SN-1996cr-300x250.jpg"}
// ];

app.get("/", function(req,res){
  res.render("home_page");
});

//Index Route
app.get("/spacegrounds", function(req, res){
  Spaceground.find({}, function(err, allSpacegrounds){
    if(err){
      console.log(err);
    } else {
      res.render("spacegrounds_page", {spacegrounds: allSpacegrounds});
    }
  });
});

//New Route
app.get("/spacegrounds/new", function(req,res){
  res.render("new");
});

//Create Route
app.post("/spacegrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newSpaceground = {name: name, image: image};

  //create and push to the database
  Spaceground.create(newSpaceground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect("/spacegrounds");
    }
  });
});


app.listen("3000", function(){
  console.log("Server has started");
});

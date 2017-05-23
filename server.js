var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var spacegrounds = [
  {name: "Sal", image: "http://data.whicdn.com/images/45686773/superthumb.jpg"},
  {name: "gal", image: "http://vignette1.wikia.nocookie.net/uncyclopedia/images/0/0c/Planets.jpg/revision/latest?cb=20170215154255"},
  {name: "rainbow", image: "http://www.constellation-guide.com/wp-content/uploads/2011/07/Circinus-Galaxy-Supernova-SN-1996cr-300x250.jpg"}
];

app.get("/", function(req,res){
  res.render("home_page");
});

app.get("/spacegrounds", function(req, res){
  res.render("spacegrounds_page", {spacegrounds: spacegrounds});
});

app.get("/spacegrounds/new", function(req,res){
  res.render("new");
});

app.post("/spacegrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newSpaceground = {name: name, image: image};
  spacegrounds.push(newSpaceground);
  res.redirect("/spacegrounds");
});


app.listen("3000", function(){
  console.log("Server has started");
});

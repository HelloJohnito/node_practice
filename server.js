var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("home_page");
});

app.get("campgrounds", function(req, res){
  var campground = [
    {name: "Sal", image: ""},
    {name: "gal", image: ""},
    {name: "ran", image: ""}
  ];
});

app.listen("3000", function(){
  console.log("Server has started");
});

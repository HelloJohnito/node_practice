var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("home_page");
});

app.get("/spacegrounds", function(req, res){
  var spacegrounds = [
    {name: "Sal", image: "http://www.photosforclass.com/download/5518990239"},
    {name: "gal", image: "http://www.photosforclass.com/download/5518991291"},
    {name: "rainbow", image: "http://www.photosforclass.com/download/5519581506"}
  ];

  res.render("spacegrounds_page", {spacegrounds: spacegrounds});
});

app.get("/spacegrounds/new", function(req,res){
  res.render("new");
});

app.post("/spacegrounds", function(req, res){

});


app.listen("3000", function(){
  console.log("Server has started");
});

var mongoose = require("mongoose");
var Spaceground = require("./models/spaceground");
var Comment = require("./models/comment");

var data = [
  {
    name: "mars",
    image: "http://darkthirtynews.com/wp-content/uploads/2016/06/volcanic-eruptions-heated-mars-water-300x250.jpg",
    description: "mars is sooo cool"
  },
  {
    name: "green lantern",
    image: "https://images-na.ssl-images-amazon.com/images/G/01/rando/ems/images/lenac/Image2S._V402437537_.jpg",
    description: "greens everywhere"
  },
  {
    name: "sky land",
    image: "https://static1.hdwallpapers.net/wallpapers/2015/12/09/949/thumb_ios-nebula.jpg",
    description: "sky land land land"
  }
];


function seedDB(){
  //remove all campgrounds
  Spaceground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed spacegrounds!");

    //add spacegrounds
    data.forEach(function(seed){
      Spaceground.create(seed, function(err2, spaceground){
        if(err2){
          console.log(err);
        } else {
          console.log("added a spaceground");

          //create a comment
          Comment.create({
            text: "This is the comments",
            author: "Homer"
          }, function(err3, comment){
            if(err3){
              console.log(err);
            } else {
              spaceground.comments.push(comment);
              spaceground.save();
              console.log("created new comments");
            }
          });
        }
      });
    });
  });

}

module.exports = seedDB;

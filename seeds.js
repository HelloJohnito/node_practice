var mongoose = require("mongoose");
var Spaceground = require("./models/spaceground");
var Comment = require("./models/comment");

var data = [
  {
    name: "fineline",
    image: "https://img.purch.com/w/660/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA2NC8yMTIvb3JpZ2luYWwvaXNzLWdvb2QtbW9ybmluZy5qcGc=",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "beautiful earth",
    image: "https://s-media-cache-ak0.pinimg.com/originals/0a/8e/73/0a8e73aa3dbc5000da95da23433070de.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "sky land",
    image: "https://static01.nyt.com/images/2017/02/21/science/21OVERBYE/21OVERBYE-videoLarge.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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

var mongoose = require("mongoose");

var spacegroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Spaceground", spacegroundSchema);

// to have a default image in schema.
//image: {type: string, default: "image_url"}

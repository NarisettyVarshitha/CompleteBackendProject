const mongoose = require("mongoose");
const userModel = require("./user.model");

const musicSchema = new mongoose.Schema({
  //the music file should go into imagekit
  //for that we need imgkit uri

  uri: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const musicModel = mongoose.model("Music", musicSchema);

module.exports = musicModel; //to use this model in other files like controllers we have to export it

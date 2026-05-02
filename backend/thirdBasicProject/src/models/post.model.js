const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image : String,
    caption : String,
})

//post is the name of the collection in the database
const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
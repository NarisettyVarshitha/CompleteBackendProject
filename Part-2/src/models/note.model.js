const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title : String,
    description : String,
    // age : Number, dob : Date

})


//model is created : to perform any operation :CRUD on db we need model(CREATE , READ, UPDATE, DELETE)
//model is created by mongoose.model() method
//it takes 2 input : 1st is name of model (it should be in singular form) 
//2nd is schema name which we created above
const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;
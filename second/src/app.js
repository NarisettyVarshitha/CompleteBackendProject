const express = require('express');

const noteModel = require("./models/note.model");


const app = express();//server is initiated
//to start server use/create server.js


//middleware
app.use(express.json());//to parse json data coming from client to server


//now we need to store our notes in our db
//it has title & description
//whenever we want to store data in db then we 
// should tell db 1st about type of data it is & how it looks 
// this process is called as schema creation
//for this we need other new folder called models in src





//here we have 4 API's 
//  POST : Create a note
// GET : get all notes
// DELETE /notes/:id : delete a note
// PATCH  /notes/:id : update a note

//here data is stored in db this is diff frm postman



app.post("/notes", async (req, res) =>{

    const data = req.body;
    //now we should store this data in db for that we need model
    //model is created in models folder in note.model.js file
    //we need to import that model here to use it
    await noteModel.create({
        title : data.title,
        description : data.description,
    })

    res.status(201).json({
        message : "Note created sucessfully"
    })
})

//to fetch all notes we need to use get api
app.get("/notes", async (req, res) =>{

    //using method noteMode.find() method
    // whenever we want some data about not we need to use noteModel
    // in that we are using find method to get all notes from db & stores in variable

    //FIND METHOD GIVES DATA IN FORM : ARRAY OF OBJECTS format

    //we also have findOne() method (used for searching like it returns single object)
    //find = [{}, {} ,{}] or [] (if no data is there)
    //findOne => {} or null 
    const notes = await noteModel.find();
    res.status(200).json({
        message : "Notes fetched successfully",
        notes : notes
    })
});


//delete api
//here we use ID couz we dont have indx in db

app.delete("/notes/:id", async(req, res) => {
    const id = req.params.id;

    await noteModel.findOneAndDelete({
        _id : id
    })

    res.status(200).json({
        message : "Note deleted successfully"
    })
})


//
app.patch("/notes/:id", async(req, res) =>{
    const id = req.params.id;
    const description = req.body.description;

    await noteModel.findOneAndUpdate({  _id : id},{ description : description  })

    //findOneAndUpdate takes 2 parameters : 1st is which note to update (we are using id for that)
    //2nd is what to update (we are updating description here)

    res.status(200).json({
        message : "Note updated successfully.."
    })
})

module.exports = app
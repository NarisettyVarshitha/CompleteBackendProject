//app.js is used to create server ---> in production level
const express = require('express')



const app = express()//server instance

//middleware
app.use(express.json())//makes json_data in req redable(express)


const notes = []


//api : method post
app.post('/notes', (req, res) => {
    notes.push(req.body);// whenever we what the data in req.body then we should use middleware

    res.status(201).json({
        message : "note created successfully"
    })
})

//patch method is used to update the data on the server
app.patch('/notes/:index', (req, res) =>{
    const index = req.params.index;
    const description = req.body.description
    const title = req.body.title

    notes[index].title = title
    notes[index].description = description
    res.status(200).json({
        message : "note updated successfully"
    })
})
//api : method get
app.get('/notes', (req, res) =>{
    res.status(200).json({
        message : "notes fetched successfully",
        notes : notes
    })
})
//api : method delete ,api name : notes/:index
//index changes which index to be deleted i.e dynamic part 
//so dynamic part in routes are considered as "PARAMS" 
// something after colon means dynamic/:index
app.delete('/notes/:index', (req, res) =>{

    const index = req.params.index
    delete notes[index]

    res.status(200).json({
        message : "notes deleted sucessfully"
    })
})
//a package called mongoosed is used to connect our server to our db
module.exports = app;
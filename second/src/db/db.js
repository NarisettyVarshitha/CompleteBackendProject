const mongoose = require('mongoose');


async function connectDB(){

    //mongoose.connect() this method connects server with db
    //it takes input URI i.e taken from Atlas/compass connection uri
    // the direct uri is not given couz server should not connect with cluster 
    // it should connect with db inside cluster so aftter "/" give db name 
    // (IF DB EXISTS IT STORES DATA IN IT ELSE IT CREATES NEW DB WITH THAT NAME)
    await mongoose.connect("mongodb+srv://yt:BfQhMSIXn3Hmhilu@yt-complete-backend.nsimaqu.mongodb.net/halley");

    console.log("Connected to DB");

    //here async keywords are used: here we are connecting our server to DB 
    //  we dont know howmuch time it takes for completion  acc to n/w speed & quality so  we use 
    // AWAIT : until connection is it waits in that line only
}

//here only db connected logic is written but it is called in server.js by exporting

module.exports = connectDB

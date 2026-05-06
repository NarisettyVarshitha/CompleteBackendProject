const mongoose = require('mongoose');


async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to the database");
    }
    catch(err){
        console.log("Error connecting to the database", err);
        process.exit(1);
    }
}

module.exports = connectDB;//to use this function in other files like server.js we have to export it




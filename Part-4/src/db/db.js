const mongoose = require('mongoose');
//this file is needed to connect with db

async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database successfully Connected..");

    } catch(err){

        console.error("Database connection error:", err);
    }
}

module.exports = connectDB;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:String
});

//developing api to register the user in the databasethen creating token to give it to the user for authentication and authorization
//we dont create api's in app.js file in production level
// we create a separate folder for routes and controllers and then we import those routes in app.js file but here we are creating api's in app.js file for simplicity


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
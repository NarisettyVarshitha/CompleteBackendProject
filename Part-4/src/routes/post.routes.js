const express = require('express');

const jwt = require('jsonwebtoken');//to verify the token coming from the client in cookies we need to use this package


const userModel = require('../models/user.model');//to access the user data from database we need to use this model
const router = express.Router();



router.post("/create", async (req, res) => {

    //and we should also check whether the token is correct or not because if token is incorrect then also we should not allow that person to access this api so for that we will verify the token using jwt.verify() method and if token is correct then we will allow that person to access this api otherwise we will send error 
    // response that you are not authorized to access this api because your token is incorrect.

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "un-authorized log-in"
        })          
    }

    // Here you would typically verify the JWT token using a library like jsonwebtoken.
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded JWT:", decoded);
        const user = await  userModel.findOne({ _id: decoded.id });//to find user

        console.log("User found:", user);

    } catch (err) { 
        return res.status(401).json({
            message: "Invalid token"
        })          
    }

    res.send("Post created successfully");

})

//why do we need tokens ???
//the person who has token then we can say that that person already has acc & logged into to application and then only that person can access this api because this api is protected api because
//  we want only logged in user can access this api so for that we will check if the token is present in cookies or not if token is present in cookies then we will allow that person to access this api otherwise we will send error response that 
// you are not authorized to access this api because you are not logged in.



module.exports = router;
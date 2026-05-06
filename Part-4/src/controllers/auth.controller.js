const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

//logic for api's is written in controllers..

async function registerUser(req, res){


    const {username, email, password} = req.body;//destructuring

    const isUserAlreadyExist = await userModel.findOne({email});//to check if user already exist or not
    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "User already exist with this email"
        })
    }

    
    const user = await userModel.create({
        username, email, password
    }); 
    //to create token we use another pkg called jsonwebToken

    //creating token
    const token = jwt.sign(
        //here data should be unique for every user and 
       { id : user._id }, process.env.JWT_SECRET);


        res.cookie("token", token);//this will save the token in cookies and whenever we want to access this token in future we can access it using req.cookies.token
    
    res.status(201).json({
        message: "User registered successfully",
        user
        // (token)//we should save this token  in  cookies(in express to sore data in cookies we've to use 1 middleware called cookie-parser) or
                //  in local storage(in frontend) because this token is needed for authentication and authorization whenever user wants to access protected routes.
    })


}

module.exports = {registerUser};//exporting in form of object because we can have multiple functions in this file and 
// we can export all those functions in form of object and then we can import those functions in other files using destructuring.
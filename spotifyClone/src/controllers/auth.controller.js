const userModel = require("../models/user.model");//importing the user model to interact with the database
const jsonwebtoken = require("jsonwebtoken");//importing jsonwebtoken to generate and verify JWT tokens

const bcrypt = require("bcryptjs");//importing bcryptjs to hash the password before saving it to the database







async function registerUser(req, res){

const {username , email, password, role = "user"} = req.body;//destructuring the request body to get the user details

const isUserAlreadyExist = await userModel.findOne({
    $or : [
        {email },
        {username }
    ]
    });//checking if the user already exists in the database


    if(isUserAlreadyExist){
        return res.status(400).json({
            message : "User already exists"
            
        })
    }

    const hash = await bcrypt.hash(password, 10);//hashing the password with 10 rounds of hashing
    //10 is  called salt which adds a unique val to each pass before hashing to make rainbow table & brute-forece attacking difficult/in-efficient


    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    });//creating a new user in the database

    const token = jsonwebtoken.sign({id : user._id, role : user.role},
        process.env.JWT_SECRET);//generating a JWT token for the user

    res.cookie("token", token)


    res.status(201).json({
        message : "User registered successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    })
}

//note: to perform hashing on text we use pkg called bcryptjs. 
// It provides a method called hash which takes the text and the number of rounds to perform hashing and returns the hashed text.
//  We can use this method to hash the password before saving it to the database.

//creating login controller
async function loginUser(req, res){
    const {username, email, password} = req.body;//destructuring the request body to get the user details

    const user = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    });//checking if the user exists in the database

    if(!user){
        return res.status(401).json({
            message : "Invalid credentials"
        })
    }

    //checking pass by hashing couz in db the password stored is hashed and we cannot compare 
    // the plain text password with the hashed password directly. So we have to hash the entered password and then
    //  compare it with the hashed password in the database.
    const isPasswordMatch = await bcrypt.compare(password, user.password);//comparing the entered password with the hashed password in the database

    if(!isPasswordMatch){
        return res.status(401).json({
            message : "Invalid credentials"
        })
    }

    const token = jsonwebtoken.sign({id : user._id, role : user.role},
        process.env.JWT_SECRET);//generating a JWT token for the user

    res.cookie("token", token)

    res.status(200).json({
        message : "User logged in successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    })

}

//creating api where only artists can create a song rather than normal user
//creating in another file music.controller.js to keep the code organized and maintainable

async function logoutUser(req, res){
    res.clearCookie("token");//clearing the token cookie to log out the user    
    res.status(200).json({
        message : "User logged out successfully"
    })
}


//exporting controller functions to use them in routes

module.exports = { registerUser, loginUser, logoutUser };//to use this function in other files like routes we have to export it
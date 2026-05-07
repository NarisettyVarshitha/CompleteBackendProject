const jwt = require("jsonwebtoken");//importing the jsonwebtoken library to verify the token

async function authArtist(req, res, next){//here we'll ve 3 parameters


    const token = req.cookies.token;//getting the token from the cookies

    if(!token){
        return res.status(401).json({
            message : "Unauthorized access pls log in"
        })
    }

    //verifying token.
    try{

        const decoded =  jwt.verify(token, process.env.JWT_SECRET);//verifying the token

        if(decoded.role !== "artist"){
         return res.status(403).json({
             message : "Forbidden access : u dont have access to create music..."
         })
        }   
        

        req.user = decoded;//if the token is valid then we can get the user details from the decoded token and attach it to the 
        // request object so that we can use it in the controllers

        next();//if the user is an artist then we can call the next middleware or controller

    }catch(err){
        console.log(err);
        return res.status(401).json({
            message : "Invalid token- Unauthorized access."
        })
    }




}

async function authUser(req, res, next){

    const token = req.cookies.token;//getting the token from the cookies
    if(!token){
        return res.status(401).json({
            message : "Unauthorized access pls log in"
        })
    }


    try{
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);//verifying the token

        if(decoded.role !== "user"){
         return res.status(403).json({
             message : "Forbidden access : u dont have access to create music..."
         })
        }

        req.user = decoded;//if the token is valid then we can get the user details from the decoded token and attach it to the 
        // request object so that we can use it in the controllers
        next();//if the user is an artist then we can call the next middleware or controller

    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message : "Invalid token- Unauthorized access."
        })
    }   
}


module.exports = {
    authArtist,
    authUser
}//to use this function in other files like routes we have to export it

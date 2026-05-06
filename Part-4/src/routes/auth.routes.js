const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();//created router instance
//using this router we r going to create api's
//previously we've created like app.post/get now we dont have app even we cant import app here because we are in different file so we will use router.post/get to create api's
//by creating router.

router.post("/register", authController.registerUser) 
// what happens here is  api is written in some other file called controller file and we will import that controller file here and then we will use that controller function here in this api

router.get("/test", (req, res) =>{
    console.log("Cookies : ", req.cookies);
    res.json({
        message: "Test API is working fine",
        cookies: req.cookies
    })      
})



module.exports = router;
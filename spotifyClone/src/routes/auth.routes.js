const express = require('express')
const authController = require("../controllers/auth.controller");//importing the auth controller
const router = express.Router();



//register api
router.post("/register", authController.registerUser)

router.post("/login", authController.loginUser);




module.exports = router;//to use this router in other files like controllers we have to export it

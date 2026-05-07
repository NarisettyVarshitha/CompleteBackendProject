const express = require("express");
const authController = require("../controllers/auth.controller"); //importing the auth controller
const router = express.Router();

//register api
router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);


// production logout method is token blacklisting is used : couz same token  can be used by any other person
router.post("/logout", authController.logoutUser);
router.get("/logout", authController.logoutUser); // allow logout via GET as well

module.exports = router; //to use this router in other files like controllers we have to export it

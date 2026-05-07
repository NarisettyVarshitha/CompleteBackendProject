const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware"); //importing the auth middleware to protect the routes
const musicController = require("../controllers/music.controller"); //importing the music controller

const multer = require("multer"); //importing multer to handle file uploads

const upload = multer({
  storage: multer.memoryStorage(), //to store the uploaded file in memory as a buffer
}); //to parse the incoming multipart/form-data request body

router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.single("music"),
  musicController.createMusic,
); //route to create a new music entry

router.post("/album", authMiddleware.authArtist, musicController.createAlbum); //route to create a new album entry

router.get("/", authMiddleware.authUser, musicController.getAllMusics); //route to get all musics in the database)

router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums); //route to get all albums in the database

router.get(
  "/albums/:albumId",
  authMiddleware.authUser,
  musicController.getAlbumById,
); //route to get a specific album by its ID

router.get(
  "/album/:albumId",
  authMiddleware.authUser,
  musicController.getAlbumById,
); //alias route so singular /album/:id works too





module.exports = router; //to use this router in other files like controllers we have to export it

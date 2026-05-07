const musicModel = require("../models/music.model"); //importing the music model
//to verify token

const jwt = require("jsonwebtoken"); //importing jsonwebtoken to generate and verify JWT tokens

const { uploadFile } = require("../services/storage.service"); //importing the uploadFile function from storage service to upload the music file to imagekit

const albumModel = require("../models/album.model"); //importing the album model to add the music to the album

async function createMusic(req, res) {
  //this music create must be protected couz only artist role can create music else it should give 404 forbidden error

  const token = req.cookies.token; //getting the token from the cookies

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifying the token

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Forbidden access : u dont have access to create music...",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const { title, artist, album } = req.body; //destructuring the request body to get the music details

  const file = req.file; //getting the music file from the request

  const result = await uploadFile(file.buffer.toString("base64")); //uploading the music file to imagekit and getting the result which contains the url of the uploaded file

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  }); //creating a new music in the database with the url of the uploaded file

  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      title: music.title,
      artist: music.artist,
      uri: music.uri,
    },
  });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body; //destructuring the request body to get the album details

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  }); //creating a new album in the database with the music ids

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

//here in createAlbum controller & in createMusic controller there is so much of repetative code for
//verifying token, user, try-catch blockas for error handling..etc so this part is repetative to avoid this we use middleware

async function getAllMusics(req, res) {
  const musics = await musicModel
    .find()
    .skip(1)
    .limit(2)
    .populate("artist", "username email role"); //to get musics from the database and populate the artist field with the artist details

  res.status(200).json({
    message: "All musics fetched successfully",
    musics: musics,
  });
}

async function getAllAlbums(req, res) {
  const albums = await albumModel
    .find()
    .select("title artist ")
    .populate("artist", "username email role")
    .populate("musics", "title uri"); //to get all albums from the database and populate the artist field with the artist details and musics field with the music details

  res.status(200).json({
    message: "All albums fetched successfully",
    albums: albums,
  });
}

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email role")
    .populate("musics", "title uri");

  if (!album) {
    return res.status(404).json({
      message: "Album not found",
    });
  }

  res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
}; //to use this function in other files like routes we have to export it

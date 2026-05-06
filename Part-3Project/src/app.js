const express = require("express");
const multer = require("multer");
const app = express();
const uploadFile = require("./services/storage.service");
//to save url in the db
const postModel = require("./models/post.model");

const cors = require("cors");

//use this middleware to parse the incoming request body as JSON
app.use(express.json()); //useful when data comes in raw format only
//for form data we use another middleware multer
const upload = multer({ storage: multer.memoryStorage() }); //this will store the uploaded file in memory as a buffer

// Enable CORS for all routes
app.use(cors());

app.post("/create-post", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const result = await uploadFile(req.file.buffer);
  console.log(result);

  const post = await postModel.create({
    image: result.url,
    caption: req.body.caption,
  });

  return res.status(201).json({
    message: "Post created successfully",
    post,
  });
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find();

  return res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
});

module.exports = app;

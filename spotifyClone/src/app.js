const express = require('express')
const cookieParser = require('cookie-parser')

const authRoutes = require("./routes/auth.routes");//importing the auth routes
const musicRoutes = require("./routes/music.routes");//importing the music routes

const app = express();//server created
app.use(express.json())//to parse the incoming request body as JSON

app.use(cookieParser()) //to parse the incoming request cookies

app.use('/api/music', musicRoutes); //mount music routes at /api/music

app.use('/api/auth', authRoutes); //mount auth routes at /api/auth

module.exports = app;//to use this app in other files like server.js we have to export it
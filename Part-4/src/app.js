const express = require('express');
const postRoutes = require('./routes/post.routes');

const authRoutes = require('./routes/auth.routes');//to tell what api's exist in our application we will create a separate file called routes 
// and then we will import that file here in app.js file and then we will use that file here in app.js file using app.use() method

const cookieParser = require('cookie-parser');//to save token in cookies we need to use this middleware

const app = express();//server is created
app.use(express.json());//to access the data coming from the client in req.body{MIDDLEWARE}
app.use(cookieParser());//until me use this middleware the server will not be able to access the cookies coming from the client in req.cookies{MIDDLEWARE}

// /register is 1 api 
//i.e done using router, so whenever we use help of router to make api the we should use
// /api prefix is needed.
app.use('/api/auth', authRoutes);
app.use("/api/posts", postRoutes)



module.exports = app;

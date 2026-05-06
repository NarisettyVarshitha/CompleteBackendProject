require("dotenv").config(); //to use the variables in .env file we have to call this function once in our code
const app = require("./src/app"); //importing the app from src/app.js
const connectDB = require("./src/db/db"); //importing the connectDB function from src/db.js

connectDB(); //to connect to the database

app.listen(8080, (req, res) => {
  console.log("Server is running on port 8080");
});

require("dotenv").config(); //to use the variables in .env file we have to call this function once in our code
const app = require("./src/app"); //importing the app from src/app.js
const connectDB = require("./src/db/db"); //importing the connectDB function from src/db.js

connectDB(); //to connect to the database

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});

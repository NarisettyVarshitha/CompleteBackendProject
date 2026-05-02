require("dotenv").config();
//to use the variables in .env file we have to call this function once in our code
//TO USE THESE VARIABLES we should install a package : npm i dotenv

const app = require("./src/app");

const connectDB = require("./src/db/db");

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const app = require("./src/app");

const connectDB = require("./src/db/db");


connectDB();



//start server
 app.listen(3000, () => {
    console.log("Server is running on port 3000");
 })

 //to connect server with the database i.e written in another file
 //(inside src folder create another folderDB then in it create file db.js) in that file connection logic is written
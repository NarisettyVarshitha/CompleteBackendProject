//server should be started in server.js file --> in production level

const app = require('./src/app')

app.listen(3000, () =>{
    console.log("Server started!! running on port 3000");
})
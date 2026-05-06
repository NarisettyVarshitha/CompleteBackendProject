require('dotenv').config();//to access mongo uri
const app = require('./src/app');
const connectDB = require('./src/db/db');


connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {//server is started

    console.log(`Server is running on port ${PORT}`);

})

//note :now we need to register a user: to do thatwe  should save their data
//for that we need to create a model
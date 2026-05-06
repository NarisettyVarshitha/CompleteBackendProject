const mongoose = require('mongoose');





const musicSchema = new mongoose.Schema({

    //the music file should go into imagekit
    //for that we need imgkit uri

    uri :{
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
    },
    artist : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    }

})


const musicModel = mongoose.model("music", musicSchema);





module.exports = musicModel;//to use this model in other files like controllers we have to export it    

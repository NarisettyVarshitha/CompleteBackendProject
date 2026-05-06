const ImageKit = require("@imagekit/nodejs");//importing the ImageKit package

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})


async function uploadFile(file){

    const result = await ImageKitClient.files.upload({
        file,
        fileName : "music_"+ Date.now(),
        folder : "spotifyClone/music"

    })

    return result;
}




module.exports = {
    uploadFile
}//to use this function in other files like controllers we have to export it
//to write image kit code
//we may use aws s3/ cloudinary tommorow so we r writing code here
// couze if we write code in app.js then we have to change it when we change the storage service

const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY, 
  
  //we should not hardcode this key in our code
  //taken frm imgkit acc it should be secret so we keep them in .env file
});



async function uploadFile(buffer) {


  const result = await imagekit.files.upload({

    file: buffer.toString("base64"), // Convert buffer to base64 string
    fileName: "image.jpg"

  });

  return result;
}

module.exports = uploadFile;

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});

import cloudinary from 'cloudinary';

const uploadImage = async (filePath) => {
  try {
    if(!filePath) return null
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'Books_cover' ,
      resource_type: "auto"
    });
    console.log("file uploaded", result.url);
    return result;
  } catch (error) {
    fs.unlinkSync(filePath)  //remove the locally saved temp. file as uploaded opration got failed
    console.error(error);
  }
};



export {uploadImage}
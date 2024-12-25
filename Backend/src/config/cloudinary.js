import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return null;
      // upload file on cloudnary

      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: 'auto',
          media_metadata:true,
          image_metadata:true,
      })
      // file have been uploaded successfully
      fs.unlinkSync(localFilePath);
      console.log("file is uploaded on cloudinary", response.url);
      return response;
  } catch (error) {
      fs.unlinkSync(localFilePath); // remove locally saved temp file as the upload operation got failed
      return null;
  }

}

const deleteOnCloudinary = async (oldFileURL) => {
  try {
      if (!oldFileURL) return null;
      // upload file on cloudnary

      const publicId = getPublicId(oldFileURL);
      console.log(oldFileURL, publicId);
      if (!publicId) {
          return null;
      }
      const response = await cloudinary.uploader.destroy(publicId);

      console.log("file is delete on cloudinary", response);
      return response;
  } catch (error) {
      return null;
  }

}

const getPublicId = (url = '') => {
  const id = url.split('/').pop().split('.')[0];
  return id;
}

export { uploadOnCloudinary, deleteOnCloudinary };

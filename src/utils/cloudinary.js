import {v2 as cloudinary} from "cloudinary";
import fs as "fs";

          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});

const uploadToCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath){
            throw new Error("localFilePath is required");
            return null;
        }
        const response=await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("File uploaded to cloudinary",response.url);
        return response;
    }catch(error){
        fs.unlinkSync(localFilePath);//remove the locally saved file as the upload operation got failed
        return null;
    }
};

export {uploadToCloudinary};
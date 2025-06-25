import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

// console.log("hello", process)
// console.log(process.env.CLOUDINARY_API_KEY)

 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:  process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    const uploadOnCloudinary = async (localFilePath)=>{

        try{
            // console.log(localFilePath)
            
            if(!localFilePath){
                return "could find the path of the file"
            }
          const response = await  cloudinary.uploader.upload(localFilePath ,{
                resource_type:'auto'
            })

            //file has been uploaded successfully 
            // console.log("file is uploaded on cloudianry" ,response.url)
            // fs.unlinkSync(localFilePath);
            
            return response

        }
        catch(error){
            // fs.unlinkSync(localFilePath)
             //remove the localysaved temporary file
            //as the upload operation get failed
console.log("cloudinary error is ",error)
            return null
        }

    }

    export {uploadOnCloudinary}
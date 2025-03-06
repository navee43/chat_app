import mongoose from "mongoose";
import {Data_Base_Name} from  '../constant.js'
import dotenv from 'dotenv'

dotenv.config({path:'./.env'})


const ConnectDb = async()=>{
   try {
      console.log(process.env.MONGODB_URL)
  const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${Data_Base_Name}`)
         console.log(`\n MongoDB connected connected !! DB HOST: ${connectionInstance.connection.host}`)
    
   } catch (error) {
    console.log("mongodb connection error RESTART THE SERVER AGAIN IF GET FIX " ,error);
        process.exit(1)
    
   }
}

export default ConnectDb;
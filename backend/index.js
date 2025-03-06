import ConnectDb from './database/Database.js';
import {app} from './app.js'
import { response } from "express";



ConnectDb()
.then(()=>{
    app.listen(process.env.PORT || 7000 , ()=>{
        console.log(`server is running at port ${process.env.PORT ||7000}`);
        
    })
    app.on("error" ,(error)=>{
        console.log("error",error);
        
        throw error
    })

}).catch((error)=>{
    console.log("mongodb connection failed !!! " , error);
    
})
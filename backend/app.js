import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import multer from 'multer';

// import {express} from 'express'
const app = express();


// app.use(cors(
//     {origin:'*',
//         Credential:true}
// ))
app.use(cookieParser())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.static("public")) 








// users routes 

import userRouter from './routes/user.routes.js'
app.use('/api/user' , userRouter)

// chat routes
import chatRouter from './routes/Chat.routes.js'
app.use('/api/chat',chatRouter)


// message routes
import messageRouter from './routes/messages.routes.js'
app.use('/api/message',messageRouter)





export {app}
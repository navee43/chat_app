import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import multer from 'multer';

const app = express()

// app.use(cors(
//     {origin:'*',
//         Credential:true}
// ))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true ,limit:"16kb"}))
app.use(express.static("public")) 
app.use(cookieParser())





import userRouter from './routes/user.routes.js'
app.use('/api/user' , userRouter)


export {app}
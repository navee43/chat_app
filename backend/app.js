import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import multer from 'multer';

// import {express} from 'express'
const app = express();

const allowedOrigins = [
  "https://chat-app-frontend-food.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "website-url"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// app.use(cors(
//     {origin:'*',
//         Credential:true}
// ))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.static("public")) 
app.use(cookieParser())







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

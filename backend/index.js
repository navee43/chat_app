import ConnectDb from './database/Database.js';
import { app } from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server, {
  cors: { 
    origin: "http://localhost:5173",  // ✅ Ensure frontend connection
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Connect to MongoDB
ConnectDb().then(() => {
  const PORT = process.env.PORT || 5320;
  server.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });

  server.on("error", (error) => {
    console.error("❌ Server error:", error);
  });
}).catch((error) => {
  console.error("❌ MongoDB connection failed!", error);
  process.exit(1);
});

io.on("connection",(socket)=>{
 
console.log("socket.io connected")

socket.on("setup",(user)=>{
  socket.join(user.data._id);
  socket.emit("connected");
})

socket.on("join chat",(room)=>{
socket.join(room)

}
)

socket.on("new message",(newMessageStatus)=>{
  var chat = newMessageStatus.chat;
  if(!chat.users){
    return console.log("chat.users not defined");
  }
  chat.users.forEach((user)=>{
    if(user._id==newMessageStatus.sender._id)return;
    socket.in(user._id).emit("message received",newMessageStatus)

  })

})





})
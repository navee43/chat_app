import ConnectDb from './database/Database.js';
import { app } from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

ConnectDb()
  .then(() => {
    server.listen(process.env.PORT || 7000, () => {
      console.log(`✅ Server is running at port ${process.env.PORT || 7000}`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
      throw error;
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed!", error);
    process.exit(1);
  });

io.on("connection", (socket) => {
  console.log(`🔗 Connection established: ${socket.id}`);

  socket.on("setup", (user) => {
    if (user && user.data && user.data.user && user.data.user._id) {
      socket.join(user.data.user._id);
      console.log(`👤 User ${user.data.user._id} joined their personal room`);
      socket.emit("connected");
    } else {
      console.error("Setup error: user data is missing");
    }
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log(`📌 Joined chat room: ${room}`);
  });

  socket.on("new message", (newMessageStatus) => {
    // Unwrap the message if it's wrapped in a 'data' property
    const message = newMessageStatus.data ? newMessageStatus.data : newMessageStatus;
    const chat = message.chat;
    if (!chat || !chat.users) {
      return console.log("chat.users not defined", newMessageStatus);
    }
    chat.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.to(user._id).emit("message received", message);
    });
  });

  socket.on("new message notification", ({ chatId, senderId, senderName, message }) => {
    console.log(`🔔 New message notification from ${senderName}`);
  
    // Notify all users in the chat EXCEPT the sender
    socket.to(chatId).emit("message notification", {
      chatId,
      senderName,
      message,
    });
  });
  
});

import  {  useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAllMessagesQuery, useSendMessageMutation } from "../redux/api/message.api.Slice";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import MessageOther from "../components/Layouts/Messages/MessageOther";
import MessageSelf from "../components/Layouts/Messages/MessageSelf";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {useFetchChatQuery} from '../redux/api/chat.apiSlice.js'
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,AnimatePresence
} from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

function Chat() {

  // console.log(data)
  const { chatId, chatName } = useParams();
  // console.log(chatId ,chatName)
  const { userInfo } = useSelector((state) => state.auth);
  const { data: getMessages } = useAllMessagesQuery(chatId);
 
  const [sendMess] = useSendMessageMutation();
  
  const {data:chat} = useFetchChatQuery(chatId);
  // console.log("the chat are ",chat);
  const selectedChat = chat?.find((item) => item._id === chatId); 

const otherUserImage = selectedChat?.users?.find(
  (user) => user._id !== userInfo?.data.user._id
)?.image; 

// console.log("The other user's image:", otherUser); 


  const [content, setContent] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const [newMessagePopup, setNewMessagePopup] = useState(null); // 🔹 State for notification
const [users,setUsers]= useState([])
// console.log(allMessages?.[0]?.createdAt) 

  // Create a socket instance
  const socket = useMemo(() => io("http://localhost:5230"), []);

  // Setup socket connection
  useEffect(() => {
    if (userInfo) {
      socket.emit("setup", userInfo);
      socket.on("connected", () => {
        setSocketConnectionStatus(true);
        console.log("✅ Socket connected");
      });
    }

    return () => {
      socket.off("connected");
    };
  }, [socket, userInfo]);

  // Join the chat room & update messages
  useEffect(() => {
    if (chatId && getMessages) {
      socket.emit("join-chat", chatId);
      console.log(`📌 Joined chat: ${chatId}`);
      setAllMessages(getMessages);
    }
  }, [socket, chatId, getMessages]);

  // Listen for new messages
  useEffect(() => {
    const messageListener = (newMessage) => {
      console.log("📩 New message received:", newMessage);
      setAllMessages((prevMessages) => [...prevMessages, newMessage]);

      // 🔹 Show notification if the sender is NOT the current user
      if (newMessage?.sender?._id !== userInfo?.data?.user?._id) {
        setNewMessagePopup({
          chatId: newMessage.chat._id,
          senderName: newMessage.sender.userName,
          message: newMessage.content,
        });

        // Auto-hide popup after 3 seconds
        setTimeout(() => {
          setNewMessagePopup(null);
        }, 3000);
      }
    };

    socket.on("message received", messageListener);

    return () => {
      socket.off("message received", messageListener);
    };
  }, [socket]);

  // console.log()
  // Send message function
  const sendMessage = async () => {
    if (!content.trim()) return;
    try {
      const res = await sendMess({ chatId, content }).unwrap();
      if (res) {
        toast.success("Message sent successfully");
        setContent("");

        // Optimistically update local state
        setAllMessages((prevMessages) => [...prevMessages, res.data ? res.data : res]);

        // Emit message event
        socket.emit("new message", res.data ? res.data : res);

        // 🔹 Emit a notification event to the recipient
        socket.emit("new message notification", {
          chatId,
          senderId: userInfo?.data?.user?._id,
          senderName: userInfo?.data?.user?.userName,
          message: content,
        });
      }
    } catch (err) {
      console.error("Error while sending message:", err);
    }
  };

  // console.log(getMessages)

  // console.log("the group chat name is ",groupChatName)
  const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;



  
// console.log(allMessages)
  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative h-screen max-w-screen bg-gray-950 text-gray-200 flex-1 flex flex-col"
    >
      {/* 🟢 Header Section */}
      <div className="relative z-50 flex justify-between bg-gray-900 text-white w-full items-center px-10 py-3">

        <div className="flex items-center"> 
          <img
            src={otherUserImage}
            alt=""
            className="rounded-full size-10 hover:rotate-6 transition-transform duration-300"
          />
          <div className="px-4">
            <h1>{chatName}</h1>
            {/* <p className="text-slate-400 text-sm">2 min ago ..</p>   */}
          </div>
        </div>
        <Link>
  <MdDelete className="cursor-pointer size-6 text-gray-100 hover:scale-110 transition duration-200" />
</Link>

      </div>
  
      {/* ✅ Chat Messages */}
      <div className="flex-1 bg-transparent rounded-4xl overflow-y-auto p-4 relative z-10">
        <div className="flex flex-col space-y-2">
          {allMessages?.filter(Boolean).map((message ,index) => (
            <div
              key={message?._id || Math.random()}
              className={`flex ${
                message?.sender?._id === userInfo?.data?.user?._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message?.sender?._id === userInfo?.data?.user?._id ? (
                <MessageSelf message={message?.content} timestamp={allMessages?.[index]?.createdAt}/>
              ) : (
                <MessageOther message={message?.content} image={allMessages[0]?.receiver?.image} timestamp={allMessages?.[index]?.createdAt} />
              )}
            </div>
          ))}
        </div>
      </div>
  
      {/* ✅ Message Input Field (Fixed Interaction Issue) */}
      <div className="bg-gray-500 h-16 flex items-center space-x-4 px-4 w-full relative z-10">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={async (event) => {
            if (event.code === "Enter" && !event.shiftKey) {
              event.preventDefault();
              await sendMessage();
              setContent("");
            }
          }}
        />
        <IoSendSharp className="cursor-pointer text-white size-7" onClick={sendMessage} />
      </div>
  
      {/* ✅ Background Stars Effect (Now Won't Block Input) */}
      <div className="absolute inset-0 pointer-events-auto">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
  
    </motion.section>
  );
  
};

export default Chat;

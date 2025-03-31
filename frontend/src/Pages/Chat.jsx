import  {  useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
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
import {useNavigate} from 'react-router-dom'
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,AnimatePresence
} from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

import { setPopUpState } from "../redux/HideMidContainerReducer/Hide.Slice";
import Profile from "../components/Layouts/Profile.jsx";
import {useDeleteChatMutation} from '../redux/api/chat.apiSlice.js'
function Chat() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chatId, chatName } = useParams();

  const [content, setContent] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const [newMessagePopup, setNewMessagePopup] = useState(null); 
  const [users,setUsers]= useState([])
  const [popUp , setPopUp] = useState(false)
  const {isPopupHidden}= useSelector(state=>state.hide) 
  const [deleteChat] = useDeleteChatMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { data: getMessages } = useAllMessagesQuery(chatId);
  const {data:chat } = useFetchChatQuery(chatId);
   const {refetch} = useFetchChatQuery();
  const [sendMess] = useSendMessageMutation();
  

 
  const chat1 =  chat?.find((item)=>item._id===chatId)
  // console.log("the chat ",chat1?.isGroupChat)
  // console.log("the messages are",getMessages)
  // console.log("checking" , getMessages?.sender)
  const selectedChat = chat?.find((item) => item._id === chatId); 

// console.log(selectedChat?.isGroupChat)
// console.log(selectedChat?.groupAdmin?.image)

if(!selectedChat?.isGroupChat){
  var otherUserImage = selectedChat?.users?.find(
    (user) => user._id !== userInfo?.data.user._id
  )?.image; 
}else{
  var otherUserImage = selectedChat?.groupAdmin?.image;
}





  

 
  const socket = useMemo(() => io("http://localhost:5230"), []);

 
  useEffect(() => {
    if (userInfo) {
      socket.emit("setup", userInfo);
      socket.on("connected", () => {
        setSocketConnectionStatus(true);
        // console.log("Socket connected");
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
      // console.log(` Joined chat: ${chatId}`);
      setAllMessages(getMessages);
    }
  }, [socket, chatId, getMessages]);

  
  useEffect(() => {
    const messageListener = (newMessage) => {
      // console.log("New message received:", newMessage);
  
      // Prevent duplicate messages
      setAllMessages((prevMessages) => {
        const alreadyExists = prevMessages.some(msg => msg._id === newMessage._id);
        return alreadyExists ? prevMessages : [...prevMessages, newMessage];
      });
  
      if (newMessage?.sender?._id !== userInfo?.data?.user?._id) {
        setNewMessagePopup({
          chatId: newMessage.chat._id,
          senderName: newMessage.sender.userName,
          message: newMessage.content,
        });
  
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
  
 
  // Send message function
  const sendMessage = async () => {
    if (!content.trim()) return;
    try {
      const res = await sendMess({ chatId, content }).unwrap();
      if (res) {
        refetch();
        toast.success("Message sent ",{
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true, 
          progress: undefined, 
          theme: "dark", 
        });
        setContent("");
       

       
        setAllMessages((prevMessages) => [...prevMessages, res.data ? res.data : res]);

       
        socket.emit("new message", res.data ? res.data : res);

       
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

  const deleteCh = async()=>{
   
    try {
      console.log(chatId)
      const res = await deleteChat(chatId).unwrap();
      if(res){
        refetch();
        toast.success("chat deleted" ,{
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true, 
          progress: undefined, 
          theme: "dark", 
        });

        navigate('/') 
        
      }
      
    } catch (error) {
  
      toast.error("error occur",{
        position: "top-right",
        autoClose: 3000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined, 
        theme: "dark", 
      })
      console.log(error)
      
    }
  }

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
      <div className="flex  space-x-5  lg:space-x-10">
          <Link><FaUsers title="members"  onClick={() => { setPopUp(true)}}  className={`${chat1?.isGroupChat ? "block":"hidden"} cursor-pointer size-6 text-gray-100 hover:scale-110 transition duration-200`}/></Link>
      <Link>
  <MdDelete title="delete chat" onClick={deleteCh} className="cursor-pointer  size-6 text-gray-100 hover:scale-110 transition duration-200"  />
</Link>

      </div>
      </div>
      {popUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50">
          <div className="bg-white/10 backdrop-blur-lg text-white text-4xl p-6 rounded-lg shadow-lg relative lg:w-1/3">
          <p className='uppercase text-xl lg:text-3xl font-bold pb-10 text-center'>group members</p>
            
            <button 
              onClick={() => setPopUp(false)} 
              className="absolute top-2 right-4 text-white text-2xl"
            >
              <RxCross2  className="cursor-pointer"/>
            </button>

            <ul className="max-h-140 overflow-y-auto scrollbar-thin overflow-x-hidden">
              {chat1?.users?.map((user) => (
                <li key={user._id} className="bg-gray-800 rounded-md border   flex  items-center hover:scale-101  text-white hover:bg-gray-400 m-2 cursor-pointer text-lg  lg:text-xl w-[270px]  lg:w-[420px] p-1 lg:p-4 uppercase text-center font-semibold">
              {<img src={user.image} className="h-9 w-9 mx-4 mr-10 lg:w-12 lg:h-12 lg:mx-15 rounded-[50%]"/>}   {user.userName}
                {/* {console.log(user?.isAdmin)} */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      

    
  
     
      <div className="flex-1 bg-transparent rounded-4xl overflow-y-auto p-4 relative z-10  scrollbar-thin overflow-x-hidden">
          
        <div className="flex flex-col space-y-6 ">
          
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
                <MessageOther message={message?.content} image={message?.sender?.image} timestamp={allMessages?.[index]?.createdAt} />
              )}
            </div>
          ))}
        </div>
      </div>
  
    
      <div className="bg-gray-700 h-16 flex items-center space-x-4 px-4 w-full relative z-10">
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
  
  
      <div className="absolute inset-0 pointer-events-auto">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
  
    </motion.section>
  );
  
};

export default Chat;
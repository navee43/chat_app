import React, { useRef } from 'react'
import { IoSearchSharp, IoReorderThreeOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import {useGetUsersQuery} from '../../redux/api/user.apiSlice.js'
import { useState ,useEffect } from 'react';
import Loader from '../Loader/Loader.jsx'
import { useLogoutMutation } from '../../redux/api/user.apiSlice.js';
import ConversationItem from './ConversationItem.jsx';
import { MdDarkMode } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router';
import { useFetchChatQuery } from '../../redux/api/chat.apiSlice.js';
import { toast } from 'react-toastify';
import {logout} from '../../redux/auth/auth.slice.js'
// import { motion } from 'framer-motion';
import Chat from '../../Pages/Chat.jsx'

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
// import { useSelector } from "react-redux";
function SideBar() {
    const {userInfo} = useSelector(state=>state.auth)
    const {data:getUsers , isLoading , isError , isSuccess} = useGetUsersQuery();
    const {data:userChat,refetch} = useFetchChatQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  

    // console.log(userChat)
  //  if(refetch){
  //   console.log("fetching chat query again",userChat)
  //  }

  
    const [search, setSearch] = useState(""); // Store search input
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const [Focus , setFocus] = useState(false)
    const [conversations ,setConversations] = useState([])
   const [logoutCall] = useLogoutMutation();
   const [userPopup , setUserPopup] = useState(false);
  

    const filteredUsers = getUsers?.filter(user =>
      user.userName.toLowerCase().includes(search.toLowerCase())

    );
 const LogoutHandler = async () => {
    const res = await logoutCall().unwrap();
    if (res) {
      toast.success("Logout successful ✅");
    }
    dispatch(logout());
  };
    // useEffect(()=>{
    //   refetch();
    
    // },[refetch1])
    const menuRef = useRef();


    const blackout = ()=>{
      setFocus(true)
    }


    useEffect(()=>{
      if(userChat){
        setConversations(userChat)
      }
    },[userChat])


    useEffect(() => {
        const closeBlackout = (e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setFocus(false);
          }
        };

        document.addEventListener("mousedown", closeBlackout);
        return () => document.removeEventListener("mousedown", closeBlackout);
      }, []);


// const bgImage = 'https://plus.unsplash.com/premium_photo-1724835454003-dbcc05637cf7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGJsYWNrJTIwbW9vbnxlbnwwfHwwfHx8MA%3D%3D'

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const color = useMotionValue(COLORS_TOP[0]);

useEffect(() => {
  animate(color, COLORS_TOP, {
    ease: "easeInOut",
    duration: 5,
    repeat: Infinity,
    repeatType: "mirror",
  });
}, []);

const backgroundImage = useMotionTemplate`radial-gradient(65% 410% at 50%  100%, #020617 70%, ${color})`;
  return (

    <motion.section 
    style={{
      backgroundImage,
    }}
    
    className={`overflow-x-hidden relative max-h-screen w-full lg:w-1/3 bg-center bg-cover border-r-2 border-black grid  grid-cols-[50px_1fr] lg:grid-cols-[60px_1fr]`}
    >
      
       {/* style={{backgroundImage:`url(${bgImage})`}} */}

  <div className='flex flex-col items-center justify-between my-10'>

       <ul className='flex flex-col space-y-10   items-center'>
       <Link to='/onlineusers'><li><MdPersonAddAlt1 title='Add User' className='text-gray-100 size-6' /></li></Link>
          <Link to='/creategroups'> <li><IoIosAddCircle  title='create group' className='text-gray-100 size-6'/></li></Link>
          <Link to='/groups'><li><HiUserGroup title='availabe   Group' className='text-gray-100 size-6' /></li></Link>
           {/* <li><IoMdNotifications title='Notifications' className='text-red-500 size-5' /></li> */}
       </ul>
        <ul className=' flex flex-col items-center space-y-5'>
          
        <Link to='/login'><li> <FiLogOut className="text-gray-100 size-5 mx-2 size-6" onClick={LogoutHandler} /> </li></Link>
       <img src={userInfo.data.user.image} alt="current user" onClick={()=>setUserPopup(!userPopup)}
       className='cursor-pointer h-9 w-9 rounded-[50%] border-1 border-gray-600' />
        </ul>
          
          
  </div>

  <div className='top-0 bg-gray-900 z-10 py-3 sticky overflow-hidden '>


  <div className=' flex items-center my-2 mb-8 bg-gray-500 rounded-lg border-black border-1 mx-3 py-1.5 px-7'>
   <IoSearchSharp title='Search User' className='text-gray-100 size-5 ' />
   <input type="text" className='p-2 px-10 outline-none text-gray-100 font-semibold ' placeholder='Search' value={search}
   onChange={(e) => setSearch(e.target.value)} 
   // onClick={blackout} ref={menuRef}
   
   />

 </div>

<div className='overflow-y-auto flex-1 h-[calc(100vh-120px)] scrollbar-thin overflow-x-hidden pb-10 '>
  {
   conversations?.map((conversation,index)=>{
     var chatName ="";
     var chatImage="";
     if(conversation.isGroupChat){
       chatName = conversation.chatName;
       chatImage = conversation?.groupAdmin?.image;
       
       
      //  console.log(groupImage)


     }else{
      if (!conversation.isGroupChat) {
        let otherUser = conversation.users.find(user => user._id !== userInfo.data.user._id);
      
        if (!otherUser) {
          console.error("Other user not found in conversation:", conversation);
        } else {
          chatName = otherUser.userName;
          chatImage = otherUser.image;
          // console.log(chatImage)
        
          
        }
      }
      
     }
     if(conversation.latestMessage===undefined){
     
       return (
        
         <div key={conversation._id} className='' >
           <div key={index}
 className='bg-gray-700 m-3 rounded border-1 border-white flex items-center p-2 space-x-5 cursor-pointer text-white transition-all duration-400 ease-in-out hover:scale-105 hover:bg-gray-600 '
            onClick={()=>{navigate(`/chat/${conversation._id}/${chatName}`)}}> 
          
             <img src={chatImage} alt="" className='size-10 rounded-[50%]'/>
            
            <div>
            <p className='font-semibold'>{chatName}</p>
            <p>no previous message , start chat !</p> 
            </div>

           </div>
         </div>
       )
     }else{
       return (
        <div  key={conversation._id} className=''>

<div key={index} 
className='text-white border-1 bg-gray-700  m-3 rounded flex rounded p-2 space-x-5 cursor-pointer transition-all duration-400 ease-in-out hover:scale-105 hover:bg-gray-600' onClick={()=>{navigate(`/chat/${conversation._id}/${chatName}`) }} >
     
     
     <img src={chatImage} alt="" className='size-10 rounded-[50%]'/>
 
     <div>
     <div className='flex '>
      
      <p className='text-white'>{chatName}</p>
     
     </div>
    <div className='flex items-center space-x-10'>
    <p className='line-clamp-1 max-w-[230px] text-gray-100'>{conversation?.latestMessage?.content}</p>
    <p className='text-[12px] text-gray-400'>{new Date(conversation?.latestMessage?.createdAt).toLocaleDateString()}</p>
    </div>

     </div>
    

      </div>
        </div>
       )

     }
   
})
 } 

</div>
{
  !userPopup && <div className='bg-red-500 w-36 h-36 absolute top-[500px] right-62  '>
    
    <h1>{userInfo.data.user.userName}</h1>
    <h1>{userInfo.data.user.email}</h1>
  </div>
}



  </div>

  

   
   
  

    </motion.section>
   

  )
}

export default SideBar
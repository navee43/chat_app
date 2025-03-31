
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

import { MdDarkMode } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router';
import { useFetchChatQuery } from '../../redux/api/chat.apiSlice.js';
import { toast } from 'react-toastify';
import {logout} from '../../redux/auth/auth.slice.js'
import { setHideState } from '../../redux/HideMidContainerReducer/Hide.Slice.js';
import Chat from '../../Pages/Chat.jsx'
import Layout from './Layout.jsx';

function MidContainer() {


        const [search, setSearch] = useState(""); 
        const [loading, setLoading] = useState(true); 
        const [error, setError] = useState(null); 

        const [Focus , setFocus] = useState(false)
        const [conversations ,setConversations] = useState([])
      

        const [logoutCall] = useLogoutMutation();
        const {isHidden} = useSelector((state) => state.hide);
        const {userInfo} = useSelector(state=>state.auth)
        const {data:getUsers , isLoading , isError , isSuccess} = useGetUsersQuery();
        const {data:userChat,refetch} = useFetchChatQuery();
        const navigate = useNavigate();
        const dispatch = useDispatch();

      

        useEffect(() => {
          if (userChat) {
            setConversations(userChat);
          }
        }, [userChat]);


      return (
        <div>
    
    
    <div className={`${isHidden?"hidden":"block"} bg-cover bg-center top-0  z-10 py-3 sticky overflow-hidden min-h-screen border-r-2 border-black `} style={{backgroundImage:"url('https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}} >
    
    
    <div className=' flex items-center my-2 mb-8 bg-gray-500 rounded-lg border-black border-1 mx-3 py-1.5 px-7'>
     <IoSearchSharp title='Search User' className='text-gray-100 size-5 ' />
     <input type="text" className='p-2 px-4.5 lg:px-10 outline-none text-gray-100 font-semibold  ' placeholder='Search' value={search}
     onChange={(e) => setSearch(e.target.value)} 
    
     
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
         
         
        
    
    
       }else{
        if (!conversation.isGroupChat) {
          let otherUser = conversation.users.find(user => user._id !== userInfo.data.user._id);
        
          if (!otherUser) {
            console.error("Other user not found in conversation:", conversation);
          } else {
            chatName = otherUser.userName;
            chatImage = otherUser.image;
           
          
            
          }
        }
        
       }
       if(conversation.latestMessage===undefined){
       
         return (
          
           <div key={conversation._id} className='' >
             <div key={index}
    className='bg-gray-700 m-3 rounded border-1 border-white flex items-center p-2 space-x-5 cursor-pointer text-white transition-all duration-400 ease-in-out hover:scale-105 hover:bg-gray-600 '
    onClick={() => {
      navigate(`/chat/${conversation._id}/${chatName}`);
      dispatch(setHideState(true));
    }}
    
              
              
              > 
               
               <img src={chatImage} alt="" className='size-10 rounded-[50%]'/>
              
              <div>
              <p className='font-semibold'>{chatName}</p>
              <p>no messages , start chat !</p> 
              </div>
    
             </div>
           </div>
         )
       }else{
         return (
          <div  key={conversation._id}
          onClick={() => {
            navigate(`/chat/${conversation._id}/${chatName}`);
            dispatch(setHideState(true));
          }}
       
          className=''>
    
    <div key={index} 
    className='text-white border-1 bg-gray-700  m-3 rounded flex rounded p-2 space-x-5 cursor-pointer transition-all duration-400 ease-in-out hover:scale-105 hover:bg-gray-600' onClick={()=>{navigate(`/chat/${conversation._id}/${chatName}`) }} >
       
       
       <img src={chatImage} alt="" className='size-10 rounded-[50%]'/>
    
       <div>
       <div className='flex '>
        
        <p className='text-white'>{chatName}</p>
       
       </div>
      <div className='flex items-center space-x-10'>
      <p className='line-clamp-1 max-w-[230px] text-gray-100'>{conversation?.latestMessage?.content}</p>
      <p className='text-[12px] text-end text-gray-400'>{new Date(conversation?.latestMessage?.createdAt).toLocaleDateString()}</p>
      </div>
    
       </div>
      
    
        </div>
          </div>
         )
    
       }
     
    })
    } 
    
    </div> 
    </div>
        </div>
      )
 


}

export default MidContainer
import React from 'react'
import { IoSearchSharp, IoReorderThreeOutline } from "react-icons/io5";
import { useState  } from 'react';
import { useGetUsersQuery} from '../redux/api/user.apiSlice.js'
import { useAccessChatMutation } from '../redux/api/chat.apiSlice.js';
import {toast} from 'react-toastify'
import SideBar from '../components/Layouts/SideBar.jsx';
import { useFetchChatQuery } from '../redux/api/chat.apiSlice.js';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import  { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from 'react-redux';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,AnimatePresence
} from "framer-motion";
import { RxCross2 } from "react-icons/rx";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";



const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function OnlineUsers() {

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
   
    const {data:getUsers , isLoading , isError , isSuccess } = useGetUsersQuery();
    const [accessChat ] = useAccessChatMutation();
    const { refetch } = useFetchChatQuery();
    const {userInfo}= useSelector(state=>state.auth)

   
    
const AccessUserChat = async(userId)=>{
  const res = await accessChat({userId}).unwrap();
  if(res){
    refetch();
    toast.success("chat access successful✅✅")
  }
}
    
    
//     return (
//       <div>
//         <h3>Select a user to send a chat request</h3>
//         <ul>
//         {isLoading ? (
//   <p>Loading users...</p>
// ) : isError ? (
//   <p>Error loading users ❌</p>
// ) : (
//   <ul>
//     {getUsers?.length > 0 ? (
//       getUsers.map((user) => (
//         <li key={user._id} onClick={() => AccessUserChat(user._id)}
//             className="bg-gray-100 border p-3 text-2xl text-black hover:bg-green-100 m-3 cursor-pointer">
//           {user.userName} {user._id}
//         </li>
//       ))
//     ) : (
//       <p>No users found ❌</p>
//     )}
//   </ul>
// )}



//         </ul>
//       </div>
//     );
// }



return (
  <motion.section
style={{ backgroundImage }}
className="relative flex-1 grid h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
>
<div className="relative z-10 flex flex-col items-center">

<p className='uppercase text-5xl font-bold pb-10'>Make a friend</p>
<div className="relative bg-white/10 backdrop-blur-lg w-[700px] mx-4 p-2 flex justify-center items-center h-[650px] rounded-2xl">


<ul className="max-h-140 overflow-y-auto scrollbar-thin overflow-x-hidden">
   
{
  getUsers?.length > 0 ? (
    getUsers
      ?.filter(user => user?._id !== userInfo?.data?.user?._id)
      .map(user => (
        <li
          key={user._id}
          onClick={() => AccessUserChat(user._id)}
          className="bg-gray-800 rounded-md border p-4 flex  items-center hover:scale-101 text-xl text-white hover:bg-gray-400 m-2 cursor-pointer w-xl uppercase text-center font-semibold" 
        >
          {/* User Image */}
          <img
            src={user.image}
            alt="User"
            className="h-[60px] w-[60px] rounded-full mx-10 ml-5"
          />
          {user.userName}
        </li>
      ))
  ) : (
    <p>No user found ❌</p>
  )
}
    
  </ul>

   </div>
   </div>

<div className="absolute inset-0 z-0 pointer-events-none">
  <Canvas>
    <Stars radius={50} count={2500} factor={4} fade speed={2} />
  </Canvas>
</div>

</motion.section>

);
};

export default OnlineUsers;



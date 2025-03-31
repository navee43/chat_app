import React, { useState } from 'react'
import { useAddSelfToGroupMutation, useGetGroupsChatsQuery ,useFetchChatQuery} from '../redux/api/chat.apiSlice'
import { toast } from 'react-toastify';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import  { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router';
import { setHideState } from '../redux/HideMidContainerReducer/Hide.Slice';







function Groups() {

  const dispatch = useDispatch();
  const {data:getGroupChat ,isLoading} = useGetGroupsChatsQuery();
  const [addSelfToGrp] = useAddSelfToGroupMutation();
  const {userInfo} = useSelector(state=>state.auth)
  const userId = userInfo.data.user._id;
   var { refetch } = useFetchChatQuery();


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

  const add = async(chatId)=>{
    try {
      const res = await addSelfToGrp({chatId ,userId}).unwrap();
      if(res){
        refetch();
        toast.success("you are added to group",{
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true, 
          progress: undefined, 
          theme: "dark", 
        })
      }
      
    } catch (error) {
      toast.error(error , {
        position: "top-right",
        autoClose: 3000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined, 
        theme: "dark", 
      })
      console.log("there is some error while adding self to group", error)
    }
  }

return (
  <motion.section
style={{ backgroundImage }}
className="relative flex-1 grid h-screen place-content-center overflow-hidden bg-gray-950  text-gray-200"
>

<div className="relative z-10 flex flex-col items-center">
<h1 className='uppercase text-2xl  lg:text-5xl font-bold pb-10'>available Groups</h1>

<div className="relative bg-white/10 backdrop-blur-lg w-[300px] lg:w-[700px] mx-4 p-2 flex justify-center items-center h-100 rounded-2xl">
            
        
          {
            getGroupChat?.length > 0 ?(
              <ul className="max-h-80 overflow-y-auto scrollbar-thin overflow-x-hidden">
              {
          getGroupChat?.map((chat , index)=>(
            <li key={index} className="bg-gray-800 rounded-md border p-2 lg:p-4 flex items-center hover:scale-101 text-xl text-white hover:bg-gray-400 m-2 cursor-pointer  w-[270px] lg:w-xl uppercase text-center font-semibold" 
            onClick={()=>{add(chat._id);dispatch(setHideState(false));}}
            >{chat.chatName}      </li>
          ))
        }
               
              </ul>
            ) :(
              <div className='flex  flex-col items-center space-y-4 lg:space-y-6'>
                <h1 className=' text-lg   lg:text-2xl capitalize font-semibold'>no group availabe </h1>
                 <p className='capitalize'>create you own </p>
                <Link to='/creategroups'> <button className='capitalize px-4 py-1 font-semibold border-1 rounded my-2'> create</button></Link>
              </div>
            )
          }
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

export default Groups
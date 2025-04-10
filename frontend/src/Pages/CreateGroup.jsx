import { useCreateGroupChatMutation, useFetchChatQuery,useGetGroupsChatsQuery } from '../redux/api/chat.apiSlice.js'
import {useGetUsersQuery } from '../redux/api/user.apiSlice.js'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,AnimatePresence
} from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { setHideState } from '../redux/HideMidContainerReducer/Hide.Slice.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';




function CreateGroup() {
  

  const [creategroupChat] = useCreateGroupChatMutation();
  const [groupChatName, setGroupChatName] = useState('');
  const {data:getUsers} = useGetUsersQuery();
  const [users ,setUsers] = useState([])
  const navigate = useNavigate();
  const { refetch: refetchChats  } = useFetchChatQuery();
  const [add ,setAdd] = useState(false)
  const {refetch:refetchGroups} =useGetGroupsChatsQuery();
  const dispatch = useDispatch();
  const {isHidden} = useSelector((state) => state.hide);
  const {userInfo} = useSelector(state=>state.auth)

  const addmember=(user_id)=>{
    // console.log(user_id)
   if(!users.includes(user_id)){
    setUsers([...users,user_id])
   }
  


  }
  useEffect(()=>{

   if(users.length>0){
    toast.success(" added " ,{
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
  },[users])

  const create = async()=>{
    try{
      const res = await creategroupChat({users,groupChatName}).unwrap();
      if(res){
        dispatch(setHideState(false));
        refetchChats();
        refetchGroups();
        toast.success("group created",{
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true, 
          progress: undefined, 
          theme: "dark", 
        })
        navigate('/groups')
      }

    }
    catch(error){
      toast.error(error,{
        position: "top-right",
        autoClose: 3000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined, 
        theme: "dark", 
      })
      console.log("there is some error while creating group", error)
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
  className="relative flex-1 grid h-screen  place-content-center overflow-hidden bg-gray-950  text-gray-200"
>

  <div className="relative z-10 flex flex-col items-center">
    <div className="flex flex-col w-full p-20 justify-center items-center">
      <input 
        type="text" 
        placeholder="Enter group name" 
        value={groupChatName} 
        onChange={(e) => setGroupChatName(e.target.value)}
        className="bg-gray-800  text-white lg:text-xl border-1 border-white font-semibold outline-none rounded-md w-[200px] lg:w-3xl lg:mx-10 p-2 lg:p-4 mb-8"
      />
      <button className="bg-gradient-to-r from-black  to-gray-600 border-white border-1 animate-pulse w-24 lg:w-36 p-1 lg:p-2 rounded font-semibold text-md lg:text-xl" onClick={create}>
        Create
      </button>
      {/* <button className='px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_pink] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]'>test</button> */}
    </div>
    

    <motion.button
  initial={{ opacity: 0, scale: 0.8 }}
  animate={add ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
  className="p-2 bg-gradient-to-l from-blue-300 to-gray-900 rounded mb-10  w-40 lg:w-72"
  onClick={() => setAdd(!add)}
>
  Add Member
</motion.button>




    <AnimatePresence>
      {add && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          // className="fixed inset-0 flex  bg-black/50"
        >
          {/* Pop-up Container */}
          <div className="relative bg-white/10 backdrop-blur-lg mb-16  w-[250px] lg:w-[700px] mx-4 p-2 flex justify-center items-center h-82 rounded-2xl">
            
            {/* Close Button */}
            <RxCross2 
              className="absolute top-4 right-4 size-4 lg:size-6 cursor-pointer"
              onClick={() => setAdd(false)} // Close the popup
            />

            {/* User List */}
            <ul className="max-h-60 overflow-y-auto scrollbar-thin overflow-x-hidden">
              {
                getUsers?.filter((user)=>user._id!==userInfo.data.user._id).map((users)=>
                  <li 
                  key={users._id} 
                  onClick={() => addmember(users._id)}
                  className="bg-gray-800 rounded-md border p-1 lg:p-2 flex items-center hover:scale-101 text-md lg:text-xl text-white hover:bg-gray-400 m-2 cursor-pointer w-[200px] lg:w-xl uppercase text-center font-semibold"
                >
                 {<img src={users.image}className='w-7 h-7  lg:w-11 lg:h-11 rounded-[50%] mr-10 ml-5'/>} {users.userName}
                </li>
                )
              }
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  <div className="absolute inset-0 z-0 pointer-events-none">
    <Canvas>
      <Stars radius={50} count={2500} factor={4} fade speed={2} />
    </Canvas>
  </div>

</motion.section>

  );
};


export default CreateGroup


















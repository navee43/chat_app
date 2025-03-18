import React from 'react'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoSendSharp } from "react-icons/io5";
import MessageOther from '../components/Layouts/Messages/MessageOther';
import MessageSelf from '../components/Layouts/Messages/MessageSelf';
function Chat() {
  const {userInfo} = useSelector(state=>state.auth)
  return (

    <div className='flex flex-col flex-1   h-screen bg-slate-200 '>

      <div className='flex justify-between bg-white mx-4 mt-4 rounded-2xl items-center px-3 h-1/11  '>

       <div className='flex items-center   '>
       <img src={userInfo?.data.user.image} alt=""  className='rounded-[50%] size-10'/>

        <div className='px-4'>
          <h1>{userInfo.data.user.userName}</h1>

        <p className='text-slate-400 text-sm'>2 min ago ..</p></div>
       </div>

      <MdDelete />
      </div>
      


      <div className=' bg-white   rounded-4xl m-4 flex-1 flex justify-between items-center'>
        <MessageOther/>
        <MessageSelf/>
      </div>
      <div className=' bg-white rounded-4xl text-center text-2xl h-1/11 mb-4 mx-4  flex items-center space-x-10'>
       <input type="text" placeholder='type your message'  className='w-[850px] pl-13 outline-none'/>
       <IoSendSharp className=''/>
      </div>
    </div>
  )
}

export default Chat
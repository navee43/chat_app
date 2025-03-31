import React from 'react'
import { useSelector } from 'react-redux'

function MessageSelf({message,timestamp}) {

 
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
  
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
  
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
  
    return date.toLocaleString("en-GB", { 
      day: "2-digit", month: "2-digit", year: "numeric", 
      hour: "2-digit", minute: "2-digit" 
    });
  };

  var time = formatTime(timestamp)
  
    const {userInfo} = useSelector(state=>state.auth)
  return (
    <div className=' flex items-center mx-2 space-x-1 lg:space-x-4'>
     <div>
     <div className='bg-gray-600 text-white p-2 lg:p-2.5 rounded-lg max-w-xs font-semibold relative  lg:min-w-36 '>
      <p>{message} </p>
      <p className="text-[8px] lg:text-[10px] text-end" >{time}</p>
      </div>
     
     </div>
      {<img src={userInfo.data.user.image} className='rounded-[50%] size-7 lg:size-10'/>}

      
    </div>
  )
}

export default MessageSelf
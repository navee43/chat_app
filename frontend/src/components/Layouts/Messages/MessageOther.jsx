import React from 'react'
import { useSelector } from 'react-redux'

function MessageOther({message ,image , timestamp}) {
  
    const {userInfo} = useSelector(state=>state.auth)
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
    // const {chatId,chatName} =useParams();
  return (
    <div className=' flex items-center mx-2 space-x-3'>
       {<img src={image} className='rounded-[50%] size-10'/>}

     
     <div className='bg-gray-100 text-black p-2.5 rounded-lg max-w-xs font-semibold relative min-w-36 '>
      <p>{message} </p>
      <p className="text-[10px] text-end" >{time}</p>
      </div>
   
    
  </div>  
  )
}

export default MessageOther
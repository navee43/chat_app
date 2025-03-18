import React from 'react'

function ConversationItem({props}) {
  return (
    <div className='text-white text-xl font-semibold flex  justify-center items-center  p-2 bg-black rounded-4xl m-10'>
       <div className=''>
       <p className='border-1 rounded-[50%] size-14 bg-slate-200 text-black text-center flex justify-center items-center'>{props.userName[0]}</p>
      
       </div>
       <div className='flex  flex-wrap px-4'>
      <div> <p>{props.userName}</p></div>
      <div className='flex text-[18px] space-x-7'> <p>{props.lastMessage}</p>
      <p>{props.Timestamp}</p></div>
       </div>
        </div>
  )
}

export default ConversationItem
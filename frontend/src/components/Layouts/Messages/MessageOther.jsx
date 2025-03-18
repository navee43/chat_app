import React from 'react'
import { useSelector } from 'react-redux'

function MessageOther() {
    const props1 = {
        name:"you" , message:"hello boy!" , Timestamp:"12:00"
    }
    const {userInfo} = useSelector(state=>state.auth)
  return (
    <div>
        <div className='flex justify-center items-center bg-green-300 rounded-2xl px-4 py-4'>
            <div><img src={userInfo.data.user.image} alt="" className='size-8 rounded-[50%]' /></div>
           <div className='px-3'>
           <h2 className='text-[14px]'>{props1.name}</h2>
           <h1>{props1.message}</h1>
           </div>
           <p className='pt-10'>{props1.Timestamp}</p>

        </div>


    </div>
  )
}

export default MessageOther
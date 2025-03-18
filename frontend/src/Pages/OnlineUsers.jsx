import React from 'react'
import { IoSearchSharp, IoReorderThreeOutline } from "react-icons/io5";

function OnlineUsers() {
  return (
    <div className='flex-1 bg-slate-200'>
        <div className='bg-white p-3 m-3 rounded-3xl pl-12 '>
            <h1 className='text-2xl font-bold'>Online Users</h1>

        </div>
        <div className='p-2 bg-white m-3 rounded-4xl flex items-center space-x-10 mb-10'>
             <IoSearchSharp title='Search User' className='text-red-500 size-5 ' />
            <input type="text" placeholder='search User' className='text-2xl  outline-none' />

        </div>
        <div>
            <div className='bg-white rounded-4xl p-2 m-3 flex items-center space-x-8'>
                <p className='border-1 rounded-[50%] size-9 text-center text-2xl font-bold'>T</p>
                <p className='text-2xl font-bold'>Test User</p>
            </div>
            <div className='bg-white rounded-4xl p-2 m-3 flex items-center space-x-8'>
                <p className='border-1 rounded-[50%] size-9 text-center text-2xl font-bold'>T</p>
                <p className='text-2xl font-bold'>Test User</p>
            </div>
            <div className='bg-white rounded-4xl p-2 m-3 flex items-center space-x-8'>
                <p className='border-1 rounded-[50%] size-9 text-center text-2xl font-bold'>T</p>
                <p className='text-2xl font-bold'>Test User</p>
            </div>
            <div className='bg-white rounded-4xl p-2 m-3 flex items-center space-x-8'>
                <p className='border-1 rounded-[50%] size-9 text-center text-2xl font-bold'>T</p>
                <p className='text-2xl font-bold'>Test User</p>
            </div>
                

        </div>
        
    </div>
  )
}

export default OnlineUsers
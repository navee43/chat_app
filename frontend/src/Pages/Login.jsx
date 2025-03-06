import React from 'react'
import { useState } from 'react';
import { IoCamera } from "react-icons/io5";



  // Function to handle image upload
 

function Login() {

    
const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImage(imageUrl);
        }
      };

  return (
    <div className=' h-screen w-full flex items-center justify-center  bg-center bg-cover ' style={{backgroundImage:"url('https://images.unsplash.com/photo-1629131530694-c2b44f0cd901?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
        
  




 <div className=' backdrop-blur-md bg-white/30 h-[400px] w-96 rounded-md flex items-center justify-center  '>
        <form action="" className='space-y-4 ' >
            <h1 className='text-3xl font-semibold capitalize text-center '>Login</h1>
            <div className='flex flex-col space-y-1.5'>
                <label htmlFor="email" className='font-semibold' >Email</label>
                <input type="email" placeholder='your email' required id='email' className='border-2 rounded p-2 w-72' />
            </div>

            <div className='flex flex-col space-y-1.5'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input type="password" placeholder='enter password' required id='password' className='border-2 rounded p-2 w-72' />
            </div>
            <div className='flex flex-col mt-10 '>
                <button type='submit' className=' rounded p-2  mb-2 bg-gradient-to-r from-black to-white animate  hover:shadow-lg transition-all duration-300 border hover:scale-101 font-semibold text-xl'  >Login</button>
                <p className='text-center'>Don't have account ? <span className='text-white cursor-pointer font-semibold hover:text-red-700'>Register</span></p>
            </div>

        </form>
       </div> 


{/* <div className=' backdrop-blur-md bg-white/30 h-[600px] md:w-96 rounded-lg flex  items-center justify-center w-88 '>

        <form action="" className='space-y-4 ' >
            <h1 className='text-3xl font-semibold capitalize text-center '>Register</h1>


            <div className="flex items-center justify-center">

          <label htmlFor="fileInput" className="cursor-pointer relative">

            <div className="w-24 h-24 rounded-full border-2 border-gray-500 flex items-center justify-center overflow-hidden  md:border-gray-300">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600">Upload</span>
              )}
            </div>
            
            <IoCamera htmlFor='fileInput' className='absolute top-21 right-10 size-5'/>
            
          </label>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            required
          />

        </div>
            <div className='flex flex-col space-y-1.5'>
                <label htmlFor="username" className='font-semibold' >Username</label>
                <input type="username" placeholder='your username' required id='username' className='border-2 rounded p-2 w-72' />
            </div>
            <div className='flex flex-col space-y-1.5'>
                <label htmlFor="email"className='font-semibold' >Email</label>
                <input type="email" placeholder='your email' required id='email' className='border-2 rounded p-2 w-72' />
            </div>

            <div className='flex flex-col space-y-1.5'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input type="password" placeholder='enter password' required id='password' className='border-2 rounded p-2 w-72' />
            </div>

            <div className='flex flex-col mt-10 '>
                <button type='submit' className=' rounded p-2  mb-2 bg-gradient-to-r from-black to-white animate  hover:shadow-lg transition-all duration-300 border hover:scale-101 font-semibold text-xl'  >Register</button>
                <p className='text-center'>already have account ? <span className='text-white cursor-pointer font-semibold hover:text-red-700'>Login</span></p>
            </div>

        </form>
       </div>
 */}



        
 
   </div>

    
  )
}

export default Login
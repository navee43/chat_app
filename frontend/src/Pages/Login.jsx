import React from 'react'
import { useState } from 'react';
import { IoCamera } from "react-icons/io5";
import { useLoginMutation, useRegisterMutation } from '../redux/api/user.apiSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../components/Loader/Loader.jsx'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/auth/auth.slice.js';

function Login() {



const [image, setImage] = useState(null);
const [toggle  , setToggle] = useState(true);
const navigate = useNavigate()
const [userName ,setUsername] = useState("")
const [email , setEmail] = useState("")
const [password , setPassword] = useState("")


const dispatch = useDispatch();



const [LoginCall] = useLoginMutation();    
const [RegisterCall ,{isLoading}] = useRegisterMutation();


    const handleImageChange = (event) => {
        const file = event.target.files[0];
       

        setImage(file)
        // if (file) {
        //   const imageUrl = URL.createObjectURL(file);
        //   setImage(file);
        //   console.log("the image path is " , file)
        // }
      };


      const handleLogin = async(e)=>{
        e.preventDefault();
       try {
        const res = await LoginCall({ email, password }).unwrap();
        if(res){
          dispatch(setCredentials(res))
           toast.success("Login success",{
            position: "top-right",
            autoClose: 3000, 
            hideProgressBar: false, 
            closeOnClick: true, 
            pauseOnHover: true, 
            draggable: true, 
            progress: undefined, 
            theme: "dark", 
          });
            navigate('/')
        }
        
       } catch (error) {
         let errorMessage = "Login failed!"; 
            
              if (error?.data) {
                
                const isHtml = typeof error.data === "string" && error.data.includes("<html");
            
                if (isHtml) {
                 
                  const match = error.data.match(/Error:\s(.*?)<br>/);
                  if (match) {
                    errorMessage = match[1]; 
                  }
                } else if (error.data.message) {
                  errorMessage = error.data.message; 
                }
              }
            XMLDocument
              toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
                theme: "dark", 
              });
            
              // console.log("Something went wrong while sending data to API: ", error);
        console.log("there is some error while login" , error)

        
       }
      }

      const handleRegister =async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("userName" ,userName)
        formData.append("email",email)
        formData.append("password" ,password)
        formData.append("image" ,image)

        try {
            const res =  await RegisterCall(formData).unwrap();
            if(res){
               toast.success("user register successFully!",{
                position: "top-right",
                autoClose: 3000, 
                hideProgressBar: false, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: true, 
                progress: undefined, 
                theme: "dark", 
              });
                setToggle(!toggle)
                setPassword("")
                setEmail("")
                setUsername("")
                setImage("")
            }
            
        } catch (error) {
           
            let errorMessage = "register failed! ❌"; 
                
                  if (error?.data) {
                   
                    const isHtml = typeof error.data === "string" && error.data.includes("<html");
                
                    if (isHtml) {
                     
                      const match = error.data.match(/Error:\s(.*?)<br>/);
                      if (match) {
                        errorMessage = match[1]; 
                      }
                    } else if (error.data.message) {
                      errorMessage = error.data.message; 
                    }
                  }
                
                  toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000, 
                    hideProgressBar: false, 
                    closeOnClick: true, 
                    pauseOnHover: true, 
                    draggable: true, 
                    progress: undefined, 
                    theme: "dark", 
                  });

                  console.log("there is some error in registering" , error)
            
        }


      }

  return (
    <div className=' h-screen w-full flex items-center justify-center  bg-center bg-cover ' style={{backgroundImage:"url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
        
  


{
    toggle ? 

    <div className=' backdrop-blur-md bg-white/30 h-[400px] w-88 md:w-96 rounded-md flex items-center justify-center  '>
           <form  className='space-y-4 ' >
               <h1 className='text-3xl font-semibold capitalize text-center '>Login</h1>
               <div className='flex flex-col space-y-1.5'>
                   <label htmlFor="email" className='font-semibold' >Email</label>
                   <input type="email" placeholder='your email' required id='email' className='border-2 rounded p-2 w-72' value={email} onChange={(e)=>(setEmail(e.target.value))} />
               </div>
   
               <div className='flex flex-col space-y-1.5'>
                   <label htmlFor="password" className='font-semibold'>Password</label>
                   <input type="password" placeholder='enter password' required id='password' className='border-2 rounded p-2 w-72'  value={password} onChange={(e)=>(setPassword(e.target.value))}/>
               </div>
               <div className='flex flex-col mt-10 '>
                   <button type='submit' onClick={handleLogin} className=' rounded p-2  mb-2 bg-gradient-to-r from-black to-white animate  hover:shadow-lg shadow-black transition-all duration-300 border hover:scale-101 font-semibold text-xl'  >Login</button>
                   <p className='text-center'>Don't have account ? <span className='text-white cursor-pointer font-semibold hover:text-red-700' onClick={()=>{setToggle(!toggle)}}>Register</span></p>
               </div>
   
           </form>
           {isLoading && <Loader/>}
          </div> 

          :

         <div className='  backdrop-blur-md bg-white/20 h-[600px] md:w-96 rounded-lg flex  items-center justify-center w-88 '>

        <form  className='space-y-4 ' >
            <h1 className='text-3xl font-semibold capitalize text-center '>Register</h1>


            <div className="flex items-center justify-center">

          <label htmlFor="fileInput" className="cursor-pointer relative">

            <div className="w-24 h-24 rounded-full border-2 border-gray-500 flex items-center justify-center overflow-hidden  md:border-gray-300">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
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
                <input type="username" placeholder='your username' required id='username' value={userName} onChange={(e)=>setUsername(e.target.value)} className='border-2 rounded p-2 w-72' />
            </div>
            <div className='flex flex-col space-y-1.5'>
                <label htmlFor="email"className='font-semibold' >Email</label>
                <input type="email" placeholder='your email' required id='email' className='border-2 rounded p-2 w-72'  value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div className='flex flex-col space-y-1.5'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input type="password" placeholder='enter password' required id='password' className='border-2 rounded p-2 w-72' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <div className='flex flex-col mt-10 '>
                <button type='submit' onClick={handleRegister} className=' rounded p-2  mb-2 bg-gradient-to-r from-black to-white animate  hover:shadow-lg transition-all duration-300 shadow-black border hover:scale-101 font-semibold text-xl'  >Register</button>
                <p className='text-center'>already have account ? <span className='text-white cursor-pointer font-semibold hover:text-red-700' onClick={()=>{setToggle(!toggle)}}>Login</span></p>
            </div>

        </form>

        {isLoading && <Loader/>}
       </div>
 


}






        
 
   </div>

    
  )
}

export default Login
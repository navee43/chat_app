import React from 'react'
import { useState } from 'react';
import {useLoginMutation} from '../redux/api/user.apiSlice.js'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/auth/auth.slice.js';

function LandingPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const dispatch = useDispatch();
    


   const [loginApiCall , {isLoading}]= useLoginMutation()
     const handleSubmit = async(e) => {
       e.preventDefault();
       try {
         const res = await loginApiCall({ email, password }).unwrap();
         if(res){
           toast.success("Login successFully! ✅");
        //    navigate('/dashboard')
         }
         dispatch(setCredentials(res));
         // navigate("/getCurrentUser");
       } catch (error) {
        let errorMessage = "Login failed! ❌"; 
       
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
       
         toast.error(errorMessage, { position: "top-right" });
       
         console.log("Something went wrong while sending data to API: ", error);
       }
       
     };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Login
          </h2>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            {/* Password Field */}
            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full p-2 rounded text-white font-semibold ${
                email && password
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!email || !password}
            >
              Login
            </button>
          </form>
  
          {/* Signup Link */}
          <p className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:text-blue-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    );
}

export default LandingPage
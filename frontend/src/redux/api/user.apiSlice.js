import apiSlice from "./apiSlice";
import { MAIN_URL } from "../constant.js";



export const userApiSlice = apiSlice.injectEndpoints({


    endpoints:(builder)=>({



        login:builder.mutation({
            query:(data)=>({
                url:`${MAIN_URL}/login`,
                method:"post",
                body:data
            })
        })
        , Register:builder.mutation({
            query:(data)=>({
                url:`${MAIN_URL}/register`,
                method:"post",
                body:data

            })
        })
        ,
        logout:builder.mutation({

            query:()=>({
                url:`${MAIN_URL}/logout`,
                method:"post",
                

            })
        })
        ,
        getUsers:builder.query({
            query: () => `${MAIN_URL}/getusers`,
            transformResponse: (response) => {
              console.log("API Response:", response);   
              return response.data; 
            },
        })

        // , getUser:builder.query({
        //               query: () => `${MAIN_URL}/getCurrentUser`,
        //                 transformResponse: (response) => {
        //                   console.log("API Response:", response); // Log to check the structure
        //                   return response.data; // Since the jobs are inside the `data` field
        //                 },
        //            })



    })
    
})

export const {useLoginMutation ,useRegisterMutation , useLogoutMutation ,useGetUsersQuery} = userApiSlice;
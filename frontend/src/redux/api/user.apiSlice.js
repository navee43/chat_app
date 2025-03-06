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



    })
    
})

export const {useLoginMutation ,useRegisterMutation} = userApiSlice;
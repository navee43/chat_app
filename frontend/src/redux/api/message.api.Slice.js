import apiSlice from "./apiSlice.js"
import { MESSAGE_URL } from "../constant.js";




export const MessageApiSlice = apiSlice.injectEndpoints({


    endpoints:(builder)=>({
    sendMessage:builder.mutation({
        query:(data)=>({
            url:`${MESSAGE_URL}/sendmessage`,
            method:"post",
            body:data
        })
    }),

    allMessages:builder.query({
        query:(chatId)=>`${MESSAGE_URL}/${chatId}`,
        transformResponse: (response) => {
            // console.log("API Response:", response);   
            return response.data; 
          },
    })



    })

})


export const {useSendMessageMutation,useAllMessagesQuery} = MessageApiSlice;

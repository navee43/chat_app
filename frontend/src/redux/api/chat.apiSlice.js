import apiSlice from "./apiSlice";
import { CHAT_URL } from "../constant.js";






export const ChatApiSlice = apiSlice.injectEndpoints({


    endpoints:(builder)=>({



        accessChat:builder.mutation({
            query:(data)=>({
                url:`${CHAT_URL}/accessChat`,
                method:"post",
                body:data
            })
        }),
        
        fetchChat:builder.query({

           query: () => `${CHAT_URL}/fetchChats`,
                       transformResponse: (response) => {
                        //  console.log("API Response for the fetchChat query is   :", response);   
                         return response.data; 
                       },
        }),

        createGroupChat:builder.mutation({
            query:(data)=>({
                url:`${CHAT_URL}/createGroupChat`,
                method:"post",
                body:data
            })
        }),
        getGroupsChats:builder.query({
            query: () => `${CHAT_URL}/fetchGroupChat`,
            transformResponse: (response) => {
            //   console.log("API Response:", response);   
              return response.data; 
            },
        })
        ,
        addSelfToGroup:builder.mutation({
            query:(data)=>({
                url:`${CHAT_URL}/addSelfToGroup`,
                method:"put",
                body:data
            })
        }),

        deleteChat:builder.mutation({
            query:(chatId)=>({
                url: `${CHAT_URL}/${chatId}`, 
                method:"DELETE",
             

            })
        })

    })
})

export const {useAccessChatMutation ,useFetchChatQuery ,useCreateGroupChatMutation ,useDeleteChatMutation, useGetGroupsChatsQuery, useAddSelfToGroupMutation} = ChatApiSlice;
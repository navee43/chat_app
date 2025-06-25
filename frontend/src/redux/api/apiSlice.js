import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant.js";

const apiSlice = createApi({    
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL ,    
            prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.userInfo?.data?.accessToken; 
      console.log("the token that is sending by frontend is " , getState()?.auth?.userInfo?.data?.accessToken )

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    }),
endpoints:()=>({})
})


export default apiSlice
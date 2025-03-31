import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant.js";

const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL , credentials: "include"}),
    prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;  // 🔹 Retrieve token from Redux state
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);  // 🔹 Attach token
    }
    return headers;
  },
endpoints:()=>({})
})


export default apiSlice

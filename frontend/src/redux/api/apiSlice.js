import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant.js";

const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
endpoints:()=>({})
})


export default apiSlice
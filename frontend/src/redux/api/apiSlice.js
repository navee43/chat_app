import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant.js";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.userInfo?.data?.accessToken;
      console.log("❤️the token is ", token )

      if (token) {
        // console.log("🔍 Authorization header:", req.headers.authorization);

        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default apiSlice;

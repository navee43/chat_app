import { configureStore } from '@reduxjs/toolkit'
import apiSlice from './api/apiSlice.js'
import {setupListeners} from '@reduxjs/toolkit/query/react'
import authReducer from '../redux/auth/auth.slice.js'
import hideReducer from '../redux/HideMidContainerReducer/Hide.Slice.js'

const store = configureStore({

    reducer:{[apiSlice.reducerPath]:apiSlice.reducer,
        auth :authReducer,
        hide:hideReducer
    }
    ,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})


setupListeners(store.dispatch);
export default store;

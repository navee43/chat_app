import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const AuthGuard=({protectedRoute}) =>{
    const {userInfo} = useSelector(state=>state.auth)


if(protectedRoute && !userInfo){
    return  <Navigate to="/login" replace/>;
  }
  
  if(!protectedRoute && userInfo){
    return <Navigate to="/" replace/>
  }
  
    return <Outlet/>


}

export default AuthGuard
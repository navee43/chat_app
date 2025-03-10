import { Outlet } from "react-router";
import {ToastContainer} from 'react-toastify'
import HeaderLayout from '../Layouts/HeaderLayout.jsx'
import React from 'react'
import {useSelector} from 'react-redux'

function Layout() {
  const {userInfo }= useSelector(state=>state.auth)
  return (
    <>
<ToastContainer/>
{userInfo ? <HeaderLayout/>:null}
    <Outlet/>
    
    </>
  )
}

export default Layout
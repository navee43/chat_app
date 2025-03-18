import { Outlet } from "react-router";
import {ToastContainer} from 'react-toastify'
import HeaderLayout from '../Layouts/HeaderLayout.jsx'
import React from 'react'
import {useSelector} from 'react-redux'
import SideBar from "./SideBar.jsx";

function Layout() {
  const {userInfo }= useSelector(state=>state.auth)
  return (
    <div className="flex flex-1">
<ToastContainer/>
{userInfo ? <SideBar/>:null}  
{/* <SideBar/> */}
    <Outlet/>
    
    </div>
  )
}

export default Layout
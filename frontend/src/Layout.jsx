import { Outlet } from "react-router";
import {ToastContainer} from 'react-toastify'

import React from 'react'

function Layout() {
  return (
    <>
<ToastContainer/>
    <Outlet/>
    
    </>
  )
}

export default Layout
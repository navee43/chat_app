import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import SideBar from "./SideBar"
import { Outlet } from "react-router"
import MidContainer from "./MidContainer"
import Profile from "./Profile"

function Layout({hide}) {
  const {userInfo }= useSelector(state=>state.auth)

  const {isPopupHidden}= useSelector(state=>state.hide) 
  return (
    <div className="flex flex-1">
<ToastContainer/>
<div>
{userInfo ? <div className=" relative min-h-screen  grid  grid-cols-[60px_2fr]"><SideBar/> <div >{
        isPopupHidden && <Profile/>
      }
      <MidContainer/></div></div> :null}  
</div>


<div className="flex-1 ">    <Outlet/></div>
    
    
    
    </div>
    
    
  )
}
export default Layout 
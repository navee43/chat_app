import React, { useDebugValue } from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import SideBar from '../components/Layouts/SideBar'
import WorkArea from '../components/Layouts/WorkArea'
import HeaderLayout from '../components/Layouts/HeaderLayout'
import Chat from './Chat'
import WelcomePage from './WelcomePage'
import OnlineUsers from './OnlineUsers'
import CreateGroup from './createGroup'


function Home() {

  const {userInfo} = useSelector(state=> state.auth)
 
  // style={{backgroundImage:"url('https://plus.unsplash.com/premium_photo-1679548651541-7aee0870528e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
  return (
    <div className="" >
    
{/* <HeaderLayout/> */}

   {/* <SideBar/> */}
      {/* <WorkArea/> */}
      {/* <Chat/> */}
      {/* <WelcomePage/> */}

      {/* <OnlineUsers/> */}
      {/* <CreateGroup/> */}
     {/* <div className='flex '> */}
  

     {/* </div> */}
      {/* <h1 className='font-bold text-5xl'>hello</h1> */}


    
    </div>
  )
}

export default Home
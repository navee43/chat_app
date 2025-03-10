import React, { useDebugValue } from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import DropdwnMenuBtn from '../components/Buttons/DropdwnMenuBtn'
// import {logout} from '../redux/auth/auth.slice.js'
// import { useLogoutMutation } from '../redux/api/user.apiSlice.js'
// import {toast} from 'react-toastify'

function Home() {

  const {userInfo} = useSelector(state=> state.auth)
  // const [logoutCall] = useLogoutMutation();
  // const dispatch = useDispatch();
  const class1 = "h-1/2 w-1/2 bg-blue-400/80 backdrop-blur-2xl absolute top-[-18px] right-6.5"


  // const logoutHandler=async()=>{

  //  const res =  await logoutCall().unwrap()
  //  if(res){
  //   toast.success("logout success✅")
  //  }
  //   dispatch(logout())
   
  // }


  return (
    <div className="h-screen w-full bg-cover bg-center relative"  style={{backgroundImage:"url('htps://plus.unsplash.com/premium_photo-1679548651541-7aee0870528e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>


      {/* <p>  {userInfo?.data.user.userName} </p> */}
   {/* {   <DropdwnMenuBtn toggle={true} class1={class1}/>} */}

     {/* {userInfo &&  <button className='border p-2 px-10 bg-amber-600' onClick={logoutHandler}>Logout</button>} */}
    </div>
  )
}

export default Home
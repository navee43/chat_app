import React, { useRef } from 'react'
import { IoSearchSharp, IoReorderThreeOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { useSelector } from 'react-redux';
import {useGetUsersQuery} from '../../redux/api/user.apiSlice.js'
import { useState ,useEffect } from 'react';
import Loader from '../Loader/Loader.jsx'
import ConversationItem from './ConversationItem.jsx';
import { MdDarkMode } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from 'react-router';
function SideBar() {
    const {userInfo} = useSelector(state=>state.auth)
    const {data:getUsers , isLoading , isError , isSuccess} = useGetUsersQuery();

    // console.log('the user are ' , getUsers);
    
   
    const [search, setSearch] = useState(""); // Store search input
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const [Focus , setFocus] = useState(false)
    const [conversation ,setConversation] = useState([
      {
        userName:"Rao shab",
        lastMessage:"last message#1",
        Timestamp:"today"
      },
      {
        userName:"john doe",
        lastMessage:"last message#2",
        Timestamp:"today  "
      },
      {
        userName:"alex",
        lastMessage:"last message#3",
        Timestamp:"today"
      }
    ])

    const filteredUsers = getUsers?.filter(user =>
      user.userName.toLowerCase().includes(search.toLowerCase())

    );
    const menuRef = useRef();

    const blackout = ()=>{
      setFocus(true)
    }
    useEffect(() => {
        const closeBlackout = (e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setFocus(false);
          }
        };
        document.addEventListener("mousedown", closeBlackout);
        return () => document.removeEventListener("mousedown", closeBlackout);
      }, []);

  return (
    <div className={` bg-slate-700 pt-4 h-screen w-1/3 `}>

      
      <div className='bg-slate-200 rounded-4xl   h-14 flex justify-between  items-center md:mx-4 md:px-5 mx-4 px-5'>
        <img src={userInfo.data.user.image} alt="current user" className='rounded-[50%] size-10' />


       

       

         <ul className='flex space-x-10'>
               
                <Link to='/onlineusers'><li><MdPersonAddAlt1 title='Add User' className='text-red-500 size-5' /></li></Link>
               <Link to='/creategroups'> <li><IoIosAddCircle  className='text-red-500 size-5'/></li></Link>
                {/* <li><IoMdNotifications title='Notifications' className='text-red-500 size-5' /></li> */}
                <Link to='/groups'><li><HiUserGroup title='Create Group' className='text-red-500 size-5' /></li></Link>
                <li><MdDarkMode   className='text-red-500 size-5' /></li>
                
              </ul>
             

      </div> 


      <div className=' flex items-center my-2 bg-yellow-200 rounded-4xl mx-3 py-1.5 px-7'>
        <IoSearchSharp title='Search User' className='text-red-500 size-5 ' />
        <input type="text" className='p-2 px-10 outline-none' placeholder='Search' value={search}
        onChange={(e) => setSearch(e.target.value)} onClick={blackout} ref={menuRef}/>

      </div>

      {
        Focus ? <div >

  {filteredUsers?.length > 0 ? (
        filteredUsers?.map(user => (
          <div key={user._id} className='flex space-x-20 space-y-5 bg-slate-200 rounded-md  text-center'>
            
            
            <img src={user.image} alt={user.userName} className='rounded-[50%] size-12 ml-10 items-center text-center   ' />
            <h2 className='text-xl font-bold'>{user.userName}</h2>
          </div>
        ))
      ) : (
      !isLoading && <p className='text-white font-bold text-4xl text-center'>No user found</p>
      )}

    </div> : <div>
      {
        conversation.map((conver,key)=>{
          return <ConversationItem props={conver} key={key}/>
  })
      }

    </div>

    
      }

      <div className='bg-blue-700  m-4 rounded-2xl bg-slate-200 '>
       

      </div>
        
        
        </div>


  )
}

export default SideBar
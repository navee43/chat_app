import React, { useRef, useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdPersonAddAlt1, MdDarkMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery } from "../../redux/api/user.apiSlice.js";
import { useLogoutMutation } from "../../redux/api/user.apiSlice.js";
import { useFetchChatQuery } from "../../redux/api/chat.apiSlice.js";
import { toast } from "react-toastify";
import { logout } from "../../redux/auth/auth.slice.js";
import { Link, useNavigate } from "react-router-dom";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import { IoReturnUpBack } from "react-icons/io5";
import Layout from "./Layout.jsx";
import { setHideState, setPopUpState } from "../../redux/HideMidContainerReducer/Hide.Slice.js";

import { HiOutlineChatAlt } from "react-icons/hi";
function SideBar() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);

 
 

  const [logoutCall] = useLogoutMutation();
  const {isHidden} = useSelector((state) => state.hide);
  const { userInfo } = useSelector((state) => state.auth);
  const { data: getUsers, isLoading } = useGetUsersQuery();
  const { data: userChat, refetch } = useFetchChatQuery();

  const filteredUsers = getUsers?.filter((user) =>
    user.userName.toLowerCase().includes(search.toLowerCase())
  );

  const LogoutHandler = async () => {
    const res = await logoutCall().unwrap();
    if (res) {
      toast.success("Logout success");
    }
    dispatch(logout());
  };

  useEffect(() => {
    if (userChat) {
      setConversations(userChat);
    }
  }, [userChat]);


  const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 5,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  const backgroundImage = useMotionTemplate`radial-gradient(100% 510% at 50% 0%, #020617 20%, ${color})`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="overflow-x-hidden relative max-h-screen w-16  bg-center bg-cover border-r-2 border-black grid "
    >
      <div className="flex flex-col items-center justify-between my-10 ">
        <ul className="flex flex-col space-y-10 items-center">
         <Link to='/'> <li className=" "><HiOutlineChatAlt className="text-gray-100 size-6 cursor-pointer" onClick={()=>{dispatch(setHideState(!isHidden))}}  /></li></Link>
          <Link to="/onlineusers">
            <li>
              <MdPersonAddAlt1 title="Add User" className="text-gray-100 size-6" onClick={()=>{dispatch(setHideState(true))}} />
            </li>
          </Link>
          <Link to="/creategroups">
            <li>
              <IoIosAddCircle title="Create Group" className="text-gray-100 size-6" onClick={()=>{dispatch(setHideState(true))}} />
            </li>
          </Link>
          <Link to="/groups">
            <li>
              <HiUserGroup title="Available Groups" className="text-gray-100 size-6" onClick={()=>{dispatch(setHideState(true))}} />
            </li>
          </Link>
        </ul>
        <ul className="flex flex-col items-center space-y-5">
          <Link to="/login">
            <li>
              <FiLogOut className="text-gray-100 size-5 mx-2 size-6" onClick={LogoutHandler} />
            </li>
          </Link>
          <img
            src={userInfo.data.user.image}
            alt="current user"
            onClick={() => dispatch(setPopUpState(true))}
            className="cursor-pointer h-9 w-9 rounded-full border border-gray-600"
          />
        </ul>
      </div>
     


    </motion.section>
  );
}

export default SideBar;

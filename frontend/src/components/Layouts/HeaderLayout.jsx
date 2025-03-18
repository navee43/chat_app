import React, { useState, useRef, useEffect } from 'react';
import { IoSearchSharp, IoReorderThreeOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/auth.slice.js';
import { useLogoutMutation } from '../../redux/api/user.apiSlice.js';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function HeaderLayout() {
  const [logoutCall] = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const LogoutHandler = async () => {
    const res = await logoutCall().unwrap();
    if (res) {
      toast.success("Logout successful ✅");
    }
    dispatch(logout());
  };

  // Close menu when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  return (
    <div className='w-full h-16 bg-black backdrop-blur-sm flex justify-between items-center md:px-10 px-5 relative '>
      {/* Logo */}
      <p className='text-red-500 text-2xl shadow-2xl shadow-red-600'>LinkUp</p>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex space-x-10'>
        <li><IoSearchSharp title='Search User' className='text-red-500 size-5' /></li>
        <li><MdPersonAddAlt1 title='Add User' className='text-red-500 size-5' /></li>
        <li><IoMdNotifications title='Notifications' className='text-red-500 size-5' /></li>
        <li><HiUserGroup title='Create Group' className='text-red-500 size-5' /></li>
        <li><FiLogOut title='Logout' className='text-red-500 size-5 cursor-pointer' onClick={LogoutHandler} /></li>
      </ul>

      {/* Mobile Menu Button */}
      <IoReorderThreeOutline
        className='flex md:hidden text-red-600 size-10 cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul
          ref={menuRef}
          className="absolute top-14 right-5 bg-black/80 z-[100] w-48 rounded-lg shadow-lg flex flex-col"
        >
          <li>
            <Link
              to="/search"
              onClick={() => setIsOpen(false)}
              className="text-red-700 text-lg font-bold flex items-center px-4 py-2 hover:bg-slate-500 active:bg-slate-600"
            >
              <IoSearchSharp className="text-red-700 size-5 mx-2" /> Search
            </Link>
          </li>

          <li>
            <Link
              to="/adduser"
              onClick={() => setIsOpen(false)}
              className="text-red-700 text-lg font-bold flex items-center px-4 py-2 hover:bg-slate-500 active:bg-slate-600"
            >
              <MdPersonAddAlt1 className="text-red-700 size-5 mx-2" /> Add User
            </Link>
          </li>

          <li>
            <Link
              to="/notification"
              onClick={() => setIsOpen(false)}
              className="text-red-700 text-lg font-bold flex items-center px-4 py-2 hover:bg-slate-500 active:bg-slate-600"
            >
              <IoMdNotifications className="text-red-700 size-5 mx-2" /> Notification
            </Link>
          </li>

          <li>
            <Link
              to="/create"
              onClick={() => setIsOpen(false)}
              className="text-red-700 text-lg font-bold flex items-center px-4 py-2 hover:bg-slate-500 active:bg-slate-600"
            >
              <HiUserGroup className="text-red-700 size-5 mx-2" /> Create Group
            </Link>
          </li>

          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                LogoutHandler();
              }}
              className="text-red-700 text-lg font-bold flex items-center w-full px-4 py-2 hover:bg-slate-500 active:bg-slate-600"
            >
              <FiLogOut className="text-red-700 size-5 mx-2" /> Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default HeaderLayout;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useFetchChatQuery } from "../../redux/api/chat.apiSlice";
import { setPopUpState } from "../../redux/HideMidContainerReducer/Hide.Slice";
import { RxCross2 } from "react-icons/rx";

function Profile( ) {

const {isPopupHidden}= useSelector(state=>state.hide)
const {userInfo} = useSelector(state=>state.auth)
const dispatch = useDispatch();

  return (
   
         
         <div className="">
    
    {isPopupHidden && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50">
                <div className="bg-white/10 backdrop-blur-lg text-white text-4xl p-6 rounded-lg shadow-lg relative w-92 lg:w-1/3">
                {/* <p className='uppercase text-xl lg:text-3xl font-bold pb-10 text-center'>{userInfo?.data?.user?.userName}</p> */}
                  
                  <button 
                    onClick={() => dispatch(setPopUpState(false))} 
                    className="absolute top-2 right-4 text-white text-2xl"
                  >
                    <RxCross2  className="cursor-pointer"/>
                  </button>
      
                  <ul className="h-96  flex  flex-col justify-center items-center space-y-11">
                  <img src={userInfo?.data?.user?.image} alt=""  className="w-30 h-30 rounded-[50%]"/>
                  <p className="text-2xl lg:text-3xl">Username : {userInfo?.data?.user?.userName}</p>
                  <p className="text-2xl lg:text-3xl">email : {userInfo?.data?.user?.email}</p>
                 
                  
                  </ul>
                </div>
              </div>
    )}
  </div>
       

   
  );
}

export default Profile;



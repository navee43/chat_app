import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function Layout() {
  const { userInfo } = useSelector((state) => state.auth);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="flex flex-1 h-screen">
      {userInfo && !showChat && <SideBar setShowChat={setShowChat} />}
      <div className={`flex-1 ${!showChat ? "hidden lg:block" : "block w-full"}`}>
        <Outlet context={{ setShowChat }} />
      </div>
    </div>
  );
}

export default Layout;

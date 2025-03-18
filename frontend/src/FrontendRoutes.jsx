import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../src/components/Layouts/Layout.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import { lazy } from "react";
import ProtectedRoutes from "./utils/AuthGuard.jsx";
import AuthGuard from "./utils/AuthGuard.jsx";
import OnlineUsers from "./Pages/OnlineUsers.jsx";
import WelcomePage from "./Pages/WelcomePage.jsx";
import CreateGroup from "./Pages/createGroup.jsx";
const Home = lazy(()=>import('../src/Pages/Home.jsx'))
const Login = lazy(()=>import('../src/Pages/Login.jsx'))
const Chat = lazy(()=>import('../src/Pages/Chat.jsx'))
const Groups = lazy(()=>import('../src/Pages/Groups.jsx'))

const frontRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>

         <Route element={<AuthGuard protectedRoute={false}/>}>
           <Route path="/login" element={<Login/>}/>
         </Route>
           

           <Route element={<AuthGuard protectedRoute={true}/>}>
           <Route index element={<WelcomePage/>} />
            <Route path="chat/:chatId" element={<Chat/>}/>
            <Route path="groups" element={<Groups/>}/> 
            <Route path="onlineusers" element={<OnlineUsers/>}/>
            <Route path="creategroups" element={<CreateGroup/>}/> 
            <Route path="groups" element={<Groups/>}/> 
            

           </Route>

        </Route>
        
        
    )
);

export default frontRoutes;


// const frontRoutes = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Layout />}>
//         <Route index element={<LandingPage />} />
//       </Route>
//     )
//   );
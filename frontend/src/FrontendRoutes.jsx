import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../src/components/Layouts/Layout.jsx";
import { lazy } from "react";
import ProtectedRoutes from "./utils/AuthGuard.jsx";
import AuthGuard from "./utils/AuthGuard.jsx";
import PendingRequests from "./Pages/PendingRequests.jsx";
import SendRequest from "./Pages/SendRequest.jsx";
const Login = lazy(()=>import('../src/Pages/Login.jsx'))
const Chat = lazy(()=>import('../src/Pages/Chat.jsx'))
const Groups = lazy(()=>import('../src/Pages/Groups.jsx'))
const CreateGroup= lazy(()=>import('./Pages/CreateGroup.jsx'))
const WelcomePage = lazy(()=>import('./Pages/WelcomePage.jsx'))
const OnlineUsers = lazy(()=>import('./Pages/OnlineUsers.jsx'))

const frontRoutes = createBrowserRouter(
    createRoutesFromElements(

      
        <Route path="/" element={<Layout />}>
         <Route element={<AuthGuard protectedRoute={false}/>}>
           <Route path="/login" element={<Login/>}/>
         </Route>
           

           <Route element={<AuthGuard protectedRoute={true}/>}>
           <Route index element={<WelcomePage/>} />
            <Route path="/chat/:chatId/:chatName" element={<Chat/>}/>
            <Route path="groups" element={<Groups/>}/> 
            <Route path="onlineusers" element={<OnlineUsers/>}/>
            <Route path="creategroups" element={<CreateGroup/>}/> 
            {/* <Route path="groups" element={<Groups/>}/>  */}
            {/* <Route path="req" element={<PendingRequests/>}/>
            <Route path="send" element={<SendRequest/>}/> */}
            

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
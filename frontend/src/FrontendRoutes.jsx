import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import { lazy } from "react";
const Home = lazy(()=>import('../src/Pages/Home.jsx'))
const Login = lazy(()=>import('../src/Pages/Login.jsx'))
const Chat = lazy(()=>import('../src/Pages/Chat.jsx'))
const Groups = lazy(()=>import('../src/Pages/Groups.jsx'))

const frontRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/chat/:chatId" element={<Chat/>}/>
            <Route path="/groups" element={<Groups/>}/> 

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
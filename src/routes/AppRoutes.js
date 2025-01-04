import React, { Suspense } from "react";
import {HashRouter as Router, Routes, Route,} from "react-router-dom";
import Login from '../pages/Login/Login'
import SingUp from '../pages/Singup/Singup'
import Sidebar from '../components/navbar/SideBar'
import LinkVerfication from "../components/LinkVerification/LinkVerification";


const AppRoute = () => {
    return (
      <>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
            <Route exact path="/Users/EmailActivation/:u/:o" element={<LinkVerfication />} />
            <Route exact path="/SingUp" element={<SingUp />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/MainDashboard/*" element={<Sidebar />} />
            <Route exact path="*" element={<Login />} />
            </Routes>
          </Suspense>
        </Router>
      </>
    );
  };
  
  
  export default AppRoute;
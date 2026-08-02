import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Profile from "../pages/Profile";
import ReviewCode from "../pages/ReviewCode";
import Documentation from "../pages/Documentation";
// import PageNotFound from "../pages/PageNotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Monaco editor setup */}
       <Route path="/reviewcode" element={<ReviewCode/>}/>

       {/* documentation page */}
       <Route path="/documentation" element={<Documentation/>}/>
        {/* 404 page not found */}
        
      </Route>
    </Routes>
  );
}
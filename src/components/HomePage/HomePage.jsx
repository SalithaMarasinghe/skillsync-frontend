import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import Profile from "../Profile/Profile";
import { Route, Routes } from "react-router-dom";
import PostDetails from "../PostDetails/PostDetails";


const HomePage = () => {
  return (
    <div className="flex">
      {/* Left part (navigation) */}
      <div className="w-1/4 ml-10 ">
        {" "}
        <Navigation />
      </div>

      {/* Middle part */}
      <div className="w-1/2">
        <HomeSection />
        <Routes>
          <Route path="/" element={<HomeSection/>}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/post/:id" element={<PostDetails />}></Route>

        </Routes>

      </div>

      {/* Right part */}
      <div className="w-1/4">
        <p className="text-center">right part</p>
      </div>
    </div>
  );
};

export default HomePage;

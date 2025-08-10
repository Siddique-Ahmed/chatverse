import React from "react";
import { Outlet } from "react-router-dom";
import Asidebar from "../components/chatverse/Asidebar";

const MainLayout = () => {
  return (
    <div className="flex relative w-full h-screen">
      <Asidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

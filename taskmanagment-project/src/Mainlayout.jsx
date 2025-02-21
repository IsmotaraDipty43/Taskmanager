import React from "react";
import Sidebar from "./Component/Sidebar";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
   <div className="w-full">
    

      {/* Main Content Section */}
      <div className="">
        <Outlet />
      </div>
    </div>

  );
};

export default Mainlayout;

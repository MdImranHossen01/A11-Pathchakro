import React from "react";
import CreateAssignment from "../CreateAssignment/CreateAssignment";
import { Outlet } from "react-router";
import UserDashboard from "./UserDashboard";

const DashBoardLayout = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
      {/* Side menu */}
      <div className="col-span-1 lg:col-span-3 bg-base-200 p-4">
        <UserDashboard />
      </div>
      {/* Children */}
      <div className="col-span-1 lg:col-span-9 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
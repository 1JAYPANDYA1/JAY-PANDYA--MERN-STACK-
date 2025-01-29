import React from "react";
import Sidebar from "./SideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
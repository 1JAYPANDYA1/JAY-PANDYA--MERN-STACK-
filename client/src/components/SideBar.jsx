import React, { useState } from "react";
import { Menu, X, Home, User, Package, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate("/"+route)
    console.log(`Navigating to ${route}`);
  };

  const handleLogout = () => {
    dispatch(logOutUser())
    navigate("/login")    
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { icon: <Home size={20} />, label: "Home", action: () => handleNavigate("") },
    { icon: <User size={20} />, label: "Profile", action: () => handleNavigate("profile") },
    { icon: <Package size={20} />, label: "Product Management", action: () => handleNavigate("products") }
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-900 p-2 rounded-lg text-white hover:bg-blue-800 transition-colors"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed md:static inset-y-0 left-0 w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out z-40 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 border-b border-blue-800">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-300 mt-1">Welcome, Admin</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="flex items-center w-full gap-3 px-4 py-2.5 text-left hover:bg-blue-800 rounded transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-4 py-2.5 mt-8 text-left bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};
export default Sidebar
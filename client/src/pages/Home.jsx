import React from "react";
import { useSelector } from "react-redux";
import AdminLayout from "../components/AdminLayout";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <AdminLayout>
      <div className="h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome {user?.name}!
          </h1>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Home;

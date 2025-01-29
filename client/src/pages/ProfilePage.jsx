import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData, updateUser } from "../redux/authSlice";
import { toast } from 'react-toastify';
import AdminLayout from "../components/AdminLayout";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        password: user.password || "",
        name: user.name || "",
        mobilenumber: user.mobilenumber || "",
        message: ""
      });
    }
  }, [user]);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.password !== formData?.password) {
      if (!validatePassword(formData.password)) {
        toast.error('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character.');
        return;
      }
    }

    if (!validateMobileNumber(formData.mobilenumber)) {
      toast.error('Mobile number must be 10 digits long and start with 6, 7, 8, or 9.');
      return;
    }

    const updatedFormData = {
      ...formData,
      message: user.password !== formData.password ? "password changed" : ""
    };

    const result = await dispatch(updateUser(updatedFormData));
    
    if (result.payload?.success) {
      toast.success(result.payload?.message);
      setIsEditing(false);
    } else {
      toast.error(result.payload?.message);
    }
  };

  if (loading || !formData) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-20">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">User Profile</h2>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  name="mobilenumber"
                  value={formData.mobilenumber}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="text-red-500 font-medium hover:underline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <table className="min-w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="font-medium text-gray-700 py-3">Email:</td>
                  <td className="py-3">{formData.email}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="font-medium text-gray-700 py-3">Password:</td>
                  <td className="py-3">••••••••</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="font-medium text-gray-700 py-3">Name:</td>
                  <td className="py-3">{formData.name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="font-medium text-gray-700 py-3">Mobile Number:</td>
                  <td className="py-3">{formData.mobilenumber}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProfilePage;

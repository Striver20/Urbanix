import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        setIsEditing(false); // Exit edit mode after successful update
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Cancel editing and reset form
  const handleCancelEdit = () => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setPassword("");
    setIsEditing(false);
  };
  return (
    <div className="w-full">
      {/* Simple Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isEditing ? "Edit Profile" : "Profile"}
        </h1>
        <p className="text-gray-600">
          {isEditing
            ? "Update your account information"
            : "Manage your personal information"}
        </p>
      </div>

      {!isEditing ? (
        /* Profile View Mode */
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Your account details and contact information
              </p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Profile
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">
                    Full Name
                  </span>
                </div>
                <p className="text-lg text-gray-900 font-medium">
                  {auth?.user?.name || "Not provided"}
                </p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">
                    Email Address
                  </span>
                </div>
                <p className="text-lg text-gray-900 font-medium">
                  {auth?.user?.email || "Not provided"}
                </p>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">
                    Phone Number
                  </span>
                </div>
                <p className="text-lg text-gray-900 font-medium">
                  {auth?.user?.phone || "Not provided"}
                </p>
              </div>

              {/* Address */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">
                    Address
                  </span>
                </div>
                <p className="text-lg text-gray-900 font-medium">
                  {auth?.user?.address || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Personal Information
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Update your personal details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="inputName"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  <svg
                    className="w-4 h-4 inline mr-2 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  id="inputName"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label
                  htmlFor="inputEmail"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  <svg
                    className="w-4 h-4 inline mr-2 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email || ""}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed text-gray-600"
                  id="inputEmail"
                  placeholder="Enter your email"
                  disabled
                />
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Email cannot be changed for security reasons
                </p>
              </div>

              {/* Password */}
              <div className="md:col-span-2">
                <label
                  htmlFor="inputPassword"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  <svg
                    className="w-4 h-4 inline mr-2 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  id="inputPassword"
                  placeholder="Leave blank to keep current password"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="inputPhone"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  <svg
                    className="w-4 h-4 inline mr-2 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone || ""}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  id="inputPhone"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="inputAddress"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  <svg
                    className="w-4 h-4 inline mr-2 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Address
                </label>
                <textarea
                  value={address || ""}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                  id="inputAddress"
                  placeholder="Enter your full address"
                  rows="4"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="sm:w-auto px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;

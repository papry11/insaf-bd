import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        // Set token in localStorage and in parent state
        localStorage.setItem("authToken", response.data.token);
        setToken(response.data.token);

        toast.success("Login successful!");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Server error. Try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 w-full">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              type="email"
              className="rounded-md w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3 w-full">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              type="password"
              className="rounded-md w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full  px-12 py-3 rounded-full font-semibold text-white text-lg
          bg-gradient-to-r from-[#9b5fa0] to-[#7f3f85] 
          shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

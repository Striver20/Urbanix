import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOtp();
  };

  const handleOtp = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/auth/send-otp`,
        { emailAddress }
      );
      setMessage(res.data.message);
      console.log(res.data);
    } catch (err) {
      console.log("Error sending request to OTP Controller:", err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/auth/verify-otp`,
        { emailAddress, otp }
      );
      if (res.status === 200) {
        console.log("OTP Verified");
      } else {
        console.error("Incorrect OTP");
        setMessage("Incorrect OTP");
      }
    } catch (err) {
      console.log("Error verifying OTP:", err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-400">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="font-bold text-2xl mb-4">
          Log in or sign up to continue
        </h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="emailAddress" className="mb-2">
            Enter Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <p className="mb-4 text-sm">
          By proceeding you confirm that you agree to our{" "}
          <strong>Privacy Policy and Terms of Use</strong>.
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Get OTP
        </button>
        {message && <p className="mt-4">{message}</p>}
        <div className="flex flex-col mb-4 mt-4">
          <label htmlFor="otp" className="mb-2">
            Enter OTP
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          onClick={verifyOtp}
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import { auth } from "../pages/config/firebase";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

export default function EmailOtpLogin() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };

  const sendOtp = async () => {
    if (!email) return setMessage("Please enter your email");

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("OTP link sent! Check your email.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const verifyOtp = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailFromStorage = window.localStorage.getItem("emailForSignIn");
      try {
        const result = await signInWithEmailLink(
          auth,
          emailFromStorage,
          window.location.href,
        );
        window.localStorage.removeItem("emailForSignIn");
        setMessage(`Welcome ${result.user.email}!`);
      } catch (err) {
        setMessage(err.message);
      }
    } else {
      setMessage("Invalid or expired OTP link.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Login / OTP</h2>
        <input
          type="email"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={sendOtp}
          className="w-full bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-700 transition"
        >
          Send OTP
        </button>
        <button
          onClick={verifyOtp}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Verify OTP
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}

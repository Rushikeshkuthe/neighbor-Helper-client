import React, { useState } from "react";
import register from "../assets/register.jpg";
import { useNavigate } from "react-router-dom";
import { apiPOST } from "../../utils/apiHelpers";
import { motion } from "framer-motion";

const Register = () => {
  const [formvalue, setFormvalue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return regex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formvalue.password !== formvalue.confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    if (!validatePassword(formvalue.password)) {
      setError(
        "Password must be at least 7 chars long & contain uppercase, lowercase, number, and special char ❌"
      );
      return;
    }

    setError("");

    try {
      const { username, email, password } = formvalue;
      const response = await apiPOST(`v1/auth/register`, {
        email,
        username,
        password,
      });

      if (response.data.status === 201) {
        setFormvalue({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } 
      else {
        setError(  "Registration failed ❌");
      }
    } catch (err) {
      if (err.response && err.response.data?.msg === "User already registered") {
        setError("⚠️ User already registered with this email.");
      } else {
        setError("An error occurred during signup, try again ❌");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white shadow-2xl rounded-2xl grid md:grid-cols-2 overflow-hidden max-w-5xl w-full"
      >
        {/* left image */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <img
            src={register}
            alt="register"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* right form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center bg-gray-50 p-10"
        >
          <h1 className="text-4xl font-bold text-indigo-800 mb-6 text-center">
            Create Account
          </h1>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-teal-600 font-medium">Name</label>
              <input
                name="username"
                type="text"
                value={formvalue.username}
                onChange={handleInputChanges}
                placeholder="Enter your name"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-teal-600 font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formvalue.email}
                onChange={handleInputChanges}
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-teal-600 font-medium">Password</label>
              <input
                name="password"
                type="password"
                value={formvalue.password}
                onChange={handleInputChanges}
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-teal-600 font-medium">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formvalue.confirmPassword}
                onChange={handleInputChanges}
                placeholder="Confirm your password"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-indigo-800 hover:bg-indigo-700 transition text-white rounded-lg p-3 font-semibold"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-4 text-center text-gray-700">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;

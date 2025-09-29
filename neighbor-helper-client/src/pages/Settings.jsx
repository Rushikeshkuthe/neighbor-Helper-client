import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { apiPUT } from "../../utils/apiHelpers";

const Setting = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await apiPUT(`v1/auth/update/${userId}`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      if (response.status === 200) {
        setSuccess("Profile has been updated successfully!");
      } else {
        setError(response.data?.msg || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("Something went wrong");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-full flex items-start justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 p-6">
        <div className="bg-gray-100 rounded-3xl w-full max-w-4xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center md:text-left">
            Settings
          </h1>

          {/* Success / Error Messages */}
          {success && <p className="text-green-600 mb-4">{success}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-indigo-700 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your new username"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-indigo-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your new email"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-indigo-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your new password"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-indigo-700 font-medium mb-2">Wallet Address</label>
              <input
                type="text"
                disabled
                placeholder="451278956552"
                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleUpdate}
              className="bg-indigo-800 hover:bg-indigo-900 text-white font-semibold px-8 py-3 rounded-2xl transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Setting;


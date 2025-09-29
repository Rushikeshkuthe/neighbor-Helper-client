

import React, { useEffect, useState, useRef } from "react";
import { BiBell } from "react-icons/bi";
import { motion } from "framer-motion";
import { apiGET } from "../../utils/apiHelpers";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [notifiedTaskIds, setNotifiedTaskIds] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const curUserId = currentUser?.id;

  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const response = await apiGET(`v1/task/getAllTask`);
        if (response.data.status === 200) {
          const allTasks = response.data.data;
          const pendingTasks = allTasks.filter(
            (t) => t.userId === curUserId && t.status === "pending"
          );

          const newTasks = pendingTasks.filter(
            (t) => !notifiedTaskIds.includes(t._id)
          );

          if (newTasks.length > 0) {
            setNotifications((prev) => [...prev, ...newTasks]);
            setNotifiedTaskIds((prev) => [...prev, ...newTasks.map((t) => t._id)]);
          }
        }
      } catch (error) {
        console.error("Unable to fetch tasks", error);
      }
    };

    fetchPendingTasks(); 
    const interval = setInterval(fetchPendingTasks, 10000);
    return () => clearInterval(interval);
  }, [curUserId, notifiedTaskIds]);

  return (
    <motion.header className="flex items-center justify-end px-6 py-3 shadow-md bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 gap-2">

      <div className="relative" ref={dropdownRef}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-white cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <BiBell size={24} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </motion.div>

          {showDropdown && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
              <h3 className="font-semibold text-gray-700 p-2 border-b">Notifications</h3>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((task) => (
                    <div
                      key={task._id}
                      className="p-2 border-b cursor-pointer hover:bg-gray-100"
                    >
                      <p className="text-gray-800 font-medium">{task.title}</p>
                      <p className="text-gray-500 text-sm">Task has been accepted</p>
                    </div>
                  ))
                ) : (
                  <p className="p-2 text-gray-500 text-sm">No notifications</p>
                )}
              </div>
            </div>
          )}
        </div>
      {/* Links */}
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-4 font-medium text-white">
          <motion.a
            href="/createtask"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl border border-white px-3 py-1 hover:bg-white hover:text-indigo-800 transition-colors"
          >
            Create Task
          </motion.a>
          <motion.a
            href="/postedTask"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl border border-white px-3 py-1 hover:bg-white hover:text-indigo-800 transition-colors"
          >
            Posted Task
          </motion.a>
        </nav>

      </div>
    </motion.header>
  );
};

export default Navbar;

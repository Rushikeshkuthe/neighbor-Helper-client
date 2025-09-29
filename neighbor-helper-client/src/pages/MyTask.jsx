import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { apiGET } from "../../utils/apiHelpers";
import { motion } from "framer-motion";

const MyTask = () => {
  const userDate = JSON.parse(localStorage.getItem("user"));
  const userId = userDate?.id;

  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Newest");
  const [mytask, setMytask] = useState([]);

  async function fetchMyTask() {
    try {
      const response = await apiGET(`v1/task/getTaskbyAccepterId/${userId}`);
      setMytask(response.data.data);
    } catch (error) {
      console.error("Error while fetching my task", error);
    }
  }

  useEffect(() => {
    fetchMyTask();
  }, []);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 p-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="bg-gray-100 rounded-3xl w-full max-w-7xl p-6 shadow-2xl"
        >
          <h1 className="text-4xl font-bold mb-6 text-indigo-800 text-center md:text-left">
            My Tasks
          </h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Newest">Latest Task</option>
              <option value="Oldest">Old Task</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <motion.table
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              className="table-auto w-full border-collapse bg-white"
            >
              <thead>
                <tr className="bg-indigo-600 text-white text-left">
                  <th className="p-3">Title</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Rewards</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {mytask.map((task, index) => (
                  <motion.tr
                    key={index}
                    variants={rowVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="cursor-pointer"
                  >
                    <td className="p-3 font-medium">{task.title}</td>
                    <td className="p-3">{task.username}</td>
                    <td className="p-3">{task.address}</td>
                    <td className="p-3 text-green-600 font-semibold">₹{task.reward}</td>
                    <td
                      className={`p-3 font-bold ${
                        task.status === "completed" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          task.status === "completed" ? "bg-green-100" : "bg-yellow-100"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="p-3">{formattedDate(task.createdAt)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default MyTask;

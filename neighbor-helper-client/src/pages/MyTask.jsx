import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";

const MyTask = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Newest");

  const tasks = [
    {
      title: "Fix WiFi Router",
      name: "Rahul Sharma",
      location: "Nagpur, India",
      reward: "₹500",
      status: "Pending",
      date: "2025-02-05",
    },
    {
      title: "Carpool Needed",
      name: "Anjali Verma",
      location: "Mumbai, India",
      reward: "₹1500/month",
      status: "Completed",
      date: "2025-02-01",
    },
    {
      title: "Grocery Pickup",
      name: "Amit Singh",
      location: "Pune, India",
      reward: "₹200",
      status: "Pending",
      date: "2025-02-06",
    },
  ];

  const filterTask = tasks
    .filter((task) => {
      return statusFilter === "All" ? true : task.status === statusFilter;
    })
    .sort((a, b) => {
      if (dateFilter === "Newest") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  return (
    <MainLayout>
      <div class="p-6 bg-gray-300 rounded-3xl min-h-screen">
        <h1 class="text-3xl font-bold text-indigo-800 mb-6">My Task</h1>

        <div class="flex flex-wrap gap-4 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            class="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            class="border rounded-lg focus:ring focus:ring-indigo-500 p-2"
          >
            <option value="Newest">Latest Task</option>
            <option value="Oldest">Old Task</option>
          </select>
        </div>
        {/* Table */}
        <div class="overflow-x-auto rounded-lg">
          <table class="table-fixed w-full border-collapse  bg-white shadow-md ">
            <thead>
              <tr class="bg-indigo-600 text-white text-left">
                <th class="p-3">Title</th>
                <th class="p-3">Name</th>
                <th class="p-3">Location</th>
                <th class="p-3">Rewards</th>
                <th class="p-3">Status</th>
                <th class="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
                {filterTask.map((task,index)=>(
                    <tr key={index}
                    class=" hover:bg-gray-100 transition"
                    >
                    <td class="p-3 font-medium">{task.title}</td>
                    <td class="p-3">{task.name}</td>
                    <td class="p-3">{task.location}</td>
                    <td class="p-3 text-green-600 font-semibold">{task.reward}</td>
                    <td class={`p-3 font-bold ${task.status==="Completed"?"text-green-600":"text-yellow-600"}`}>
                        {task.status}
                    </td>
                    <td class="p-3">{task.date}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};
export default MyTask;

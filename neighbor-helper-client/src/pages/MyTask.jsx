import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { apiGET } from "../../utils/apiHelpers";

const MyTask = () => {

  const userDate = JSON.parse(localStorage.getItem('user'))
  const userId = userDate?.id

  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Newest");

  const [mytask,setMytask]= useState([])
  async function fetchMyTask(){
    try{
      const response = await apiGET(`v1/task/getTaskbyAccepterId/${userId}`)
      setMytask(response.data.data)
      console.log("response--->",response.data.data)
    }catch(error){
      console.error("Error while fetching my task",error)
    }
  }

  useEffect(()=>{
    fetchMyTask()
  },[])

   const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");      
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const year = date.getFullYear();                           
  return `${day}/${month}/${year}`;
};


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
            // value={dateFilter}
            // onChange={(e) => setDateFilter(e.target.value)}
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
                {mytask.map((task,index)=>(
                    <tr key={index}
                    class=" hover:bg-gray-100 transition"
                    >
                    <td class="p-3 font-medium">{task.title}</td>
                    <td class="p-3">{task.username}</td>
                    <td class="p-3">{task.address}</td>
                    <td class="p-3 text-green-600 font-semibold">{task.reward}</td>
                    <td class={`p-3 font-bold ${task.status==="completed"?"text-green-600":"text-yellow-600"}`}>
                        {task.status}
                    </td>
                    <td class="p-3">{formattedDate(task.createdAt)}</td>
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

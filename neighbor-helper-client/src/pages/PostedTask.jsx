import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { apiGET } from "../../utils/apiHelpers";
import TaskCard from "../component/TaskCard";

const PostedTask = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const curUserId = currentUser?.id;
  const navigate = useNavigate();
  const [task, setTask] = useState([]);

  async function getAllTask() {
    try {
      const response = await apiGET(`v1/task/getAllTask`);
      if (response.data.status === 200) {
        const allTasks = response.data.data;
        const filteredTask = allTasks.filter((t) => t.userId === curUserId);
        setTask(filteredTask);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Unable to fetch task", error);
    }
  }


  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    getAllTask();
  }, []);

  const handleAccept=(task)=>{
      navigate(`/payment/${task._id}`, {
    state: {
      acceptedUserId: task.acceptedUserId,
      reward: task.reward
    }
  });
  }


  return (
    <MainLayout>
      <div class="p-6 bg-gray-300 rounded-3xl min-h-screen w-full">
        <div class="flex flex-1 flex-col">
          <main class="flex-1 p-6">
            <h1 class="text-4xl font-bold mb-4 text-indigo-800 ">
              Posted Task
            </h1>
            <div class="md:grid-cols-3 lg:grid-cols-2 gap-6 grid">
                {task.map((t,index)=>(
                    <TaskCard
                   title={t.title}
                   date={formattedDate(t.createdAt)}
                    description={t?.description}
                    location={t.address}
                    reward={t.reward}
                    onAccept={()=>handleAccept(t)} //pura task bhej dia
                    context="posted"
                   />
                ))}
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostedTask;

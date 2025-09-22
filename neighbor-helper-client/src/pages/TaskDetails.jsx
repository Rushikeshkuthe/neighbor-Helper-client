import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { apiGET } from "../../utils/apiHelpers";

const TaskDetail=()=>{
    const [taskId,setTaskId]=useState()
    const [task,setTask] = useState()

    useEffect(()=>{
        if(!taskId){
                return
        }
        async function fetchTask() {
            try{
                const response = await apiGET(`v1/task/getTaskById/${taskId}`)
                console.log("response",response.data.data)
                if(response.status===200){
                    setTask(response.data.data)
                }else{
                    console.error("Something Went Wrong")
                }
            }catch(error){
                console.error("Error fetching Task",error)
            }
        }
        fetchTask()
    },[taskId])

return(
    <MainLayout>
    <div class="p-6 bg-gray-300 rounded-3xl min-h-screen w-full">
        <h1 class="text-3xl font-bold text-indigo-800 mb-5">Task Details</h1>

        <h1 class="text-2xl font-bold mb-2 text-gray-700">
            {task.title}
        </h1>

        <p class="text-gray-600">Posted By : <span class="font-semibold">{task.owner.name}</span></p>
        <p class="text-yellow-500">⭐ {task.owner.rating}</p>

        <div class="mb-4">
            <h2 class="text-lg font-semibold mb-1">Description</h2>
            <p class="text-gray-600">{task.description}</p>
        </div>

        <div class="mb-4">
            <h2 class="text-lg font-semibold mb-1">Address</h2>
            <p class="text-gray-600">{task.address}</p>
        </div>

        <div mb-4>
            <h2 class="text-lg font-semibold mb-1">Location</h2>
            <div class="w-full h-64 bg-gray-800 flex items-center justify-center rounded">
                <span class="text-gray-400">[Map Intigration Here]</span>
            </div>
        </div>

            <div class="flex mt-4 gap-2">
                <button class="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 font-semibold text-white" onClick={handleAccept}>
                Accept Task
                </button>
                 <button class="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 font-semibold text-white"
                 onClick={handleChat}
                 >
              Chat with Requester
                </button>
            </div>
    </div>

    </MainLayout>
)}

export default TaskDetail

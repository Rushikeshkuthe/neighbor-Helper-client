import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { apiPOST } from "../../utils/apiHelpers";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    reward:""
  });
  const [error,setError]=useState('')
  const handlechange = (e) => {
    const {name,value} = e.target
    setTask({ ...task, [name]: value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{

      const token = localStorage.getItem('token')

      const payload = {
        title : task.title,
        description:task.description,
        reward:task.reward
      } 

        const response =await fetch(`http://localhost:3001/v1/task/createTask`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
          },
          body:JSON.stringify(payload),
        })
        console.log(response.data.data)
        if(response.data.status===201){
          setTask({
            title:'',
            description:'',
            reward:''
          })
        }else{
          setError("fail to create task")
        }

    }catch(error){
      console.error("error occured during creating the task")
    }
  };

  return (
    <MainLayout>
      <div class=" flex flex-col min-h-screen rounded-3xl bg-gray-300">
       
          <h1 class="text-4xl font-bold text text-indigo-800 mb-6 p-6">
          Post New Task
        </h1>
       
        <div class="flex items-center justify-center w-1/2 m-6">
        <form class="   shadow-lg w-full rounded-xl p-6" onSubmit={handleSubmit}>
            <div>
                <label class="block font-medium text-gray-700">Title</label>
                <input
                type="text"
                name="title"
                value={task.title}
                onChange={handlechange}
                placeholder="Enter the title "
                class="w-full mt-2 p-3 rounded border focus:ring-2 focus:ring-indigo-500" 
                />
            </div>
              <div>
                <label class="block font-medium text-gray-700">Description</label>
                <input
                type="text"
                name="description"
                value={task.description}
                onChange={handlechange}
                placeholder="Enter the description "
                class="w-full mt-2 p-3 rounded border focus:ring-2 focus:ring-indigo-500" 
                />
            </div>
              <div>
                {/* location is to handle by maps api */}
                <label class="block font-medium text-gray-700">Location</label>
                <input
                type="text"
                name="location"
                // value={task.location}
                // onChange={handlechange}
                placeholder="Enter the location "
                class="w-full mt-2 p-3 rounded border focus:ring-2 focus:ring-indigo-500" 
                />
            </div>
              <div>
                {/* date is to handle by current date */}
                <label class="block font-medium text-gray-700">Rewards</label>
                <input
                type="number"
                name="reward"
                value={task.reward}
                onChange={handlechange}
                placeholder="Enter the rewards "
                class="w-full mt-2 p-3 rounded border focus:ring-2 focus:ring-indigo-500" 
                />
            </div>
            <div class="flex items-center justify-center">
                          <button class="w-fit bg-indigo-800 rounded-2xl text-center text-white p-4 mt-1.5">Submit</button>

            </div>
        </form>
        </div>
      </div>
    </MainLayout>
  );
};
export default CreateTask;

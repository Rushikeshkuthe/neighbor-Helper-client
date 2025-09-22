import React, { useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'
import TaskCard from '../component/TaskCard'
import MainLayout from '../layout/MainLayout'
import { apiGET } from '../../utils/apiHelpers'

const Home = ()=>{

    const [task,setTask]=useState([])

    async function getAllTask(){
       try{
      const response = await apiGET(`v1/task/getallTask`)
          console.log("response-->",response.data.data)
      if(response.data.status===200){
        setTask(response.data.data)
      }else{
        console.error('Something went wrong')
      }

    }catch(error){
        console.error("Unable to fetch task",error)
    }

    }

    const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");      // dd
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mm
  const year = date.getFullYear();                           // yyyy
  return `${day}/${month}/${year}`;
};

    useEffect(()=>{
      getAllTask()
    },[])
   

    return(
        <MainLayout>
        <div class="flex min-h-screen rounded-3xl bg-gray-300">
           
           <div class="flex-1 flex flex-col">

            <main class="flex-1 p-6">
                <h1 class="text-4xl font-bold mb-4 text-indigo-800">Available Task</h1>

                <div class="grid md:grid-cols-3 lg:grid-col-2 gap-6">
                  {task.map((t,index)=>(
                    <TaskCard
                   title={t.title}
                   date={formattedDate(t.createdAt)}
                    description={t.discription}
                    location=""
                    reward={t.reward}
                   />
                  ))}
                   
                
                </div>

            </main>
           </div>
        </div>
        </MainLayout>
    )

}
export default Home
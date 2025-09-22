import React from "react";
import { IoLocation } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const TaskCard=({title,description,location,reward,date ,onAccept})=>{
    const navigate = useNavigate()

   


    return(
        <div class="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition flex flex-col">
            <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
                <h2 class="text-xl font-semibold text-indigo-800">{title}</h2>
                 <span>{date}</span>
            </div>
            
            <p className="text-grey-600 mt-2 flex-1">{description}</p>

            <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <span> {location}</span>
                    <IoLocation size={15}/>
                </div>
                <div class="flex items-center gap-2">
                     <TbMoneybag size={15}/>
                   <span>{reward}</span> 
                  

                </div>
            </div>

        <button class="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition "
        onClick={onAccept}
        >
            Accept Task
        </button>

        </div>
    )
}
export default TaskCard
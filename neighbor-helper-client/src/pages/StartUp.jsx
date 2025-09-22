import React from "react";
import startUp from "../assets/startup.jpg"
import logo from "../assets/logo.svg"
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StartUp =()=>{
    const navigate = useNavigate();

return(
    <div >
    <div class=" flex items-center justify-center bg-indigo-900 min-h-screen p-8">
        <div class="bg-white shadow-xl rounded-2xl  grid md:grid-cols-2 overflow-hidden max-w-full">
        {/* left section */}

        <div class="bg-indigo-800 text-white p-10 flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-8">
                <img
                src={logo} alt="landing img"
                class="w-8 h-8"
                />
                <h1 class="text-2xl font-bold ">NEIGHBOR HELPER</h1>
            </div>
            <h2 class="text-4xl font-bold mb-6">
                Community help made easy.
            </h2>
            <p class="text-gray-300 mb-8">
            A platform where neighbors help each other with daily tasks.
            From grocery pickup to repairs, TaskShare makes it simple
            to connect, share, and support your community.
            </p>
            <div class="flex gap-4">
        <button class="px-6 py-6 bg-teal-400 text-indigo-900 rounded-full font-semibold hover:bg-teal-500 transition" onClick={()=>{navigate('/login')}}>Get Started</button>
        <button class="px-6 py-3 border border-gray-300 text-white rounded-full font-semibold hover:bg-indigo-600 transition flex items-center gap-2 pointer-events-auto">Learn More <FaArrowRight/></button>
            </div>
            
           

        </div>
{/* right section */}
            <div class="flex item-center justify-center bg-white p-10">
                <img
                src={startUp} 
                alt="community helper"
                class="w-full"/>
            </div>
        </div>

    </div>
    </div>
)
}
export default StartUp
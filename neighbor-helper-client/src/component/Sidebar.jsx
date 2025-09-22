import React from 'react'
import logo from "../assets/logo.svg"
import { BiArrowFromRight, BiTask } from 'react-icons/bi'
import { FaHome } from 'react-icons/fa'
import { IoWalletOutline,IoSettingsOutline } from 'react-icons/io5'

import { RiMessageLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'




const Sidebar=()=>{

    const navigate = useNavigate();

 const handleLogout =(e)=>{
    localStorage.clear();
    navigate('/login')
 }

    return(
        <aside class="fixed top-0 left-0 h-screen w-60 bg-gray-900 text-white flex flex-col">
            <div class="flex items-center gap-2 flex-row m-5">
                        <img src={logo} alt="logo" class="w-8 h-8" />
                        <h1 class="text-2xl font-bold">NH</h1>
                        </div>
            {/* profile */}
            <div class="p-6 flex flex-col items-center justify-center border-b border-gray-700">
                <img
                src=""
                alt="profile image"
                class="w-20 h-20 rounded-full border-4 "
                />
                <h2 class='mt-2 font-bold'>Rushikesh</h2>
                <span class="text-green-500 font-medium font">Task Completetd</span>
            </div>
            {/* menu */}
            <nav class="flex-1 mt-6 space-y-2 px-4">
                <a href='/home' class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700">
                <FaHome size={18} /> Home
                </a>
                <a href='/mytask' class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700">
                <BiTask size={18}/>My Task
                </a>
                <a href='/message' class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700">
                <RiMessageLine size={18}/>Message
                </a>
                <a href='/userwallet' class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700">
                <IoWalletOutline size={18}/>Wallet
                </a>
                 <a href='/setting' class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700">
                <IoSettingsOutline size={18}/>Settings
                </a>
            </nav>
            <div class="m-5">
                <button onClick={()=>handleLogout()} class="w-full rounded-2xl bg-indigo-700 p-3 hover:bg-white hover:text-gray-500 transition ">Logout</button>
            </div>
        </aside>
    )
}
export default Sidebar
import React, { useState } from 'react'

import { BiBell, BiSearch } from 'react-icons/bi'

const Navbar=()=>{
    return(
        <header class= 'flex items-center justify-between shadow px-6 py-3'>
            
            {/* search button */}
            
            <div class="relative w-72">
                <BiSearch class= "absolute left-3 top-2.5 text-gray-500" size={18}/> 
                <input
                type="text"
                placeholder='Search'
                class="pl-10 pr-4 py-2 w-full rounded-full border border-gray-600"
                />
            </div>

            {/* right side */}
            <div class='flex items-center gap-6 '>
                <nav class="hidden md:flex gap-6 font-medium text-gray-700">
                <a href="/createtask" class="text-blue-400 rounded-2xl border p-2  hover:bg-blue-500 hover:text-white">Create Task</a>
                <a href="/postedTask" class="text-blue-400 rounded-2xl border p-2  hover:bg-blue-500 hover:text-white">Posted Task</a>
                </nav>
                <BiBell class="text-gray-600"/>
            </div>
           
        </header>
    )
}
export default Navbar
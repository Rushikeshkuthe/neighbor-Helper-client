import React, { useState } from "react"
import MainLayout from "../layout/MainLayout"

const Message= ()=>{

    const[seletedChat,setSelectedChat]=useState(null)
    const[message,setMessage]=useState("")

    const chats = [
         { id: 1, name: "Amit", lastMessage: "Thanks for helping!", time: "10:30 AM" },
    { id: 2, name: "Priya", lastMessage: "Can you buy groceries?", time: "09:45 AM" },
    ]

    const messages=[
            { sender: "me", text: "Hello Priya!" },
    { sender: "them", text: "Hi, can you help with groceries?" },
    { sender: "me", text: "Yes, sure!" },
    ]


   const handlesend=()=>{
        if(message.trim==="")
            return
        console.log("Sending",message)
        setMessage("")
    }

    return (
        <MainLayout>
        <div class= "p-6 bg-gray-300 rounded-3xl min-h-screen ">
            <h1 class="text-indigo-800 text-3xl font-bold mb-5">Message</h1>

        {/* chat list */}
        <div classname="  border-r border-gray-700 p-4 ">

           {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            class={`p-3 w-1/2 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 ${
              setSelectedChat?.id === chat.id ? "bg-gray-800" : ""
            }`}
          >
            <p class="font-semibold">{chat.name}</p>
            <p class="text-sm text-gray-500">{chat.lastMessage}</p>
            <span class="text-xs text-gray-500">{chat.time}</span>
          </div>
        ))}
        </div>

        <div class="flex-1 flex flex-col">


               {seletedChat?(
                <>
                <div class="p-4 border-b border-gray-700 font-bold">
                    {seletedChat.name}
                </div>
                <div class= "flex-1 p-4 overflow-y-auto space-y-3">
                    {message.map((msg,index)=>(
                        <div
                        key={index}
                        class={`p-2 rounded-lg max-w-xs ${
                            msg.sender ==="me"
                            ?"bg-burple-600 ml-auto text-right"
                            :"bg-gray-700 mr-auto text-left"
                        }`}>
                            
                        </div>
                    ))}
                </div>
                {/* input box */}
                <div class="p-4 border-t border-gray-700 bg-gray-200">

                    <input
                    type="text"
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)}
                    place="type your message"
                    class="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700"
                    />
                    <button onClick={handlesend}
                    class="px-4 py-2 bg-indigo-800 rounded-lg hover:bg-indigo-500">
                        Send
                    </button>
                </div>
                </>
               ):(
                <div class="flex flex-1 items-center justify-center text-gray-400">
                    Select a chat to start message
                </div>
               )}
        </div>

        </div>
        
        </MainLayout>
    )
}

export default Message
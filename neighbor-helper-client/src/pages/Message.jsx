import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import MainLayout from "../layout/MainLayout";
import { apiGET } from "../../utils/apiHelpers";

const socket = io("http://localhost:4001"); 

const Message = () => {
    const [ user,setUser] =useState([])
    const requester = location.state;
  const [selectedChat, setSelectedChat] = useState(requester || null);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  

  const messagesEndRef = useRef(null);

  // Dummy chat list
useEffect(()=>{
    async function getAllUser(){
        try{
            const res = await apiGET('v1/auth/getalluser')
            console.log(res.data.data)
            if(res.data.status===200){
                setUser(res.data.data)
            }

        }catch(error){
            console.error("failed to Get users",error)
        }
        
    }
    getAllUser()
},[])


  // Receive messages from server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgs((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // Send message
  const handleSend = () => {
    if (msg.trim() === "") return;

    const msgData = { 
        sender: "me", 
        text: msg ,
        to:selectedChat.id
    };

    socket.emit("send_message", msgData); // send to server
    setMsgs((prev) => [...prev, msgData]); // show locally
    setMsg("");
  };

  return (
    <MainLayout>
      <div className="p-6 bg-gray-300 rounded-3xl h-[600px] flex gap-4">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-700 p-2 overflow-y-auto">
          {user.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedChat(user)}
              className={`p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 ${
                selectedChat?.id === user.id ? "bg-gray-800 text-white" : ""
              }`}
            >
              <p className="font-semibold">{user.username}</p>
              <p className="text-sm text-gray-500">{user.lastMessage}</p>
              <p className="text-xs text-gray-500">{user.time}</p>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700 font-bold">
                {selectedChat.username}
              </div>

              {/* Messages Inbox (Scrollable) */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {msgs.map((msgItem, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg max-w-xs ${
                      msgItem.sender === "me"
                        ? "bg-indigo-600 ml-auto text-white"
                        : "bg-gray-700 mr-auto text-left text-white"
                    }`}
                  >
                    {msgItem.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box */}
              <div className="p-4 border-t border-gray-700 bg-gray-200 flex gap-2">
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Type your message"
                  className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-indigo-800 rounded-lg hover:bg-indigo-500 text-white"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Message;

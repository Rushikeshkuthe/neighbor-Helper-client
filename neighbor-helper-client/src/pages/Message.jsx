import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import MainLayout from "../layout/MainLayout";
import { apiGET } from "../../utils/apiHelpers";

// Connect socket
const socket = io("http://localhost:3001", {
  transports: ["websocket"],
});

const Message = () => {
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const messagesEndRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem('user'))
  const currentUserId = userData?.id; // Replace with actual logged-in user ID

  console.log("Current User ID:", currentUserId);

  // Register user with socket on connect
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected with ID:", socket.id);
      socket.emit("register_user", currentUserId);
    });

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      console.log("Message received:", data);
      // Only add messages if they involve this user
      if (data.senderId === selectedChat?._id || data.receiverId === currentUserId) {
        setMsgs((prev) => [...prev, data]);
      }
      console.log(data)
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedChat]);

  // Fetch all users
  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await apiGET("v1/auth/getalluser");
        console.log("response--->", res.data.data); 
        if (res.data.status === 200) {
          setUsers(res.data.data.filter(u => u._id !== currentUserId)); // exclude self
        }
      } catch (error) {
        console.error("Failed to get users", error);
      }
    }
    getAllUsers();
  }, []);


  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // Send message to selected user
  const handleSend = () => {
    if (!msg.trim() || !selectedChat) return;

    const msgData = {
      sender: currentUserId,
      senderId: currentUserId,
      to: selectedChat?._id,
      text: msg,
      createdAt: new Date(),
    };

    socket.emit("send_message", msgData);
    setMsgs((prev) => [...prev, msgData]);
    setMsg("");
  };

   useEffect(() => {
    if(!selectedChat) return

    async function fetchMessages(){
      try{
        const response = await apiGET(`v1/messages/${currentUserId}/${selectedChat._id}`)
        if(response.status===200){
          setMsgs(response.data.data)
        }
      }catch(error){
        console.error("Error while fetching messages",error)
      }
    }
    fetchMessages()
   }, [selectedChat])


  return (
    <MainLayout>
      <div className="p-6 bg-gray-300 rounded-3xl h-[600px] flex gap-4">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-700 p-2 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setSelectedChat(user);
                setMsgs([]); // clear messages or fetch from DB if needed
              }}
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

              {/* Messages Inbox */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {msgs.map((msgItem, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg max-w-xs break-words ${
                      msgItem.senderId === currentUserId
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
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
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

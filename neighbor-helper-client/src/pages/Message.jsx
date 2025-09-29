import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import MainLayout from "../layout/MainLayout";
import { apiGET } from "../../utils/apiHelpers";
import { useLocation } from "react-router-dom";

// Connect socket
const socket = io("http://localhost:3001", { transports: ["websocket"] });

const Message = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(
    location.state
      ? { _id: location.state.id, username: location.state.name }
      : null
  );
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const messagesEndRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem("user"));
  const currentUserId = userData?.id;

  // Register user with socket
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("register_user", currentUserId);
    });

    socket.on("receive_message", (data) => {
      if (data.senderId === selectedChat?._id || data.receiverId === currentUserId) {
        setMsgs((prev) => [...prev, data]);
      }
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
        if (res.data.status === 200) {
          setUsers(res.data.data.filter((u) => u._id !== currentUserId));
        }
      } catch (error) {
        console.error(error);
      }
    }
    getAllUsers();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // Fetch chat history
  useEffect(() => {
    if (!selectedChat) return;

    async function fetchMessages() {
      try {
        const response = await apiGET(
          `v1/msg/messages/${currentUserId}/${selectedChat._id}`
        );
        if (response.status === 200) {
          setMsgs(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMessages();
  }, [selectedChat]);

  // Set selected chat from location state
  useEffect(() => {
    if (location.state && users.length > 0) {
      const foundUser = users.find((u) => u._id === location.state.id);
      setSelectedChat(
        foundUser || { _id: location.state.id, username: location.state.name }
      );
    }
  }, [location.state, users]);

  const handleSend = () => {
    if (!msg.trim() || !selectedChat) return;

    const msgData = {
      sender: currentUserId,
      senderId: currentUserId,
      to: selectedChat._id,
      text: msg,
      createdAt: new Date(),
    };

    socket.emit("send_message", msgData);
    setMsgs((prev) => [...prev, msgData]);
    setMsg("");
  };

  return (
    <MainLayout>
      <div className="min-h-full p-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 flex justify-center">
        <div className="bg-gray-100 rounded-3xl w-full max-w-6xl flex shadow-2xl h-[600px]">
          {/* User List */}
          <div className="w-1/3 border-r border-gray-300 p-2 overflow-y-auto bg-white rounded-l-3xl">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedChat(user);
                  setMsgs([]);
                }}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition hover:bg-indigo-100 ${
                  selectedChat?._id === user._id ? "bg-indigo-200 font-semibold" : ""
                }`}
              >
                <p>{user.username}</p>
              </div>
            ))}
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col rounded-r-3xl overflow-hidden">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="bg-gray-900 text-white p-4 font-bold">
                  {selectedChat.username}
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2">
                  {msgs.map((msgItem, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl max-w-xs break-words ${
                        msgItem.senderId === currentUserId
                          ? "bg-indigo-600 text-white ml-auto"
                          : "bg-gray-700 text-white mr-auto"
                      }`}
                    >
                      {msgItem.text}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex p-4 border-t border-gray-300 bg-white gap-2">
                  <input
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-indigo-800 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Message;


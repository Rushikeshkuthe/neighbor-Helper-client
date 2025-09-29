import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { apiGET, apiPUT } from "../../utils/apiHelpers";
import Leaf from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { motion } from "framer-motion";

const TaskDetail = () => {
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const curUserId = currentuser?.id;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await apiGET(`v1/task/getTaskById/${id}`);
        if (response.status === 200) setTask(response.data.data);
      } catch (error) {
        console.error("Error fetching Task", error);
      }
    }
    fetchTask();
  }, [id]);

  const customIcon = new Leaf.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleChat = () => {
    navigate("/message", { state: { id: task?.userId, name: task?.username } });
  };

  const handleAccept = async () => {
    try {
      const response = await apiPUT(`v1/task/acceptedTask/${task._id}`, {
        acceptUserId: curUserId,
      });
      if (response.data.status === 200) {
        setIsAccepted(true);
        navigate("/mytask");
      }
    } catch (error) {
      console.error("Error accepting task", error);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 min-h-screen w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 "
>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Task Header */}
       

        {/* Task Info Card */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
           <motion.h1
          className="text-3xl font-bold mb-5 text-indigo-800 "
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Task Details
        </motion.h1>
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">{task?.title}</h2>
          <p className="text-gray-700 mb-2">
            Posted By: <span className="font-semibold">{task?.username}</span>
          </p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-600">{task?.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <p className="text-gray-600">{task?.address}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Rewards</h3>
            <p className="text-gray-600 font-bold">₹{task?.reward}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            {task?.location?.lat && task?.location?.lng ? (
              <MapContainer
                center={[task.location.lat, task.location.lng]}
                zoom={13}
                className="w-full h-64 rounded-lg border"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker
                  position={[task.location.lat, task.location.lng]}
                  icon={customIcon}
                >
                  <Popup>{task.address || "Task Location"}</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">Map Not Available</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <motion.button
              onClick={handleAccept}
              disabled={isAccepted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 font-semibold rounded-lg text-white transition ${
                isAccepted ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isAccepted ? "Task Accepted" : "Accept Task"}
            </motion.button>

            <motion.button
              onClick={handleChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
            >
              Chat with Requester
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </MainLayout>
  );
};

export default TaskDetail;

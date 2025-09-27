import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { apiGET, apiPUT } from "../../utils/apiHelpers";
import Leaf from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const TaskDetail = () => {
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const curUserId = currentuser?.id;
  const { id } = useParams();
  const navigate = useNavigate();
    const[isAccepted,setIsAccepted] =useState(false)
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await apiGET(`v1/task/getTaskById/${id}`);
        if (response.status === 200) {
          setTask(response.data.data);
        } else {
          console.error("Something Went Wrong");
        }
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
    navigate("/message", {
      state: {
        id: task?.userId,
        name: task?.username,
      },
    });
  };

  const handleAccept = async () => {
    try {
      const response = await apiPUT(`v1/task/acceptedTask/${task._id}`, {
        acceptUserId: curUserId,
        
      });
      if (response.data.status === 200){
        setIsAccepted(true)
        navigate('/mytask')
      }else{
        console.error("Failed to accept task")
      }
    } catch (error) {
      console.error("Error accepting task", error);
    }
  };

  return (
    <MainLayout>
      <div class="p-6 bg-gray-300 rounded-3xl min-h-screen w-full">
        <h1 class="text-3xl font-bold text-indigo-800 mb-5">Task Details</h1>

        <h1 class="text-2xl font-bold mb-2 text-gray-700">{task?.title}</h1>

        <p class="text-gray-600 mb-1">
          Posted By : <span class="font-semibold">{task?.username}</span>
        </p>

        <div class="mb-4">
          <h2 class="text-lg font-semibold">Description</h2>
          <p class="text-gray-600">{task?.description}</p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-semibold ">Address</h2>
          <p class="text-gray-600">{task?.address}</p>
        </div>
        <div class="mb-4">
          <h2 class="text-lg font-semibold ">Rewards</h2>
          <p class="text-gray-600 font-bold">₹{task?.reward}</p>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-1">Location</h2>
          {task?.location?.lat && task.location?.lng ? (
            <MapContainer
              center={[task?.location?.lat, task?.location?.lng]}
              zoom={13}
              className="w-full h-64 rounded border"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy, <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker
                position={[task?.location?.lat, task?.location?.lng]}
                icon={customIcon}
              >
                <Popup>{task.address || "Task Location"}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="w-full h-64 bg-gray-800 flex items-center justify-center rounded">
              <span className="text-gray-400">Map Not Available</span>
            </div>
          )}
        </div>

        <div class="flex mt-4 gap-2">
          <button
            class="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 font-semibold text-white"
            onClick={handleAccept}
            disabled={isAccepted}
          >
            {isAccepted ?"Task Accepted":"Accept Task"}
          </button>
          <button
            class="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 font-semibold text-white"
            onClick={handleChat}
          >
            Chat with Requester
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default TaskDetail;

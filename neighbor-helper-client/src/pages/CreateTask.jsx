// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { apiPOST } from "../../utils/apiHelpers";
// import { AiFillLayout } from "react-icons/ai";

// const CreateTask = () => {
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     reward: "",
//   });
//   const [address, setAddress] = useState("");
//   const [location, setLocation] = useState(null);

//   const [error, setError] = useState("");

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setTask({ ...task, [name]:name==="reward"?Number(value): value });
//   };

//   const fetchCoodinates = async () => {
//     try {
//       const mapResponse = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           address
//         )}`
//       );
//       const data = await mapResponse.json();
//       if (data.length > 0) {
//         const lat = parseFloat(data[0].lat);
//         const lng = parseFloat(data[0].lon);
//         setLocation({ lat, lng });
//        return{lat,lng}
//       } else {
//         setError("Address not found");
//       }
//     } catch (error) {
//       console.error("Error in fetching Map Api", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");

//       const coords = await fetchCoodinates()

//       if(!coords){
//         setError('Please enter valid address')
//       }

//       const payload = {
//         title: task.title,
//         description: task.description,
//         reward: Number(task.reward),
//         address: address, //user typed address
//         location: coords
//       };

//       const response = await fetch(`http://localhost:3001/v1/task/createTask`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       console.log(data.data);

//       if (data.status === 201) {
//         setTask({
//           title: "",
//           description: "",
//           reward: "",
//         });
//         setAddress("");
//         setLocation(null);
//         setError("")
//       } else {
//         setError("fail to create task");
//       }
//     } catch (error) {
//       console.error("error occured during creating the task");
//     }
//   };

//   return (
//     <MainLayout>
//       <div class="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 p-6">
//       <div class=" bg-gray-100 rounded-3xl w-full max-w-7xl p-6 shadow-2xl">
//         <h1 class="text-4xl font-bold text text-indigo-800 mb-6 p-6">
//           Post New Task
//         </h1>

//         <div class="flex items-center justify-center w-1/2 m-6">
//           <form
//             class="   shadow-lg w-full rounded-xl p-6"
//             onSubmit={handleSubmit}
//           >
//             <div>
//               <label class="block font-medium text-gray-700">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={task.title}
//                 onChange={handlechange}
//                 placeholder="Enter the title "
//                 class="w-full mt-2 p-3 rounded border focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label class="block font-medium text-gray-700">Description</label>
//               <input
//                 type="text"
//                 name="description"
//                 value={task.description}
//                 onChange={handlechange}
//                 placeholder="Enter the description "
//                 class="w-full mt-2 p-3 rounded border focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div >
//               {/* location is to handle by maps api */}
//               <label class="block font-medium text-gray-700">Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Enter the location "
//                 class="w-full mt-2 p-3 rounded border focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               {/* date is to handle by current date */}
//               <label class="block font-medium text-gray-700">Rewards</label>
//               <input
//                 type="number"
//                 name="reward"
//                 value={task.reward}
//                 onChange={handlechange}
//                 placeholder="Enter the rewards "
//                 class="w-full mt-2 p-3 rounded border focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div class="flex items-center justify-center">
//               <button class="w-fit bg-indigo-800 rounded-2xl text-center text-white p-4 mt-1.5">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       </div>
//     </MainLayout>
//   );
// };
// export default CreateTask;

import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { motion } from "framer-motion";

const CreateTask = () => {
  const [task, setTask] = useState({ title: "", description: "", reward: "" });
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: name === "reward" ? Number(value) : value });
  };

  const fetchCoordinates = async () => {
    try {
      const mapResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await mapResponse.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setLocation({ lat, lng });
        return { lat, lng };
      } else {
        setError("Address not found");
      }
    } catch (error) {
      console.error("Error fetching map data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const coords = await fetchCoordinates();

      if (!coords) {
        setError("Please enter valid address");
        return;
      }

      const payload = {
        title: task.title,
        description: task.description,
        reward: Number(task.reward),
        address: address,
        location: coords,
      };

      const response = await fetch(`http://localhost:3001/v1/task/createTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === 201) {
        setTask({ title: "", description: "", reward: "" });
        setAddress("");
        setLocation(null);
        setError("");
      } else {
        setError("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-100 rounded-3xl w-full max-w-7xl p-6 shadow-2xl"
        >
          <h1 className="text-4xl font-bold text-indigo-800 mb-6 ">
            Post New Task
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Enter the title"
                className="w-full mt-2 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter the description"
                className="w-full mt-2 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter the location"
                className="w-full mt-2 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Rewards</label>
              <input
                type="number"
                name="reward"
                value={task.reward}
                onChange={handleChange}
                placeholder="Enter the rewards"
                className="w-full mt-2 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {error && <p className="text-red-600 font-semibold">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-indigo-800 text-white p-4 rounded-2xl mt-4 text-lg font-semibold shadow-lg"
              type="submit"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default CreateTask;

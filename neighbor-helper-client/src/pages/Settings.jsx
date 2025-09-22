import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { apiPUT } from "../../utils/apiHelpers";

const Setting = () => {

  const [form,setForm]=useState({
    username:'',
    email:'',
    password:''
  })

  const [userId,setUserId]= useState(null)

  const [error,setError] = useState('')
  const[sucess,setSucess] =useState('')

useEffect(()=>{
  const storedUser = localStorage.getItem('user')
  if(storedUser){
    const parsedUser = JSON.parse(storedUser)
    setUserId(parsedUser.id)
  }
})

  const handlechange=(e)=>{
    const{name,value}= e.target
    setForm({...form,[name]:value})
  }

  const handleUpdate = async()=>{
      setError('')
      setSucess('')
      try{
        const response = await apiPUT(`v1/auth/update/${userId}`,{
          username: form.username,
          email: form.email,
          password:form.password,
        })
        console.log("update response =>", response.data.data)

        if(response.status==200){
          setSucess("Profile has been updated")
        }else{
          setError(response.data?.msg || "Update failed")
        }
      }catch(error)
      {
        console.error("update error", error)
        setError('Something went wrong')
      }
  }

  return (
    <MainLayout>
      <div class="p-6 bg-gray-300 rounded-3xl min-h-screen ">
        <h1 class="font-bold text-3xl text-indigo-800 mb-6">Settings</h1>

        <div class="flex  space-x-6">
          <img
            src=""
            alt="profile"
            class="w-24 h-24 rounded-full object-cover border-2 border-gray-700 "
          />

          <div class="flex justify-center items-center gap-2">
            <button class=" rounded-3xl border p-2 bg-violet-700 text-white w-55">
              <input type="file" accept="image/png , image/jpg" onChange="" />
            </button>
            <button class=" rounded-3xl border p-2 bg-red-600 text-white w-25">
              Remove
            </button>
          </div>
        </div>
        <div class=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class=" block mt-5 text-indigo-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handlechange}
              placeholder="Enter the name you want to change"
              class=" border rounded-3xl w-3/4 p-2"
            />
          </div>
           <div>
            <label class=" block mt-5 text-indigo-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handlechange}
              placeholder="Enter the email you want to change"
              class=" border rounded-3xl w-3/4 p-2"
            />
          </div>
           <div>
            <label class=" block mt-5 text-indigo-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handlechange}
              placeholder="Enter the password you want to change"
              class=" border rounded-3xl w-3/4 p-2"
            />
          </div>
           <div>
            <label class=" block mt-5 text-indigo-700">Wallet Address</label>
            <input
              disabled
              placeholder="451278956552"
              class=" border rounded-3xl w-3/4 p-2"
            />
          </div>
           
        </div>
       <button onClick={handleUpdate} class="rounded-2xl border bg-indigo-800 text-white p-2 m-5">Save Changes</button>
      </div>
    </MainLayout>
  );
};

export default Setting;

// import React, { useEffect, useState } from "react";
// import loginBg from "../assets/login.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import { apiPOST } from "../../utils/apiHelpers";

// const Login = () => {
//     const [form,setForm] = useState({email:"",password:""})
//     const [error,setError ] =useState('')
//     const navigate = useNavigate();

//      useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             navigate('/home');
//         }
//     }, [navigate]);

//         const handleform=(e)=>{
//             const {name,value} = e.target;
//             setForm({...form,[name]:value})
//         }

//         const onsubmit = async(e)=>{
//              e.preventDefault();
//              setError('')
//              try{
//               const {email,password }= form;
//               const response = await apiPOST(`v1/auth/login`,{
//                 email,
//                 password
//               })

//               console.log("response=>>>",response.data)

//               if(response.status===200)
//               {
//                 const{username , _id:id,email}=response.data.data;
//                 const user = {username,id,email}
//                 localStorage.setItem('user',JSON.stringify(user));
//                 localStorage.setItem('token',response.data.data.accessToken);
//                 setForm({
//                   email:'',
//                   password:''
//                 })
//                 navigate('/home')
//               }else{
//                 setError(response.data.msg||"Login Failed")
//               }

//              }catch(error){
//               setError("An error occurred during login. Please ty again")
//              console.error("An error occurred during login:",error)

//              }   
//         }

//   return (
//     <div>
//       <div class="flex items-center justify-center bg-indigo-900 min-h-screen p-8">
//         <div class="bg-white shadow-xl rounded-2xl grid md:grid-cols-2 overflow-hidden ">
//           {/* left section */}
//           <div>
//             <img src={loginBg} alt="login background" class="w-full" />
//           </div>
//           {/* right section */}
//           <div class="flex justify-center items-center bg-gray-200 flex-col ">
           
//               <span class="font-bold text-4xl mb-2 text-indigo-800">LOGIN</span>
           
//             <div class='flex max-w-md items-center justify-center'>

//                 <form class="space-y-1 space-x-2 w-full">
                    
//                         <label class="block text-teal-500 font-medium">Email</label>

                    
//                     <input
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleform}
//                     placeholder="Enter your email"
//                     required
//                     class="w-full p-3  rounded-2xl border-2"
//                     />
                  
//                         <label class="block text-teal-500 font-medium">Password</label>

                   
//                     <input
//                     name="password"
//                     type="password"
//                     value={form.password}
//                     onChange={handleform}
//                     placeholder="Enter your Password"
//                     required
//                     class="w-full p-3  rounded-2xl border-2"
//                     />
                     
//                     <button 
//                     type="submit"
//                     onClick={onsubmit}
//                     class="w-full bg-indigo-800 rounded-2xl text-center text-white p-2 mt-1.5"
//                     >Submit</button>
//                      <div>
//                     Don't have an account?{" "}
//                       <div onClick={()=>navigate('/register')} className="text-indigo-600 font-semibold hover:underline cursor-pointer">Register</div>
//                 </div>
               
//                 </form>

                 
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import loginBg from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { apiPOST } from "../../utils/apiHelpers";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleform = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { email, password } = form;
      const response = await apiPOST(`v1/auth/login`, {
        email,
        password,
      });

      console.log("response=>>>", response.data);

      if (response.status === 200) {
        const { username, _id: id, email } = response.data.data;
        const user = { username, id, email };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.data.data.accessToken);
        setForm({
          email: "",
          password: "",
        });
        navigate("/home");
      } else {
        setError(response.data.msg || "Login Failed ❌");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again ❌");
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 min-h-screen p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white shadow-2xl rounded-2xl grid md:grid-cols-2 overflow-hidden max-w-4xl w-full"
      >
        {/* left section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={loginBg}
            alt="login background"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* right section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center bg-gray-50 flex-col p-10"
        >
          <span className="font-bold text-4xl mb-6 text-indigo-800">LOGIN</span>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm w-full text-center"
            >
              {error}
            </motion.div>
          )}

          <form className="space-y-4 w-full" onSubmit={onsubmit}>
            <div>
              <label className="block text-teal-600 font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleform}
                placeholder="Enter your email"
                required
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-teal-600 font-medium">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleform}
                placeholder="Enter your password"
                required
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-indigo-800 hover:bg-indigo-700 transition text-white rounded-lg p-3 font-semibold"
            >
              Sign In
            </motion.button>
          </form>

          <p className="mt-4 text-gray-700">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;


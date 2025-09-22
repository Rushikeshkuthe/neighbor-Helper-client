import React, { useState } from "react";
import register from "../assets/register.jpg"
import { Link, useNavigate } from "react-router-dom";
import { apiPOST } from "../../utils/apiHelpers";

const Register=()=>{
    const[formvalue,setFormvalue]=useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const [error ,setError] = useState('')

    const navigate = useNavigate()

    const handleInputChanges = (e)=>{
        const {name,value} = e.target;
        setFormvalue({...formvalue,[name]:value});
    }

    const handleSignup = async(e)=>{
        e.preventDefault()
        if(formvalue.password!==formvalue.confirmPassword){
            setError('Password is not matching')
            return;
        }
    
    setError('')

    try{
        const {username,email,password} = formvalue;
        const response = await apiPOST(`v1/auth/register`,{
            email,
            username,
            password
        })

        if(response.data.status===201){
            setFormvalue({
                username:'',
                email:'',
                password:''
            })
            navigate('/login')
            console.log("response=>>",response.data)
        }
        else{
            setError("User register failed")
        }

    }catch(error){
            setError('an error occured during signup,try again')
            console.error("an error occured during signup",error)
    }
}


    return(
       <div class="min-h-screen flex items-center justify-center bg-indigo-900 p-8">
        <div class= " bg-white shadow-xl rounded-2xl grid md:grid-cols-2 overflow-hidden ">

            {/* left side */}
            <div>
                <img src={register} alt="register" class="w-full"/>
            </div>
            {/* right section */}
            <div class="flex items-center justify-center bg-gray-200 flex-col p-8">
                <span class="font-bold text-4xl mb-2 text-indigo-800">REGISTER</span>

            <div class=" max-w-md  items-center justify">
                <form class="space-y-1 space-x-2 w-full">
                    <div class="m-1">
                    <label class="block text-teal-500 font-medium">Name</label>
                    </div>
                    <input
                    name="username"
                    type="text"
                    value={formvalue.username}
                    onChange={handleInputChanges}
                    placeholder="Enter your name"
                    class="w-full p-3 rounded-2xl border-2"
                    />

                    <div class="m-1">
                    <lebel class="block text-teal-500 font-medium">Email</lebel>
                    </div>
                    <input
                    name="email"
                    type="email"
                    value={formvalue.email}
                     onChange={handleInputChanges}
                    placeholder="Enter your name"
                    class="w-full p-3 rounded-2xl border-2"
                    />

                    <div class="m-1">
                    <lebel class="block text-teal-500 font-medium">Password</lebel>
                    </div>
                    <input
                    name="password"
                    type="password"
                    value={formvalue.password}
                     onChange={handleInputChanges}
                    placeholder="Enter your name"
                    class="w-full p-3 rounded-2xl border-2"
                    />

                    <div class="m-1">
                    <lebel class="block text-teal-500 font-medium">Confirm Password</lebel>
                    </div>
                    <input
                    name="confirmPassword"
                    type="password"
                    value={formvalue.confirmPassword}
                     onChange={handleInputChanges}
                    placeholder="Enter your password"
                    class="w-full p-3 rounded-2xl border-2"
                    />
                    <button 
                    type="submit"
                    onClick={handleSignup}
                    class="w-full bg-indigo-800 rounded-2xl text-center text-white p-2 mt-1.5"
                    >Submit</button>    

                     <div>
                    Already have an account?{" "}
                      <div onClick={()=>navigate('/login')} className="text-indigo-600 font-semibold hover:underline cursor-pointer">Login</div>
                </div>
                </form>
               
              
            </div>

            </div>
            
        </div>

       </div>
    )
}

export default Register
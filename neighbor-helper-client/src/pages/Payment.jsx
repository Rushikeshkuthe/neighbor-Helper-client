import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { apiGET, apiPUT } from '../../utils/apiHelpers'
import { useLocation, useParams } from 'react-router-dom'

const Payment=()=>{
    const userData = JSON.parse(localStorage.getItem('user'))
    const requesterId = userData?.id
    const {id} = useParams()
    const location = useLocation()
    const{acceptedUserId, reward} = location.state || {}
    const amount = reward;
    const [msg,setMsg]=useState('')
    const [loading,setLoading]=useState(false)

    console.log("Accepted User ID:", acceptedUserId);
    console.log("Task ID:", id);

    
    const [wallet, setWallet]=useState('')

    async function getUserWallet (){
        try{
            const response = await apiGET(`v1/wallet/getWalletById/${acceptedUserId}`)
            if(response.data.status===200){
                setWallet(response.data.data.wallet)
                console.log("User Wallet Data:", response.data.data);
                
            }
        }catch(error){
            console.error("Error while fetching wallet",error)
        }
    }

    async function handlepayment(){
        try{
               setLoading(true)  
            const response = await apiPUT(`v1/wallet/makePayment`,{
                taskId:id,
                acceptedUserId:acceptedUserId,
                requestedUserId:requesterId,
                amount:amount
            })

            if(response.data.status===200){
                setMsg(response.data.message)
                console.log(response.data.message)

                try{
                    const taskUpdate = await apiPUT(`v1/task/acceptedTask/${id}`,{
                          acceptUserId: acceptedUserId,
                          status: "completed"
                    })
                        console.log(taskUpdate.data.data)
                    if(taskUpdate.data.status===200){
                        console.log("Task status updated to Completed");
                        setMsg("Task marked as Completed.")
                    
                    }

                }catch(error){
                    console.error("Error Updating Task data",error)
                }
            }else{
                setMsg("Payment failed. Please try again.")
            }
        }catch(error){
            console.error("Error while processing payment",error)
        }
    }

    useEffect(()=>{
        getUserWallet()
    },[])

    return(
        <MainLayout>
           <div class="p-6 bg-gray-300 rounded-3xl min-h-screen ">
            <h1 class="font-bold text-3xl text-indigo-800 mb-6">Payment</h1>
            <div class="flex justify-center rounded-2xl ">
                <div className=' py-4 rounded-2xl flex  items-center p-7 gap-2'>
               <label class=" font-semibold text-gray-700"> Wallet Address :</label>
               <input 
               type="text"
               disabled
               placeholder={wallet?.address || ""}
               class="font-semibold border rounded p-1"
               />
               </div>

            </div>

            <div class="flex justify-center rounded-2xl gap-2">
                <h1 class=" font-semibold text-gray-700">Enter Amount :</h1>
                 <input 
               type="number"
               name="amount"
               placeholder={reward}
               value={reward}
               disabled
               class="font-semibold border rounded p-1"
               />   
            </div>      
                <div class="flex justify-center rounded-2xl mt-3 ">
                    <button class="bg-green-500 text-white p-2 rounded-2xl shadow-2xl hover:bg-green-700"
                    onClick={handlepayment}
                    disabled={loading}
                    >{loading?"Payment ✔️":"Proceed Payment"}</button>
                </div>
                {msg &&(
                    <p class="text-center mt-4 font-semibold text-indigo-800">{msg}</p>
                )}
           </div>
        </MainLayout>
    )
}

export default Payment
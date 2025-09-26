import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { apiGET } from '../../utils/apiHelpers'
import { useParams } from 'react-router-dom'

const Payment=()=>{
    const {id} = useParams()
    
    const [wallet, setWallet]=useState('')

    async function getUserWallet (){
        try{
            const response = await apiGET(`v1/wallet/getWalletById/${userId}`)
            if(response.data.status===200){
                setWallet(response,data.data)
                
            }

        }catch(error){
            console.error("Unable to fetch user wallet",error)
        }
    }

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
               placeholder='45824678822'
               class="font-semibold border rounded p-1"
               />
               </div>

            </div>

            <div class="flex justify-center rounded-2xl gap-2">
                <h1 class=" font-semibold text-gray-700">Enter Amount :</h1>
                 <input 
               type="number"
               name="amount"
               placeholder='Enter the reward amount'
               class="font-semibold border rounded p-1"
               />
            
            </div>
                
                <div class="flex justify-center rounded-2xl mt-3 ">
                    <button class="bg-green-500 text-white p-2 rounded-2xl shadow-2xl hover:bg-green-700">Procced Payment</button>
                </div>
           </div>
        </MainLayout>
    )
}

export default Payment
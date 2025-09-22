import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { apiGET } from "../../utils/apiHelpers";
import { useParams } from "react-router-dom";

const UserWallet = () => {

    const [userId,setUserId] = useState()
    
  const [wallet ,setWallet] = useState(null)
  const [transaction,setTransaction]= useState([])

    useEffect(()=>{
       const storeuser = localStorage.getItem('user')
      if(storeuser){
        const parsedUser = JSON.parse(storeuser)
        setUserId(parsedUser.id)
      }
    },[])

    useEffect(()=>{
      if(!userId)
        return

      async function fetchWallet (){
        try{
          const response = await apiGET(`v1/wallet/getWalletById/${userId}`)
             console.log(response)
          if(response.status===200){
            setWallet(response.data.data.wallet)
            setTransaction(response.data.data.transaction)
            console.log(response.data.data)
          }else{
            console.error("Something went wrong")
          }

        }catch(error){
          console.error("Error while fetching API",error)
        }
        
      }
      fetchWallet();
    },[userId])

  return (
    <MainLayout>
      <div class="p-6 bg-gray-300 rounded-3xl min-h-screen">
        <h1 class="font-bold text-3xl text-indigo-800 mb-6">
          Wallet & Transactions
        </h1>
        <div class="bg-white shadow-md w-fit rounded-xl p-6 mb-6 flex justify-center items-center">
          <h2 class="text-xl font-bold text-gray-700">Wallet Balance:</h2>
          <p class="text-3xl font-bold text-indigo-700 pl-2">
            ₹{ wallet?.balance ||0}
          </p>
        </div>
        <h2 class="text-2xl font-semibold text-indigo-800 mb-4">
          Transaction History
        </h2>

        <div class="overflow-x-auto rounded-lg">
          <table class="w-full border-collapse bg-white shadow-md ">
            <thead>
              <tr class="bg-indigo-700 text-white text-left">
                <th class="p-3">Title</th>
                <th class="p-3">Date</th>
                <th class="p-3">Amount</th>
                <th class="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((txn) => (
                <tr key={txn._id} class=" hover:bg-gray-1000 transition">
                  <td class="p-3">{txn.description}</td>
                  <td class="p-3">{new Date(txn.txnDate).toLocaleDateString()}</td>
                  <td
                    class={`p-3 font-semibold ${
                      txn.status === "Credited"? "text-green-600": "text-red-600"
                    }`}
                  >
                    {txn.amount}
                  </td>
                  <td
                    class={`p-3 font-semibold ${
                      txn.type === "credit"? "text-green-600": "text-red-600"
                    }`}
                  >
                    {txn.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserWallet;

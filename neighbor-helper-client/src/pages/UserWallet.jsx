import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { apiGET } from "../../utils/apiHelpers";

const UserWallet = () => {
  const [userId, setUserId] = useState();
  const [wallet, setWallet] = useState(null);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const storeuser = localStorage.getItem("user");
    if (storeuser) {
      const parsedUser = JSON.parse(storeuser);
      setUserId(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    async function fetchWallet() {
      try {
        const response = await apiGET(`v1/wallet/getWalletById/${userId}`);
        if (response.status === 200) {
          const respData = response.data.data;
          const fetchWallet = respData.wallet;
          const txns = fetchWallet.transaction || [];
          setWallet(fetchWallet);
          setTransaction(Array.isArray(txns) ? txns : []);
        } else {
          console.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error while fetching API", error);
      }
    }
    fetchWallet();
  }, [userId]);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const sortedTransactions = transaction
    .slice()
    .sort((a, b) => new Date(b.txnDate || b.date || 0) - new Date(a.txnDate || a.date || 0));

  const copyAddress = async () => {
    if (!wallet?.address) return;
    try {
      await navigator.clipboard.writeText(wallet.address);
      alert("Address Copied to Clipboard!");
    } catch (error) {
      console.log("Failed to copy address", error);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 p-6">
        <div className="bg-gray-100 rounded-3xl w-full max-w-7xl p-6 shadow-2xl">
          <h1 className="font-bold text-3xl text-indigo-800 mb-6 text-center md:text-left">
            Wallet & Transactions
          </h1>

          {/* Wallet Card */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Wallet Balance</h2>
              <p className="text-3xl font-bold text-indigo-700">₹{wallet?.balance || 0}</p>
            </div>
            <button
              onClick={copyAddress}
              className="mt-4 md:mt-0 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-2 rounded-xl transition"
            >
              Copy Wallet Address
            </button>
          </div>

          {/* Transaction History */}
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Transaction History</h2>
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full border-collapse bg-white shadow-md">
              <thead>
                <tr className="bg-indigo-700 text-white text-left">
                  <th className="p-3">Title</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.map((txn) => (
                  <tr key={txn?._id} className="hover:bg-gray-100 transition">
                    <td className="p-3 font-medium">{txn?.taskTitle}</td>
                    <td className="p-3">{formattedDate(txn?.txnDate || txn?.date)}</td>
                    <td
                      className={`p-3 font-semibold ${
                        txn.type === "credit" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {txn.amount}
                    </td>
                    <td
                      className={`p-3 font-semibold ${
                        txn.type === "credit" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sortedTransactions.length === 0 && (
              <p className="text-gray-500 text-center mt-4">No transactions yet.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserWallet;

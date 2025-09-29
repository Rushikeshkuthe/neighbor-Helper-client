import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { apiGET, apiPUT } from "../../utils/apiHelpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const requesterId = userData?.id;
  const { id } = useParams();
  const location = useLocation();
  const { acceptedUserId, reward } = location.state || {};
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(null);

  // Fetch wallet of accepted user
  async function getUserWallet() {
    try {
      const response = await apiGET(`v1/wallet/getWalletById/${acceptedUserId}`);
      if (response.data.status === 200) {
        setWallet(response.data.data.wallet);
      }
    } catch (error) {
      console.error("Error while fetching wallet", error);
    }
  }

  useEffect(() => {
    getUserWallet();
  }, []);

  // Handle Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await apiPUT(`v1/wallet/makePayment`, {
        taskId: id,
        acceptedUserId: acceptedUserId,
        requestedUserId: requesterId,
        amount: reward,
      });

      if (response.data.status === 200) {
        setMsg(response.data.message);

        // Update task status to completed
        try {
          const taskUpdate = await apiPUT(`v1/task/acceptedTask/${id}`, {
            acceptUserId: acceptedUserId,
            status: "completed",
          });
          if (taskUpdate.data.status === 200) {
            setMsg("Payment successful. Task marked as Completed.");
            setTimeout(() => navigate("/home"), 1500);
          }
        } catch (error) {
          console.error("Error updating task", error);
          setMsg("Payment done but failed to update task status.");
        }
      } else {
        setMsg("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error while processing payment", error);
      setMsg("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex justify-center items-start p-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800">
        <div className="bg-gray-100 rounded-3xl w-full max-w-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
            Payment
          </h1>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              disabled
              value={wallet?.address || ""}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              disabled
              value={reward}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full p-4 rounded-2xl text-white font-semibold shadow-lg transition ${
              loading
                ? "bg-green-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing Payment ✔️" : "Proceed Payment"}
          </button>

          {msg && (
            <p className="text-center mt-4 font-semibold text-indigo-800">
              {msg}
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;

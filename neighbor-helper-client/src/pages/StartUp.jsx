import React, { useEffect } from "react";
import startUp from "../assets/startup.jpg";
import logo from "../assets/logo.svg";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { animate } from "motion";

const StartUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Heading animation
    animate(".heading", { y: [50, 0], opacity: [0, 1] }, { duration: 1 });

    // Paragraph animation
    animate(".para", { opacity: [0, 1], x: [-50, 0] }, { delay: 0.6, duration: 1 });

    // Buttons animation
    animate(".btn", { scale: [0.8, 1], opacity: [0, 1] }, { delay: 1, duration: 0.6 });

    // Right image animation
    animate(".right-img", { opacity: [0, 1], scale: [0.9, 1] }, { delay: 1.2, duration: 1 });
  }, []);

  // Hover animations
  const handleHover = (e) => {
    animate(
      e.currentTarget,
      { scale: 1.1, rotate: 2 },
      { duration: 0.3, easing: "ease-in-out" }
    );
  };

  const handleHoverEnd = (e) => {
    animate(e.currentTarget, { scale: 1, rotate: 0 }, { duration: 0.3 });
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-indigo-900 min-h-screen p-8">
        <div className="bg-white shadow-xl rounded-2xl grid md:grid-cols-2 overflow-hidden max-w-full">
          {/* left section */}
          <div className="bg-indigo-800 text-white p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8">
              <img src={logo} alt="landing img" className="w-8 h-8" />
              <h1 className="text-2xl font-bold">NEIGHBOR HELPER</h1>
            </div>
            <h2 className="text-4xl font-bold mb-6 heading">
              Community help made easy.
            </h2>
            <p className="text-gray-300 mb-8 para">
              A platform where neighbors help each other with daily tasks.
              From grocery pickup to repairs, TaskShare makes it simple
              to connect, share, and support your community.
            </p>
            <div className="flex gap-4">
              <button
                className="px-6 py-6 bg-teal-400 text-indigo-900 rounded-full font-semibold hover:bg-teal-500 transition btn"
                onClick={() => {
                  navigate("/login");
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverEnd}
              >
                Get Started
              </button>
              <button
                className="px-6 py-3 border border-gray-300 text-white rounded-full font-semibold hover:bg-indigo-600 transition flex items-center gap-2 btn"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverEnd}
              >
                Learn More <FaArrowRight />
              </button>
            </div>
          </div>

          {/* right section */}
          <div className="flex item-center justify-center bg-white p-10">
            <img
              src={startUp}
              alt="community helper"
              className="w-full right-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartUp;

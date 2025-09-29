
import React from 'react';
import logo from "../assets/logo.svg";
import { BiTask } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { IoWalletOutline, IoSettingsOutline } from 'react-icons/io5';
import { RiMessageLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const menuItems = [
  { label: 'Home', icon: <FaHome size={18} />, path: '/home' },
  { label: 'My Task', icon: <BiTask size={18} />, path: '/mytask' },
  { label: 'Message', icon: <RiMessageLine size={18} />, path: '/message' },
  { label: 'Wallet', icon: <IoWalletOutline size={18} />, path: '/userwallet' },
  { label: 'Settings', icon: <IoSettingsOutline size={18} />, path: '/setting' }
];

const Sidebar = () => {
  const userdata = JSON.parse(localStorage.getItem('user'));
  const userName = userdata?.username || "User";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };


  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    }),
    hover: { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' },
  };

  return (
    <motion.aside
      className="fixed top-0 left-0 h-screen w-60 bg-gray-900 text-white flex flex-col"
      initial="hidden"
      animate="visible"
      
    >
      {/* Logo */}
      <div className="flex items-center gap-2 m-5">
        <img src={logo} alt="logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold text-indigo-600">NEIGHBOR HELPER</h1>
      </div>

      {/* Profile */}
      <div className="p-6 flex flex-col items-center justify-center border-b border-gray-700">
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-center">Hello {userName}</h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.a
            key={item.path}
            href={item.path}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={menuItemVariants}
            whileHover="hover"
            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer"
          >
            {item.icon} {item.label}
          </motion.a>
        ))}
      </nav>

      {/* Logout */}
      <motion.div className="m-5">
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#4b5563' }}
          whileTap={{ scale: 0.95 }}
          className="w-full rounded-2xl bg-indigo-700 p-3 transition-colors text-white font-semibold"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;

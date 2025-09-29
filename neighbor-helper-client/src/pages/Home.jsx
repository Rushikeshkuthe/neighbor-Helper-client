import React, { useEffect, useState } from 'react';
import MainLayout from '../layout/MainLayout';
import TaskCard from '../component/TaskCard';
import { apiGET } from '../../utils/apiHelpers';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const curUserId = currentUser?.id;
    const navigate = useNavigate();
    const [task, setTask] = useState([]);

    async function getAllTask() {
        try {
            const response = await apiGET(`v1/task/getallTask`);
            if (response.data.status === 200) {
                const allTasks = response.data.data;
                const sortedTasks = allTasks.filter(
                    (t) => t.acceptedUserId === null && t.userId !== curUserId
                );
                setTask(sortedTasks);
            } else {
                console.error('Something went wrong');
            }
        } catch (error) {
            console.error('Unable to fetch task', error);
        }
    }

    useEffect(() => {
        getAllTask();
    }, []);

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleAccept = (id) => {
        navigate(`/taskdetail/${id}`);
    };

    // Motion variants for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
        }),
        hover: { scale: 1.03, boxShadow: '0px 15px 30px rgba(0,0,0,0.15)' },
        tap: { scale: 0.97 },
    };

    return (
        <MainLayout>
            <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 p-6">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, type: 'spring' }}
                    className="bg-gray-100 rounded-3xl w-full max-w-7xl p-6 shadow-2xl"
                >
                    <h1 className="text-4xl font-bold mb-6 text-indigo-800 text-center md:text-left">
                        Available Tasks
                    </h1>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-3 lg:grid-cols-3 gap-6"
                    >
                        {task.map((t, index) => (
                            <motion.div
                                key={t._id}
                                custom={index}
                                variants={cardVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <TaskCard
                                    title={t.title}
                                    date={formattedDate(t.createdAt)}
                                    description={t.description}
                                    location={t.address}
                                    reward={t.reward}
                                    onAccept={() => handleAccept(t._id)}
                                    context="home"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </MainLayout>
    );
};

export default Home;

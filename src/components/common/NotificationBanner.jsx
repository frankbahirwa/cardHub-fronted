import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaTimes } from "react-icons/fa";
import api from "../../services/api";

const NotificationBanner = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        api
            .get("/api/notifications")
            .then((res) => {
                console.log("API Response:", res.data);
                setNotifications(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => console.error("Error fetching notifications:", err));
    }, []);

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
    };

    if (notifications.length === 0) return null;

    return (
        <div className="absolute top-32 right-2 z-50 lg:w-full w-90 max-w-lg">
            <AnimatePresence>
                {notifications.map((notif) => (
                    <motion.div
                        key={notif._id}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="mb-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg rounded-lg p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <FaBell className="text-2xl text-black" />
                            <div>
                                <p className="font-semibold">{notif.title}</p>
                                <p className="text-sm">{notif.message}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => removeNotification(notif._id)}
                            className="text-black hover:text-gray-700 transition"
                        >
                            <FaTimes />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBanner;

import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Button from "../common/Button";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NotificationManager = () => {
    const [notifications, setNotifications] = useState([]);
    const [formData, setFormData] = useState({ title: "", message: "" });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false); // 🔹 loader state

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/notifications");
            setNotifications(res.data);
        } catch (err) {
            console.error("Error fetching notifications:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await api.put(`/api/notifications/${editingId}`, formData);
            } else {
                await api.post("/api/notifications", formData);
            }
            await fetchNotifications();
            setFormData({ title: "", message: "" });
            setEditingId(null);
            setShowForm(false);
        } catch (err) {
            console.error("Error saving notification:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (notif) => {
        setFormData({ title: notif.title, message: notif.message });
        setEditingId(notif._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/api/notifications/${id}`);
            await fetchNotifications();
        } catch (err) {
            console.error("Error deleting notification:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative p-6">
            <h2 className="text-3xl font-bold mb-6 text-white">Manage Notifications</h2>

            {/* 🔹 Loader Overlay */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Add Button */}
            {!showForm && !loading && (
                <motion.button
                    onClick={() => {
                        setShowForm(true);
                        setEditingId(null);
                        setFormData({ title: "", message: "" });
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-lg"
                >
                    <FaPlus size={20} />
                </motion.button>
            )}

            {/* Collapsible Form */}
            <AnimatePresence>
                {showForm && !loading && (
                    <motion.form
                        onSubmit={handleSubmit}
                        className="bg-gray-800 p-5 rounded-lg mb-6 shadow-lg border border-gray-700"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 w-full mb-3"
                            required
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message"
                            className="p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 w-full mb-3"
                            required
                        />
                        <div className="flex gap-3">
                            <Button type="submit" className="hover:bg-yellow-600 text-black">
                                {editingId ? "Update" : "Add"} Notification
                            </Button>
                            <Button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingId(null);
                                }}
                                className="bg-gray-500 hover:bg-gray-600"
                            >
                                Cancel
                            </Button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Notifications List */}
            <AnimatePresence>
                {!loading && notifications.length > 0 ? (
                    <motion.ul
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {notifications.map((notif) => (
                            <motion.li
                                key={notif._id}
                                className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:scale-[1.02] hover:shadow-xl transition-transform"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <div>
                                    <h4 className="text-lg font-semibold text-white">{notif.title}</h4>
                                    <p className="text-gray-400">{notif.message}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        onClick={() => handleEdit(notif)}
                                        className="hover:bg-yellow-600 text-black"
                                    >
                                        <FaEdit size={16} />
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(notif._id)}
                                        className="hover:bg-red-700"
                                    >
                                        <FaTrash size={16} />
                                    </Button>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                ) : (
                    !loading && (
                        <motion.p
                            className="text-gray-400 mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            No notifications found.
                        </motion.p>
                    )
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationManager;

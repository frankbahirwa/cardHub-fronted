// src/components/admin/TestimonialManager.js
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Button from "../common/Button";
import { FaCheckCircle, FaTrash, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialManager = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await api.get("/api/testimonials/pending");
            console.log("Fetched testimonials:", res.data);
            setTestimonials(res.data);
        } catch (err) {
            console.error("Error fetching testimonials:", err);
        }
    };

    const handleApprove = async (id) => {
        try {
            await api.post(`/api/testimonials/${id}/approve`);
            fetchTestimonials();
        } catch (err) {
            console.error("Error approving testimonial:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/testimonials/${id}`);
            fetchTestimonials();
        } catch (err) {
            console.error("Error deleting testimonial:", err);
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">
                <FaUserCircle className="text-blue-500" /> Manage Testimonials
            </h2>

            <AnimatePresence>
                {testimonials.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="flex items-center mb-3 gap-3">
                                    <FaUserCircle className="text-yellow-400 text-3xl" />
                                    <div>
                                        <p className="text-white font-semibold">{testimonial.name}</p>
                                        <p
                                            className={`text-sm font-medium px-2 py-1 rounded ${testimonial.approved
                                                ? "bg-green-600 text-white"
                                                : "bg-yellow-500 text-black"
                                                }`}
                                        >
                                            {testimonial.approved ? "Approved" : "Pending"}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4">"{testimonial.message}"</p>

                                <div className="flex gap-3">
                                    {!testimonial.approved && (
                                        <Button
                                            onClick={() => handleApprove(testimonial._id)}
                                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
                                        >
                                            <FaCheckCircle /> Approve
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => handleDelete(testimonial._id)}
                                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
                                    >
                                        <FaTrash /> Delete
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.p
                        className="text-gray-400 text-lg mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No testimonials found.
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TestimonialManager;

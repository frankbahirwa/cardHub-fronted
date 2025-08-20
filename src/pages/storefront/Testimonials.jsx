// src/pages/storefront/Testimonials.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialsList from '../../components/storefront/TestmonialsList';
import TestimonialForm from '../../components/storefront/TestimonialForm';
import { FaPlus } from 'react-icons/fa';

const Testimonials = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(!showForm);

    return (
        <div className="container mx-auto px-4 py-12 text-white">
            {/* Header with Toggle Button */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Customer Testimonials
                </h1>
                <button
                    onClick={toggleForm}
                    className="w-12 h-12 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title={showForm ? "Close Form" : "Add Testimonial"}
                >
                    <FaPlus color='white' className={showForm ? "transform rotate-45 transition-transform" : "transition-transform"} />
                </button>
            </div>


            {/* Animated Testimonial Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="mt-8 bg-gray-800 p-6 rounded-xl shadow-xl"
                    >
                        <h2 className="text-2xl font-bold mb-4">Share Your Thoughts</h2>
                        <p className="text-gray-300 mb-4">
                            We value your feedback! Please leave your testimonial below. Your avatar and details help us ensure authenticity and security.
                        </p>
                        <TestimonialForm />
                    </motion.div>
                )}
            </AnimatePresence> <br /><br />
            {/* Testimonials List */}
            <TestimonialsList />
        </div>
    );
};

export default Testimonials;

// src/components/storefront/TestimonialsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import TestimonialItem from '../common/TestmonialItem';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const TestimonialsList = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/testimonials`)
            .then((res) => {
                console.log('received testimonial' , res.data)
                setTestimonials(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching testimonials:', err);
                setTestimonials([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400"></div>
            </div>
        );
    }

    if (testimonials.length === 0) {
        return (
            <p className="text-center text-gray-400 py-12">
                No testimonials yet. Be the first to share your experience!
            </p>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {testimonials.map((testimonial) => (
                <motion.div key={testimonial._id} variants={itemVariants}>
                    <TestimonialItem testimonial={testimonial} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default TestimonialsList;

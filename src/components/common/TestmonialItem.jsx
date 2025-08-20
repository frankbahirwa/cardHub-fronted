// src/components/common/TestimonialItem.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaUserShield } from 'react-icons/fa';
import User from '../../assets/images/User.png';

const TestimonialItem = ({ testimonial }) => {
    return (
        <motion.div
            className="bg-gray-800 rounded-xl shadow-xl p-6 text-white flex flex-col items-start gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* Animated Quote Icon */}
            <div className="flex items-center gap-2">
                <FaQuoteLeft className="text-yellow-400 text-2xl animate-pulse" />
                <p className="text-gray-300 italic text-sm">
                    We use avatars for security purposes and to make sure each testimonial is authentic.
                </p>
            </div>

            {/* Testimonial Message */}
            <p className="text-lg italic text-white">"{testimonial.message}"</p>

            {/* Avatar + Name */}
            <div className="flex items-center gap-3 mt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 animate-bounce">
                    <img
                        src={User}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 flex items-center gap-1 text-sm">
                        <FaUserShield className="text-blue-400" /> Verified User
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default TestimonialItem;

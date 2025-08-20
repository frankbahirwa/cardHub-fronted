import React, { useState } from 'react';
import Button from '../common/Button';
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TestimonialForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log('Submitting testimonial:', formData); // Log the request payload
            const response = await api.post('/api/testimonials', formData);
            console.log('Backend response:', response.data); // Log the backend response
            setSubmitted(true);
            toast.success('Thank you for your testimonial! It will be reviewed soon.');
        } catch (err) {
            console.error('Error submitting testimonial:', err);
            toast.error('Failed to submit your testimonial. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return <p className="text-green-400 text-center mt-4">Thank you for your testimonial! It will be reviewed soon.</p>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-md mx-auto relative"
        >
            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-10">
                    <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-12 h-12 animate-spin"></div>
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="p-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-600 w-full mb-4"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email (optional)"
                className="p-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-600 w-full mb-4"
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message here"
                className="p-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-600 w-full mb-4"
                rows="4"
                required
            />
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </Button>
        </form>
    );
};

export default TestimonialForm;

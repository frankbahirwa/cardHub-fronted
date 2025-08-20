import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

const NonFreshCardForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Receive data from CheckoutForm
    const stateData = location.state || {};
    const totalAmount = stateData.totalAmount || 0;
    const cardType = stateData.cardType || 'BankCard'; // default type
    const userEmail = stateData.email || '';

    const [formData, setFormData] = useState({
        email: userEmail,
        totalAmount: totalAmount,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: formData.email,
            totalAmount: formData.totalAmount,
            cardType: cardType,
        };

        try {
            setLoading(true);
            console.log('Submitting payload:', payload);

            const response = await api.post('/api/normals', payload);

            console.log('Order response:', response.data);

            alert('Order placed successfully!');
            navigate('/cart');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 relative">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 animate-spin"></div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold text-white mb-4">Non-Fresh Card Order</h2>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Submit Order'}
                </button>
            </form>
        </div>
    );
};

export default NonFreshCardForm;

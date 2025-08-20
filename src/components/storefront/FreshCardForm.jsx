import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api'; // your axios instance

// Payment method mapping
const PAYMENT_METHODS = {
    BTC: '1C48ZNuVNV2EUmMvueiSE9D3t183eBj5Kn',
    USDT: 'TMfCPUsCBaMtjY2qfjkJd5V72HAvSmppiz',
    LTC: '0x1ac3a5ecfda670abafde4758ffe8bd9f7d17d247',
    SOL: '0x1ac3a5ecfda670abafde4758ffe8bd9f7d17d247',
    USDC: '0x1ac3a5ecfda670abafde4758ffe8bd9f7d17d247',
    ETH: '0x1ac3a5ecfda670abafde4758ffe8bd9f7d17d247',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
};

const FreshCardForm = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const stateData = location.state || {};
    const cardData = stateData?.cardData || null;
    const totalAmount = stateData?.totalAmount || 0;
    const selectedPaymentMethod = stateData?.paymentMethod || 'BTC';
    const userEmail = stateData?.email || '';

    const [formData, setFormData] = useState({
        name: '',
        email: userEmail,
        dob: '',
        phone: '',
        ssn: '',
        address: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitOrder = async () => {
        // Validate all fields
        if (!formData.name || !formData.email || !formData.dob || !formData.phone || !formData.ssn || !formData.address) {
            alert('Please fill in all required fields.');
            return;
        }

        // Get payment address dynamically
        const paymentAddress = PAYMENT_METHODS[selectedPaymentMethod];
        if (!paymentAddress) {
            alert('Invalid payment method.');
            return;
        }

        const payload = {
            cardType: 'FreshCard',
            cards: [{ card: cardData.id }],
            buyerInfo: { ...formData },
            paymentMethod: selectedPaymentMethod,
            paymentAddress,
            totalAmount,
        };

        try {
            setLoading(true);
            console.log('Sending purchase order payload:', payload);
            const response = await api.post('/api/purchases', payload);
            console.log('Purchase order response:', response.data);

            clearCart();

            navigate('/checkout', {
                state: {
                    cardData,
                    totalAmount,
                    paymentMethod: selectedPaymentMethod,
                    email: formData.email,
                    qrCodeData: response.data.qrCodeData,
                    orderId: response.data.orderId,
                },
            });
        } catch (error) {
            console.error('Error creating purchase order:', error);
            alert('Failed to create purchase order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 min-h-screen relative">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 animate-spin"></div>
                </div>
            )}

            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-xl bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-blue-800"
            >
                <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center drop-shadow-lg">
                    Fresh Card Order
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-blue-200">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full name"
                            className="w-full p-2 rounded bg-gray-800 text-white border border-blue-700 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-blue-200">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 rounded bg-gray-800 text-white border border-blue-700 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-blue-200">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 text-white border border-blue-700 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-blue-200">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full p-2 rounded bg-gray-800 text-white border border-blue-700 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* SSN */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-blue-200">SSN</label>
                        <input
                            type="text"
                            name="ssn"
                            value={formData.ssn}
                            onChange={handleChange}
                            placeholder="SSN"
                            className="w-full p-2 rounded bg-gray-800 text-white border border-blue-700 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1 text-blue-200">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Home address"
                            className="w-full p-2 rounded bg-gray-800 text-white border border-blue-700 focus:ring-2 focus:ring-blue-400 resize-none"
                            rows={2}
                            required
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSubmitOrder}
                    className="w-full mt-5 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-2 rounded-lg shadow-lg transition-all duration-200"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Submit Order'}
                </button>
            </form>
        </div>
    );
};

export default FreshCardForm;
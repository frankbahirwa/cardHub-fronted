import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { FaClock, FaTag, FaCreditCard, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://cardhub-backend.onrender.com';

const CardDescription = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cardDetails, setCardDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    useEffect(() => {
        const fetchCard = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!id) {
                    throw new Error('Card ID is missing in URL');
                }
                console.log('Sending API request for card ID:', id);
                const res = await api.post('/api/cards/id', { id });
                console.log('API response:', res.data);
                if (!res.data) {
                    throw new Error('No card data returned');
                }
                setCardDetails(res.data);
            } catch (err) {
                console.error('Error fetching card details:', err.response?.data || err.message);
                setError(err.response?.data?.message || err.message || 'Failed to fetch card details');
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [id]);

    const handleAddToCart = () => {
        if (!cardDetails) return;

        addToCart({
            id: cardDetails._id,
            title: cardDetails.title,
            price: cardDetails.price,
            cardType: cardDetails.cardType,
        });

    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error || !cardDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-xl text-red-400">
                    {error || 'Failed to load card details. Please try again later.'}
                </p>
            </div>
        );
    }

    const deliveryTime = "3 days";
    const getCardTypeDisplay = (cardType) => {
        switch (cardType) {
            case 'FreshCard':
                return 'Fresh Card';
            case 'AgedCard':
                return 'Aged Card';
            case 'BankCard':
                return 'Bank Logs';
            default:
                return cardType;
        }
    };
    const cardTypeMessage =
        cardDetails.cardType === 'FreshCard'
            ? 'This is a Fresh Card.'
            : cardDetails.cardType === 'AgedCard'
                ? 'This is an Aged Card.'
                : 'This is a Bank Logs.';

    return (
        <motion.div
            className="p-6 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="max-w-4xl mx-auto text-white  rounded-lg overflow-hidden"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                <div className="p-6">
                    <h1 className="text-4xl font-bold mb-4 text-white flex items-center gap-2">
                        <FaCreditCard className="text-blue-500" /> {cardDetails.title}
                    </h1>

                    <motion.div
                        className="mb-6 bg-gray-700 rounded-xl shadow-inner overflow-hidden"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative">
                            {cardDetails.imageUrl && (
                                <img
                                    src={`${API_BASE}${cardDetails.imageUrl}`}
                                    alt={cardDetails.title}
                                    className="h-64 relative left-60 top-20 object-fit rounded-t-xl"
                                    onError={(e) => {
                                        console.error(`Failed to load image: ${API_BASE}${cardDetails.imageUrl}`);
                                        e.target.src = `${API_BASE}/images/default-card.png`;
                                    }}
                                />
                            )}
                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {getCardTypeDisplay(cardDetails.cardType)}
                            </div>
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-white mb-2">{cardDetails.title}</h2>
                            <p className="text-gray-300 mb-2 flex items-center gap-2">
                                <FaCreditCard className="text-blue-400" /> Bank: {cardDetails.bank || 'N/A'}
                            </p>

                            {cardDetails.cardType === 'BankCard' && cardDetails.balance && (
                                <p className="text-green-400 mb-2 flex items-center gap-2">
                                    <FaCreditCard className="text-green-400" /> Balance: ${cardDetails.balance}
                                </p>
                            )}
                            {cardDetails.cardType === 'AgedCard' && cardDetails.usageDurationMonths && (
                                <p className="text-blue-400 mb-2 flex items-center gap-2">
                                    <FaClock className="text-blue-400" /> Aged: {cardDetails.usageDurationMonths} months
                                </p>
                            )}
                            {cardDetails.cardType === 'AgedCard' && cardDetails.condition && (
                                <p className="text-gray-300 mb-2 flex items-center gap-2">
                                    <FaTag className="text-gray-300" /> Condition: {cardDetails.condition}
                                </p>
                            )}
                            {cardDetails.description && (
                                <p className="text-gray-400 mt-4">{cardDetails.description}</p>
                            )}
                            <motion.button
                                onClick={handleAddToCart}
                                className="mt-4 bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 transition flex items-center gap-2 w-full justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaShoppingCart size={20} /> Add to Cart
                            </motion.button>
                        </div>
                    </motion.div>

                    <div className="flex items-center gap-4 mb-4">
                        <FaClock className="text-white text-xl" />
                        <p className="text-md text-white font-semibold">
                            Delivery Time: {deliveryTime}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <FaTag className="text-white text-xl" />
                        <p className="text-md text-white font-semibold">{cardTypeMessage}</p>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <FaCreditCard className="text-white text-xl" />
                        <p className="text-md text-yellow-400 font-semibold">
                            Price: ${cardDetails.price || 'N/A'}
                        </p>
                    </div>



                    {cardDetails.cardType === 'BankCard' && cardDetails.balance && (
                        <div className="flex items-center gap-4 mb-4">
                            <FaCreditCard className="text-white text-xl" />
                            <p className="text-md text-green-400 font-semibold">
                                Balance: ${cardDetails.balance}
                            </p>
                        </div>
                    )}

                    {cardDetails.cardType === 'AgedCard' && cardDetails.usageDurationMonths && (
                        <div className="flex items-center gap-4 mb-4">
                            <FaClock className="text-white text-xl" />
                            <p className="text-md text-blue-400 font-semibold">
                                Aged: {cardDetails.usageDurationMonths} months
                            </p>
                        </div>
                    )}

                    {cardDetails.cardType === 'AgedCard' && cardDetails.condition && (
                        <div className="flex items-center gap-4 mb-4">
                            <FaTag className="text-white text-xl" />
                            <p className="text-md text-gray-300 font-semibold">
                                Condition: {cardDetails.condition}
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CardDescription;
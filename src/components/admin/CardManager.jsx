import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button.jsx';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://cardhub-backend.onrender.com';

const CardManager = () => {
    const [cards, setCards] = useState([]);
    const [formData, setFormData] = useState(defaultFormState());
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function defaultFormState() {
        return {
            cardType: 'FreshCard',
            title: '',
            bank: '',
            price: '',
            stockQuantity: 1,
            imageFile: null,
            imagePreview: '',
            balance: '',
            usageDurationMonths: '',
            condition: '',
            cardNumber: '',
            password: ''
        };
    }

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/cards');
            setCards(res.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch cards. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imageFile') {
            const file = files[0];
            setFormData({
                ...formData,
                imageFile: file,
                imagePreview: file ? URL.createObjectURL(file) : ''
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUpdate = async (id, updates) => {
        setLoading(true);
        try {
            const { image, imageFile, imagePreview, ...filteredUpdates } = updates;

            if (!filteredUpdates.cardType) {
                filteredUpdates.cardType = formData.cardType;
            }

            await api.put(`/api/cards/${id}`, filteredUpdates, {
                headers: { 'Content-Type': 'application/json' },
            });

            alert('Card updated successfully');
            fetchCards();
        } catch (err) {
            console.error(err);
            setError('Failed to update card. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const formPayload = new FormData();
            formPayload.append('cardType', formData.cardType);
            formPayload.append('title', formData.title);
            formPayload.append('bank', formData.bank);
            formPayload.append('price', formData.price);
            formPayload.append('stockQuantity', formData.stockQuantity);
            formPayload.append('cardNumber', formData.cardNumber);
            formPayload.append('password', formData.password);

            if (formData.cardType === 'BankCard') formPayload.append('balance', formData.balance);
            if (formData.cardType === 'AgedCard') {
                formPayload.append('usageDurationMonths', formData.usageDurationMonths);
                formPayload.append('condition', formData.condition);
            }

            if (formData.imageFile) formPayload.append('image', formData.imageFile);

            if (editingId) {
                await handleUpdate(editingId, formPayload);
            } else {
                await api.post('/api/cards', formPayload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Card created successfully');
            }

            fetchCards();
            setFormData(defaultFormState());
            setEditingId(null);
            setShowForm(false);
        } catch (err) {
            console.error(err);
            setError('Failed to save card. Check required fields.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (card) => {
        setFormData({
            ...defaultFormState(),
            ...card,
            imageFile: null,
            imagePreview: card.imageUrl ? `${API_BASE}${card.imageUrl}` : '',
            balance: card.balance || '',
            usageDurationMonths: card.usageDurationMonths || '',
            condition: card.condition || ''
        });
        setEditingId(card._id);
        setShowForm(true);
        setError(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this card?')) return;
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/api/cards/${id}`);
            alert('Card deleted successfully');
            fetchCards();
        } catch (err) {
            console.error(err);
            setError('Failed to delete card. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getCardTypeDisplay = (cardType) => {
        switch (cardType) {
            case 'FreshCard': return 'Fresh Card';
            case 'AgedCard': return 'Aged Card';
            case 'BankCard': return 'Bank Logs';
            default: return cardType;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 text-white relative max-w-7xl">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
                </div>
            )}

            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-100">
                <FiCreditCard className="text-yellow-500 text-4xl" /> Manage Cards
            </h2>

            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6 shadow-md">
                    {error}
                </div>
            )}

            <motion.button
                className="fixed right-8 bottom-8 bg-yellow-500 text-gray-900 p-4 rounded-full shadow-lg hover:bg-yellow-400 transition-colors z-40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
            >
                <FiPlus size={24} />
            </motion.button>

            <AnimatePresence>
                {showForm && (
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-xl mb-8 border border-gray-700"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                name="cardType"
                                value={formData.cardType}
                                onChange={handleChange}
                                disabled={editingId}
                                className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                            >
                                <option value="FreshCard">Fresh Card</option>
                                <option value="AgedCard">Aged Card</option>
                                <option value="BankCard">Bank Logs</option>
                            </select>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                required
                            />
                            <input
                                type="text"
                                name="bank"
                                value={formData.bank}
                                onChange={handleChange}
                                placeholder="Bank"
                                className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                required
                            />
                            <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                placeholder="Stock Quantity"
                                className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                required
                            />
                            <div className="col-span-1 md:col-span-2">
                                <input
                                    type="file"
                                    name="imageFile"
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                    accept="image/*"
                                />
                                {formData.imagePreview && (
                                    <img
                                        src={formData.imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg mt-4 border border-gray-600"
                                    />
                                )}
                            </div>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="Card Number"
                                className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                required
                            />
                            <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                required
                            />
                            {formData.cardType === 'BankCard' && (
                                <input
                                    type="number"
                                    name="balance"
                                    value={formData.balance}
                                    onChange={handleChange}
                                    placeholder="Balance"
                                    className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                    required
                                />
                            )}
                            {formData.cardType === 'AgedCard' && (
                                <>
                                    <input
                                        type="number"
                                        name="usageDurationMonths"
                                        value={formData.usageDurationMonths}
                                        onChange={handleChange}
                                        placeholder="Usage Duration (Months)"
                                        className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        placeholder="Condition"
                                        className="w-full p-3 rounded-lg bg-gray-700/50 text-gray-200 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                                        required
                                    />
                                </>
                            )}
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-md transition"
                            >
                                {editingId ? 'Update' : 'Add'} Card
                            </Button>
                            {editingId && (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setFormData(defaultFormState());
                                        setEditingId(null);
                                        setShowForm(false);
                                    }}
                                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2.5 rounded-lg shadow-md transition"
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <motion.div
                            key={card._id}
                            className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl border border-gray-700 flex flex-col transition-all duration-300 hover:border-blue-500/50"
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            {card.imageUrl && (
                                <img
                                    src={`${API_BASE}${card.imageUrl}`}
                                    alt={card.title}
                                    className="w-full h-48 object-cover flex-shrink-0"
                                    onError={(e) => {
                                        e.target.src = `${API_BASE}/images/default-card.png`;
                                    }}
                                />
                            )}
                            <div className="p-5 flex flex-col justify-between flex-grow">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-100 mb-1">{card.title}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{card.bank} - {getCardTypeDisplay(card.cardType)}</p>
                                    {card.cardType === 'BankCard' && (
                                        <p className="text-green-400 text-sm font-medium mb-1">Balance: ${card.balance}</p>
                                    )}
                                    {card.cardType === 'AgedCard' && (
                                        <>
                                            <p className="text-blue-400 text-sm mb-1">Aged: {card.usageDurationMonths} months</p>
                                            <p className="text-gray-400 text-sm mb-1">Condition: {card.condition}</p>
                                        </>
                                    )}
                                    <p className="text-yellow-400 font-bold text-lg mb-1">Price: ${card.price}</p>
                                    <p className="text-gray-400 text-sm">Stock: {card.stockQuantity}</p>
                                </div>
                                <div className="flex justify-end mt-4 gap-2">
                                    <motion.button
                                        onClick={() => handleEdit(card)}
                                        className="p-2.5 rounded-lg bg-gray-700/50 text-yellow-400 hover:bg-gray-600/50 transition shadow-sm"
                                        title="Edit Card"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiEdit size={20} />
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleDelete(card._id)}
                                        className="p-2.5 rounded-lg bg-gray-700/50 text-red-400 hover:bg-gray-600/50 transition shadow-sm"
                                        title="Delete Card"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiTrash2 size={20} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-gray-400 col-span-full text-center py-8">No cards available yet. Add one to get started.</p>
                )}
            </div>
        </div>
    );
};

export default CardManager;
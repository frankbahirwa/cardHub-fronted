import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button.jsx';

const API_BASE = 'https://cardhub-backend.onrender.com';

const CardManager = () => {
    
    const [cards, setCards] = useState([]);
    const [formData, setFormData] = useState(defaultFormState());
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);

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
        try {
            const res = await api.get('/api/cards');
            console.log('Cards fetched:', res.data);
            setCards(res.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching cards:', err);
            setError('Failed to fetch cards. Please try again.');
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
        try {
            // Ensure required fields are included and exclude only the image-related fields
            const {
                image, // Exclude image
                imageFile, // Exclude imageFile
                imagePreview, // Exclude imagePreview
                ...filteredUpdates
            } = updates;

            // Include cardType explicitly from formData if not present in updates
            if (!filteredUpdates.cardType) {
                filteredUpdates.cardType = formData.cardType;
            }

            const response = await api.put(`/api/cards/${id}`, filteredUpdates, {
                headers: { 'Content-Type': 'application/json' },
            });

            alert('Card updated successfully');
            fetchCards();
        } catch (err) {
            console.error('Error updating card:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to update card. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            if (formData.cardType === 'BankCard') {
                formPayload.append('balance', formData.balance);
            }
            if (formData.cardType === 'AgedCard') {
                formPayload.append('usageDurationMonths', formData.usageDurationMonths);
                formPayload.append('condition', formData.condition);
            }

            if (formData.imageFile) {
                formPayload.append('image', formData.imageFile);
            }

            if (editingId) {
                // Delegate update logic to handleUpdate
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
            console.error('Error saving card:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to save card. Check required fields.');
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
        if (!window.confirm('Are you sure you want to delete this card?')) {
            return;
        }
        setError(null);
        try {
            await api.delete(`/api/cards/${id}`);
            alert('Card deleted successfully');
            fetchCards();
        } catch (err) {
            console.error('Error deleting card:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to delete card. Please try again.');
        }
    };

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

    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FiCreditCard className="text-yellow-400" /> Manage Cards
            </h2>

            {error && (
                <div className="bg-red-600 text-white p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <motion.button
                className="fixed right-2 bottom-5 bg-yellow-400 text-black p-2 rounded-full shadow-lg hover:bg-yellow-300 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
            >
                <FiPlus size={24} />
            </motion.button>

            <AnimatePresence>
                {showForm && (
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                name="cardType"
                                value={formData.cardType}
                                onChange={handleChange}
                                disabled={editingId}
                                className="p-3 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-600"
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
                                className="p-3 rounded bg-gray-700"
                                required
                            />
                            <input
                                type="text"
                                name="bank"
                                value={formData.bank}
                                onChange={handleChange}
                                placeholder="Bank"
                                className="p-3 rounded bg-gray-700"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="p-3 rounded bg-gray-700"
                                required
                            />
                            <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                placeholder="Stock Quantity"
                                className="p-3 rounded bg-gray-700"
                                required
                            />
                            <input
                                type="file"
                                name="imageFile"
                                onChange={handleChange}
                                className="p-3 rounded bg-gray-700 text-white"
                                accept="image/*"
                            />
                            {formData.imagePreview && (
                                <img
                                    src={formData.imagePreview}
                                    alt="Preview"
                                    className="w-full h-44 object-cover rounded-md mt-2"
                                />
                            )}
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="Card Number"
                                className="p-3 rounded bg-gray-700"
                                required
                            />
                            <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="p-3 rounded bg-gray-700"
                                required
                            />
                            {formData.cardType === 'BankCard' && (
                                <input
                                    type="number"
                                    name="balance"
                                    value={formData.balance}
                                    onChange={handleChange}
                                    placeholder="Balance"
                                    className="p-3 rounded bg-gray-700"
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
                                        className="p-3 rounded bg-gray-700"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        placeholder="Condition"
                                        className="p-3 rounded bg-gray-700"
                                        required
                                    />
                                </>
                            )}
                        </div>
                        <div className="mt-4 flex gap-4">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <div
                            key={card._id}
                            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 flex flex-col"
                        >
                            {card.imageUrl && (
                                <img
                                    src={`${API_BASE}${card.imageUrl}`}
                                    alt={card.title}
                                    className="w-full h-44 object-cover flex-shrink-0"
                                    onError={(e) => {
                                        console.error(`Failed to load image: ${API_BASE}${card.imageUrl}`);
                                        e.target.src = `${API_BASE}/images/default-card.png`;
                                    }}
                                />
                            )}
                            <div className="p-4 flex flex-col justify-between flex-grow">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                                    <p className="text-gray-300">
                                        {card.bank} - {getCardTypeDisplay(card.cardType)}
                                    </p>
                                    {card.cardType === 'BankCard' && (
                                        <p className="text-green-400 mt-1">Balance: ${card.balance}</p>
                                    )}
                                    {card.cardType === 'AgedCard' && (
                                        <>
                                            <p className="text-blue-400 mt-1">
                                                Aged: {card.usageDurationMonths} months
                                            </p>
                                            <p className="text-gray-400 mt-1">
                                                Condition: {card.condition}
                                            </p>
                                        </>
                                    )}
                                    <p className="text-yellow-400 mt-2 font-semibold">
                                        Price: ${card.price}
                                    </p>
                                    <p className="text-gray-300 mt-1">Stock: {card.stockQuantity}</p>
                                </div>
                                <div className="flex justify-end mt-4 gap-3">
                                    <motion.button
                                        onClick={() => handleEdit(card)}
                                        className="p-2 rounded bg-gray-700 text-yellow-400 hover:bg-gray-600 hover:text-yellow-300 transition"
                                        title="Edit Card"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FiEdit size={20} />
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleDelete(card._id)}
                                        className="p-2 rounded bg-gray-700 text-red-500 hover:bg-gray-600 hover:text-red-400 transition"
                                        title="Delete Card"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FiTrash2 size={20} />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-300 col-span-full text-center">
                        No cards available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CardManager;
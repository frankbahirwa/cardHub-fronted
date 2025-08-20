import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import CardItem from '../../components/common/CardItem.jsx';
import FreshCardForm from '../../components/storefront/FreshCardForm.jsx';
import AgedCardSelector from '../../components/storefront/AgedCardSelector.jsx';
import Modal from '../../components/common/Modal.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cards = () => {
    const { type } = useParams(); // FreshCard, AgedCard, BankCard
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        api.get(`/api/cards/${type}`)
            .then((res) => {
                console.log('Fetched cards:', res.data); // Log the fetched cards
                if (Array.isArray(res.data)) {
                    setCards(res.data);
                } else {
                    console.warn('Unexpected response format:', res.data);
                    setCards([]); // Fallback to an empty array
                }
            })
            .catch((err) => {
                console.error('Error fetching cards:', err);
                setCards([]); // Fallback to an empty array on error
            });
    }, [type]);

    const handleAddToCart = (card) => {
        if (type === 'FreshCard') {
            setSelectedCard(card);
            setShowModal(true);
        } else if (type === 'AgedCard') {
            // Handled by AgedCardSelector
        } else {
            addToCart({ id: card._id, title: card.title, price: card.price, cardType: type });
            toast.success(`${card.title} added to cart!`);
        }
    };

    const handleFreshSubmit = (buyerInfo) => {
        addToCart({ id: selectedCard._id, title: selectedCard.title, price: selectedCard.price, cardType: type, buyerInfo });
        setShowModal(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="text-3xl font-bold mb-6 capitalize">{type} Cards</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        type === 'AgedCard' ? (
                            <AgedCardSelector
                                key={card._id}
                                card={card}
                                onSelect={(item) => addToCart({ id: card._id, title: card.title, price: card.price, cardType: type, agingMonths: item.agingMonths })}
                            />
                        ) : (
                                <>
                                    <CardItem
                                        key={card._id}
                                        card={card}
                                        onAddToCart={() => handleAddToCart(card)}
                                    />

                                </>
                            )
                    ))
                ) : (
                    <p>No cards available for this category.</p>
                )}
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <FreshCardForm onSubmit={handleFreshSubmit} />
            </Modal>
        </div>
    );
};

export default Cards;
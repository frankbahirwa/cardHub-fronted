import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../../components/storefront/CardList';

const Shop = () => {
    const navigate = useNavigate();

    const handleBuyNow = () => {
        alert('Thank you for your interest! Redirecting to checkout...');
        navigate('/checkout');
    };

    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="text-4xl font-bold mb-6">Shop Now</h1>
            <p className="text-lg text-gray-300 mb-6">
                Explore our collection of cards and find the perfect one for your needs.
            </p>
            <CardList />
        </div>
    );
};

export default Shop;

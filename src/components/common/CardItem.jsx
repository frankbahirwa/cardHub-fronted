import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_BASE = 'https://cardhub-backend.onrender.com';

const CardItem = ({ card, onAddToCart }) => {
    const location = useLocation();

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 text-white">
            <img
                src={card.imageUrl ? `${API_BASE}${card.imageUrl}` : `${API_BASE}/images/default-card.png`}
                alt={card.title}
                className="w-full h-48 object-cover rounded-md mb-4"
                onError={(e) => {
                    console.error(`Failed to load image: ${API_BASE}${card.imageUrl}`);
                    e.target.src = `${API_BASE}/images/default-card.png`; // Fallback image
                }}
            />
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-gray-300">Bank:{card.bank}</p>
            {card.balance && (
                <p className="text-green-400">Balance: ${card.balance}</p>
            )}
            {card.usageDurationMonths && (
                <p className="text-blue-400">Aged: {card.usageDurationMonths} months</p>
            )}
            {card.condition && (
                <p className="text-gray-400">Condition: {card.condition}</p>
            )}
            <p className="text-yellow-400">Price: ${card.price}</p>

            {/* Only show Add to Cart if NOT on /shop */}
            {location.pathname !== '/shop' && location.pathname !== '/' &&  (
                <Link
                    to={`/desc/${card._id}`}
                    className="lg:ml-60 ml-43 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Shop Now
                </Link>
            )}
        </div>
    );
};

export default CardItem;
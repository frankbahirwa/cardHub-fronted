import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import CardItem from '../common/CardItem';
import { FaCreditCard, FaHistory, FaUniversity } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Link } from 'react-router-dom';

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [collapsedSections, setCollapsedSections] = useState({});

    useEffect(() => {
        api.get('/api/cards')
            .then((res) => {
                console.log('Cards fetched:', res.data);
                setCards(res.data);
            })
            .catch((err) => console.error('Error fetching cards:', err));
    }, []);

    const groupedCards = cards.reduce(
        (acc, card) => {
            const category = card.cardType === 'BankCard' ? 'BankLogs' : card.cardType;
            acc[category] = acc[category] || [];
            acc[category].push(card);
            return acc;
        },
        { FreshCard: [], AgedCard: [], BankLogs: [] }
    );

    const sectionIcons = {
        FreshCard: <FaCreditCard className="text-blue-400 text-3xl mr-2 animate-bounce" />,
        AgedCard: <FaHistory className="text-yellow-400 text-3xl mr-2 animate-pulse" />,
        BankLogs: <FaUniversity className="text-green-400 text-3xl mr-2 animate-spin" />,
    };

    const sectionTitles = {
        FreshCard: 'Fresh Cards',
        AgedCard: 'Aged Cards',
        BankLogs: 'Bank Logs',
    };

    const toggleSection = (category) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <div className="space-y-8 animate-fade-in-slow">
            {Object.entries(groupedCards).map(([category, cards]) => (
                <div key={category} className="animate-slide-in">
                    <h2
                        className="text-2xl font-bold text-white mb-4 flex items-center cursor-pointer sticky top-0 bg-gray-800 px-2 py-3 rounded-lg z-10 justify-between"
                        onClick={() => toggleSection(category)}
                    >
                        <span className="flex items-center">
                            {sectionIcons[category]} {sectionTitles[category]}
                        </span>
                        <span className="flex mr-5 items-center gap-2">
                            {collapsedSections[category] ? (
                                <IoIosArrowDown className="text-xl" />
                            ) : (
                                <IoIosArrowUp className="text-xl" />
                            )}
                        </span>
                    </h2>
                    {!collapsedSections[category] && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-zoom-in">
                            {cards.length > 0 ? (
                                cards.map((card) => (
                                    <div key={card._id} className="relative">
                                        <CardItem card={card} />
                                        <Link
                                            to={`/desc/${card._id}`}
                                            className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Shop Now
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-300 col-span-full text-center">
                                    No {sectionTitles[category]} available.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CardList;
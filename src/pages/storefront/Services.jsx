import React from 'react';
import { FaCreditCard, FaHistory, FaUniversity } from 'react-icons/fa';
import demo from '../../assets/videos/demo.mp4';

const services = [
    {
        title: 'Fresh Cards',
        description:
            'Newly generated, instantly activated cards crafted for reliability and security. Perfect for seamless online transactions.',
        icon: <FaCreditCard className="text-5xl text-blue-400 mb-4 animate-bounce" />,
        animation: 'animate-fade-in',
    },
    {
        title: 'Aged Cards',
        description:
            'Cards with established usage history, ideal for building trust and meeting specific requirements with authentic records.',
        icon: <FaHistory className="text-5xl text-yellow-400 mb-4 animate-pulse" />,
        animation: 'animate-fade-in delay-200',
    },
    {
        title: 'Bank Logs',
        description:
            'Preloaded cards with verified balances and detailed transaction histories, competitively priced for your convenience.',
        icon: <FaUniversity className="text-5xl text-green-400 mb-4 animate-bounce" />,
        animation: 'animate-fade-in delay-400',
    },
];

const Services = () => (
    <section className="px-4 py-12 flex flex-col items-center relative font-sans">
        <h1 className="text-5xl font-extrabold text-white mb-10 text-center drop-shadow-lg animate-fade-in relative z-10 font-display">
            Our Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
            {services.map((service) => (
                <article
                    key={service.title}
                    className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-xl p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-blue-500/50 ${service.animation}`}
                >
                    {service.icon}
                    <h2 className="text-2xl font-bold text-white mb-4 text-center font-display">{service.title}</h2>
                    <p className="text-base text-gray-300 text-center font-light">{service.description}</p>
                </article>
            ))}
        </div>
        <div className="relative w-full max-w-6xl h-96 z-10 pointer-events-none overflow-hidden rounded-lg mt-12">
            <video
                src={demo}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
                style={{ opacity: 0.25 }}
            />
        </div>
        <div className="mt-16 text-center w-full">
            <h2 className="text-3xl font-semibold text-white mb-6 font-display">Why to go with Card Hub?</h2>
            <p className="text-gray-300 text-xl font-medium mb-6">
                Card Hub delivers tailored card solutions with a focus on security, reliability, and outstanding support.
            </p>
            <p className="text-gray-300 text-xl font-medium">
                Whether you need fresh cards, aged cards, or bank logs, our team ensures top-quality products and unmatched service.
            </p>
        </div>
    </section>
);

export default Services;
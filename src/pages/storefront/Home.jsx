import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import NotificationBanner from '../../components/common/NotificationBanner.jsx';
import Shop from './Shop.jsx';
import Image from '../../assets/images/Image.png';
import DelivePng from '../../assets/images/Delive.png';
import Testimonials from './Testimonials.jsx';

// Sliding images
import Ally from '../../assets/images/Ally.jpg';
import Alliance from '../../assets/images/Alliance.jpg';
import Bmo from '../../assets/images/Bmo.jpg';
import Boa from '../../assets/images/Boa.jpg';
import Capital from '../../assets/images/Capital.jpg';
import Chales from '../../assets/images/Chales.jpg';
import Chase from '../../assets/images/Chase.jpg';
import Citi from '../../assets/images/Citi.jpg';
import Discover from '../../assets/images/Discover.jpg';
import Fidelity from '../../assets/images/Fidelity.jpg';
import Navy from '../../assets/images/Navy.jpg';
import Pnc from '../../assets/images/Pnc.jpg';
import Wells from '../../assets/images/Wells.jpg';
import Truist from '../../assets/images/Truist.jpg';
import Sofi from '../../assets/images/Sofi.jpg';
import Region from '../../assets/images/Region.jpg';

// other images

import AmericanExpress from '../../assets/images/image/AmericanExpress.jpg';
import Aviator from '../../assets/images/image/Aviator.jpg';
import BOA from '../../assets/images/image/BOA.jpg';
import BOA2 from '../../assets/images/image/BOA2.jpg';
import Capitala from '../../assets/images/image/Capitala.jpg';
import TD from '../../assets/images/image/TD.jpg';
import Chasa from '../../assets/images/image/Chasa.jpg';
import Truists from '../../assets/images/image/Truists.jpg';
import USBank from '../../assets/images/image/USBank.jpg';
import Visa from '../../assets/images/image/Visa.jpg';

const sliderImages = [
     AmericanExpress,Aviator , BOA , Region, Sofi, Truist, Wells, Pnc, Truists, Navy, TD,Fidelity, Discover,
    Citi, Chales, Visa, Chase, Capital, Bmo, Chasa, Boa, Alliance, Ally , USBank, Capitala, BOA2
];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideInterval = useRef(null);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % sliderImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0
                ? sliderImages.length - 3
                : (prevIndex - 3 + sliderImages.length) % sliderImages.length
        );
    };

    const startSlide = () => {
        if (!slideInterval.current) {
            slideInterval.current = setInterval(nextSlide, 3000);
        }
    };

    const stopSlide = () => {
        clearInterval(slideInterval.current);
        slideInterval.current = null;
    };

    useEffect(() => {
        startSlide();
        return () => stopSlide();
    }, []);

    const visibleImages = [
        sliderImages[currentIndex],
        sliderImages[(currentIndex + 1) % sliderImages.length],
        sliderImages[(currentIndex + 2) % sliderImages.length]
    ];

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <NotificationBanner />
            <div className="container px-4 py-12">
                <div className=" text-white rounded-2xl ">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        ✨ Welcome to <span className="text-yellow-300">CARD HuB</span>!
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed">
                        We’re delighted to have you here.
                        Discover our wide range of trusted bank cards from leading financial institutions — all at competitive prices and with reliable customer service.
                        Your financial needs, our top priority.
                    </p>
                    <p className="mt-6 text-xl font-semibold italic">
                        Shop smart. Buy safe. Save more.
                    </p>
                </div>

<br /><br />
                {/* Sliding Carousel */}
                <div
                    className="relative w-full overflow-hidden mb-8 flex items-center justify-center h-60"
                    onMouseEnter={stopSlide}
                    onMouseLeave={startSlide}
                >
                    <div
                        className="flex gap-4 transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (window.innerWidth >= 1024 ? 100 / 3 : 100)}%)`
                        }}
                    >
                        {sliderImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`slide-${index}`}
                                className={`rounded-lg object-cover h-60 shadow-lg flex-shrink-0 ${window.innerWidth >= 1024 ? 'w-1/3' : 'w-full'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full"
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full"
                    >
                        ❯
                    </button>
                </div>


        

                {/* Services Section */}
                <section className="mb-12">
                    <p>
                        Discover a smooth way to access digital cards from trusted global providers — no delays, no complications. <br />
                        🚀 Quick Access: No signup required — shop instantly as a guest.
                        <br />
                        🔒 Privacy First: We don’t ask for more than we need — just your email at checkout to deliver your order securely.
                        <br />
                        Start browsing — your card is just a click away. Stay anonymous. Stay in control.
                    </p>
                    <br /><br />
                    <h2 className="text-3xl font-semibold mb-6">
                        Here we do sell different categories of cards you can choose from here what best fits you all needs and matches what you really need from what Cards hub can offer
                    </h2>

                    <p>
                        <span className='text-center'>
                            <img
                                src={Image}
                                alt="home page image"
                                className="object-cover rounded-lg lg:ml-30"
                            />
                        </span>
                        <br />
                        At Card Hub we believe success isn’t handed to you – it’s built. That’s why we’ve created a powerful platform designed to help you unlock your full potential...
                    </p>
                    <br />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link
                            to="/cards/FreshCard"
                            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:bg-gray-700"
                        >
                            <h3 className="text-2xl font-semibold">Fresh Cards</h3>
                            <p className="text-gray-300">Brand new cards, personalized with your details.</p>
                        </Link>
                        <Link
                            to="/cards/AgedCard"
                            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:bg-gray-700"
                        >
                            <h3 className="text-2xl font-semibold">Aged Cards</h3>
                            <p className="text-gray-300">Cards with usage history.</p>
                        </Link>
                        <Link
                            to="/cards/BankCard"
                            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:bg-gray-700"
                        >
                            <h3 className="text-2xl font-semibold">Bank Logs</h3>
                            <p className="text-gray-300">Preloaded cards with balances at great prices.</p>
                        </Link>
                    </div>
                </section>

                {/* About Us Section */}
                <section className="mb-12 bg-gray-800 rounded-lg p-8 shadow-lg">
                    <h2 className="text-3xl font-semibold mb-4 text-center">About Us</h2>
                    <p className="text-gray-300 text-center max-w-2xl mx-auto">
                        We are dedicated to providing high-quality cards and bank logs to our customers.
                        Our team ensures secure transactions, fast delivery, and excellent customer support.
                        Whether you need fresh cards, aged cards, or bank logs, we have the right solution for you.
                    </p>
                </section>

                {/* Call to Action Section */}
                <section className="text-center mb-8">
                    <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-300 mb-6">
                        Browse our collection and find the perfect card for your needs.
                    </p>
                </section>

                <Shop />

                <section>
                    <div className="max-w-4xl mx-auto px-4 py-8e">

                        <ul className="space-y-3 list-disc list-inside">
                            <li>
                                <span className="font-semibold">No Sign-Up Needed:</span> Just pick your card and checkout as a guest — fast, simple, no strings.
                            </li>
                            <li>
                                <span className="font-semibold">Tip:</span> Drop your email at checkout to receive full details instantly.
                            </li>
                        </ul>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">What You’ll Receive with Your Loaded Credit Card Purchase:</h3>
                            <p className="text-red-400 mb-4">
                                Each order includes complete cardholder details to ensure smooth and successful usage. This typically contains:
                            </p>

                            <ol className="space-y-4 list-decimal list-inside">
                                <li>
                                    <span className="font-semibold">Card Information:</span>
                                    <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                                        <li>16-digit Card Number</li>
                                        <li>Cardholder’s Full Name</li>
                                        <li>Expiration Date</li>
                                        <li>CVV/CVC Security Code</li>
                                        <li>Billing Address</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-semibold">Personal Details (Fullz):</span>
                                    <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                                        <li>Full Name</li>
                                        <li>Residential Address</li>
                                        <li>Date of Birth</li>
                                        <li>Contact Email and Phone Number</li>
                                        <li>Social Security Number (or regional equivalent)</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <br />

                    <img src={DelivePng} alt="delivery conditions" className='rounded-lg' />

                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <h2 className="text-2xl font-bold text-center mb-6 text-white">
                            About LINKABLES Virtual Cards
                        </h2>

                        <ul className="space-y-4 text-white list-disc list-inside">
                            <li>
                                <span className="font-semibold">Immediate Use:</span> Activate and use your card within seconds—no delays, no complications.
                            </li>
                            <li>
                                <span className="font-semibold">Budget-Friendly Controls:</span> Set spend limits and expiration dates to avoid unwanted charges and maintain financial discipline.
                            </li>
                            <li>
                                <span className="font-semibold">Subscription Safe:</span> Perfect for signing up for services or trials. Cancel anytime without impacting your main card or bank account.
                            </li>
                            <li>
                                <span className="font-semibold">Streamlined Management:</span> Track all transactions and manage settings easily through a single, user-friendly dashboard.
                            </li>
                            <li>
                                <span className="font-semibold">Universal Compatibility:</span> Accepted anywhere major cards are, including online stores and digital wallets.
                            </li>
                            <li>
                                <span className="font-semibold">Secure By Design:</span> Each card is generated with security in mind, minimizing exposure to fraud or unauthorized charges. With features like one-time use or limited lifespan, your financial data stays protected.
                            </li>
                            <li>
                                <span className="font-semibold">No Ties, No Hassle:</span> Unlike traditional cards, LINKABLES cards don’t require personal banking info to activate. This makes them ideal for one-off purchases, temporary needs, or testing services without long-term commitment.
                            </li>
                        </ul>
                    </div>

                </section>
                <Testimonials />
                {/* Testimonials Link */}
                <div className="text-center">
                    <Link
                        to="/testimonials"
                        className="text-blue-400 hover:underline text-lg"
                    >
                        See what our customers say
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

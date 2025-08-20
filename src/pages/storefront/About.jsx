import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShippingFast, FaLock, FaHeadset, FaUserFriends, FaGlobe  , FaClock} from 'react-icons/fa';

const features = [
    {
        icon: <FaShippingFast className="text-blue-400 text-2xl" />,
        title: "Fast, verified delivery",
        description: "Get your cards and logs delivered quickly and securely."
    },
    {
        icon: <FaLock className="text-green-400 text-2xl" />,
        title: "Secure & encrypted platform",
        description: "Your transactions are protected with top-tier encryption."
    },
    {
        icon: <FaHeadset className="text-yellow-400 text-2xl" />,
        title: "24/7 customer support",
        description: "Our support team is always available to assist you."
    },
    {
        icon: <FaUserFriends className="text-purple-400 text-2xl" />,
        title: "Easy-to-use system",
        description: "Designed for both beginners and professionals."
    },
    {
        icon: <FaGlobe className="text-pink-400 text-2xl" />,
        title: "Trusted worldwide",
        description: "Hundreds of users rely on our platform globally."
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, type: 'spring', stiffness: 60 }
    })
};

const WhyChooseUs = () => (
    <section className="mt-10">
        <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl text-center font-semibold mb-6 text-white"
        >
            Why Choose Us?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
                <motion.div
                    key={idx}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    className="bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-md"
                >
                    {feature.icon}
                    <h3 className="mt-4 text-lg font-bold text-white text-center">{feature.title}</h3>
                    <p className="mt-2 text-gray-300 text-center">{feature.description}</p>
                </motion.div>
            ))}
        </div>
    </section>
);

const shopCards = [
    // add icons in here

    {
        icon: <FaGlobe className="text-blue-400 text-2xl" />,
        title: "Fresh Card",
        desc: "Get the latest fresh cards with verified details.",
        info: "these are the fresh cards that we have in our store. You can buy them at a very cheap price.",
        link: "/cards/fresh"
    },
    
    {
        icon: <FaClock className="text-red-400 text-2xl" />,
        title: "Aged Card",
        desc: "Explore our aged cards with a rich history.",
        info: "these are the aged cards that we have in our store. You can buy them at a very cheap price.",
        link: "/cards/aged"
    },
    {
        icon: <FaLock className="text-green-400 text-2xl" />,
        title: "Bank Log",
        desc: "Preloaded bank logs with balances at great prices.",
        info: "these are the bank logs that we have in our store. You can buy them at a very cheap price.",
        link: "/cards/bank-log"
    }
];

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 py-8 text-white"
        >
            <motion.h1
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className="text-4xl font-bold text-center mb-6"
            >
                About Us
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-gray-300"
            >
                Welcome to our card store! We are dedicated to providing high-quality cards and bank logs to our customers.
                Our team ensures secure transactions, fast delivery, and excellent customer support. Whether you need fresh
                cards, aged cards, or bank logs, we have the right solution for you.
            </motion.p>
            <WhyChooseUs />
            <motion.p
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-lg text-gray-300"
            >
                Our platform is designed to be user-friendly, making it easy for you to find and purchase the cards you need.
                We take pride in our commitment to customer satisfaction and strive to exceed your expectations with every order.
            </motion.p>
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl text-center font-semibold mt-10 mb-4"
            >
                Our Amazing Shopping Items
            </motion.h2>
            {/* add icons in here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    
                {shopCards.map((card, idx) => (
                    <motion.div
                        key={card.title}
                        custom={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-md"
                    >
                        <h3 className="text-xl font-bold text-white">{card.title}</h3>
                        <p className="text-gray-300 mt-2">{card.desc}</p>
                        <p>{card.info}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default About;
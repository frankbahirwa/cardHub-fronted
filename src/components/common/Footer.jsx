import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const socialLinks = [
    {
        name: 'Twitter',
        url: 'https://twitter.com/',
        icon: <FaTwitter className="w-6 h-6" />,
    },
    {
        name: 'Facebook',
        url: 'https://facebook.com/',
        icon: <FaFacebookF className="w-6 h-6" />,
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/',
        icon: <FaInstagram className="w-6 h-6" />,
    },
];

const quickLinks = [
    { name: 'About Us', to: '/about' },
    { name: 'Contact', to: '/contact' },
    { name: 'FAQ', to: '/faq' },
    { name: 'Terms', to: '/terms' },
    { name: 'Privacy', to: '/privacy' },
];

const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white pt-10 pb-6 mt-auto shadow-lg">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-2">Card Hub</h2>
                    <p className="text-gray-300 max-w-xs">
                        Your one-stop shop for digital cards, collectibles, and more. Discover, trade, and connect!
                    </p>
                </div>
                <div className="mb-6 md:mb-0 text-center">
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:space-y-1">
                        {quickLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className="hover:text-blue-400 transition rounded px-2 py-1 hover:bg-blue-900"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="text-center md:text-right">
                    <h3 className="font-semibold mb-2">Follow Us</h3>
                    <div className="flex justify-center md:justify-end space-x-4">
                        {socialLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition"
                                aria-label={link.name}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                &copy; 2025 Card Hub. All rights reserved. <button onClick={() => navigate('/admin/login')} className='p-2 cursor-pointer'>...!</button>
            </div>
        </footer>
    );
};

export default Footer;
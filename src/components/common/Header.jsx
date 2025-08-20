import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaHome, FaInfoCircle, FaServicestack, FaStar, FaShoppingCart, FaStore, FaUserShield } from 'react-icons/fa';
import Logo from '../../assets/images/Logo.png'; 

const Header = () => {
    const { cartItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleKeyPress = (e) => {
            // Check if CTRL + Space is pressed
            if (e.ctrlKey && e.code === "Space") {
                e.preventDefault(); // Prevent browser default
                setShowAdmin((prev) => !prev); // Toggle
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <header className="bg-gray-900 text-white shadow-[0_4px_6px_rgba(255,255,255,0.3)]">

           
            <div className="container mx-auto px-4 flex justify-between items-center py-4">

                <img src={Logo} alt="Card Hub Logo" className="ml-4 rounded-lg h-10" />
                {/* Hamburger for mobile */}
                <button
                    className="md:hidden flex items-center px-2 py-1 border rounded text-gray-200 border-gray-400 hover:text-blue-400 hover:border-blue-400"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Desktop nav */}
                <nav className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className={`hover:text-blue-400 transition flex items-center ${location.pathname === '/' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaHome className="mr-2" /> Home
                    </Link>
                    <Link to="/about" className={`hover:text-blue-400 transition flex items-center ${location.pathname === '/about' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaInfoCircle className="mr-2" /> About Us
                    </Link>
                    <Link to="/services" className={`hover:text-blue-400 transition flex items-center ${location.pathname === '/services' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaServicestack className="mr-2" /> Services
                    </Link>
                    <Link to="/testimonials" className={`hover:text-blue-400 transition flex items-center ${location.pathname === '/testimonials' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaStar className="mr-2" /> Testimonials
                    </Link>
                    <Link to="/shop" className={`hover:text-blue-400 transition flex items-center ${location.pathname === '/shop' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaStore className="mr-2" /> Shop Now
                    </Link>
                    <Link to="/cart" className={`hover:text-blue-400 transition flex items-center relative ${location.pathname === '/cart' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaShoppingCart className="mr-2" /> Cart
                        <span className="ml-1 bg-blue-500 text-xs rounded-full px-2 py-0.5">{cartItems.length}</span>
                    </Link>
                    {showAdmin && (
                        <Link to="/admin/login" className={`hover:text-blue-400 transition flex items-center ${location.pathname === '/admin/login' ? 'text-blue-400 font-bold' : ''}`}>
                            <FaUserShield className="mr-2" /> Admin
                        </Link>
                    )}
                </nav>
            </div>

            {/* Mobile nav */}
            {menuOpen && (
                <nav className="md:hidden bg-gray-800 px-4 pb-4">
                    <Link to="/" onClick={() => setMenuOpen(false)} className={`block py-2 hover:text-blue-400 flex items-center ${location.pathname === '/' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaHome className="mr-2" /> Home
                    </Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)} className={`block py-2 hover:text-blue-400 flex items-center ${location.pathname === '/about' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaInfoCircle className="mr-2" /> About Us
                    </Link>
                    <Link to="/services" onClick={() => setMenuOpen(false)} className={`block py-2 hover:text-blue-400 flex items-center ${location.pathname === '/services' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaServicestack className="mr-2" /> Services
                    </Link>
                    <Link to="/testimonials" onClick={() => setMenuOpen(false)} className={`block py-2 hover:text-blue-400 flex items-center ${location.pathname === '/testimonials' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaStar className="mr-2" /> Testimonials
                    </Link>
                    <Link to="/shop" onClick={() => setMenuOpen(false)} className={`block py-2 hover:text-blue-400 flex items-center ${location.pathname === '/shop' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaStore className="mr-2" /> Shop Now
                    </Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)} className={`block py-2 hover:text-blue-400 flex items-center ${location.pathname === '/cart' ? 'text-blue-400 font-bold' : ''}`}>
                        <FaShoppingCart className="mr-2" /> Cart <span className="ml-1 bg-blue-500 text-xs rounded-full px-2 py-0.5">{cartItems.length}</span>
                    </Link>
                    {showAdmin && (
                        <Link to="/admin/login" onClick={() => setMenuOpen(false)} className={`block py-2 hover:text-blue-400 flex items-center ${location.pathname === '/admin/login' ? 'text-blue-400 font-bold' : ''}`}>
                            <FaUserShield className="mr-2" /> Admin
                        </Link>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Header;

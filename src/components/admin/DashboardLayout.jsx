import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiMenu, FiX, FiCreditCard, FiMessageSquare, FiBell, FiShoppingCart } from 'react-icons/fi';

const DashboardLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Check for token in localStorage
    const token = localStorage.getItem('adminToken');
    if (!token) {
        return <h2 className="text-center text-red-500 mt-20">🚫 Unauthorized: Please log in as an admin.</h2>;
    }

    const menuItems = [
        { to: '/admin/dashboard/cards', label: 'Manage Cards', icon: <FiCreditCard /> },
        { to: '/admin/dashboard/testimonials', label: 'Manage Testimonials', icon: <FiMessageSquare /> },
        { to: '/admin/dashboard/notifications', label: 'Manage Notifications', icon: <FiBell /> },
        { to: '/admin/dashboard/purchases', label: 'Manage Purchases', icon: <FiShoppingCart /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-900 text-white w-full">
            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-1 text-white fixed top-22 left-2 z-50 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`w-64 bg-gray-800 p-6 shadow-xl fixed top-0 left-0 h-full z-40  rounded-xl
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
            >
                <h2 className="text-2xl font-extrabold mb-8 text-center tracking-wide">
                    🛠 Admin Dashboard
                </h2>
                <nav className="space-y-3">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3 px-4 rounded-lg transition-all 
                                ${isActive ? 'bg-blue-600 shadow-md' : 'bg-gray-700 hover:bg-blue-600 hover:shadow-md'}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="text-yellow-400">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6 md:ml-64">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

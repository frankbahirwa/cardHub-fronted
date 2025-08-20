// src/components/storefront/Cart.js
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const { cartItems, removeFromCart, totalAmount } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <p className="text-white text-center mt-12 text-xl">
                Your cart is empty.
            </p>
        );
    }

    return (
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl text-white w-full mx-auto mt-12">

            {/* Informative Text */}
            <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-inner text-gray-300">
                <h2 className="text-2xl font-bold mb-4 text-yellow-300">How Carting Works</h2>
                <p className="mb-2">
                    Welcome to your personal shopping cart! Review the items you’ve selected before completing your purchase.
                </p>
                <p className="mb-2">
                    Remove any item using the <span className="font-semibold text-red-400">Remove</span> button.
                </p>
            </div>

            {/* Cart Items */}
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <ul className="space-y-4 mb-6">
                {cartItems.map((item) => (
                    <li key={item.id} className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-md">
                        <span className="font-medium">Title: {item.title || item.type}</span>
                        <span>Price: ${item.price}</span>
                        <span className="font-medium">Type: {item.cardType || item.type}</span>

                        {/* Edit FreshCard Button */}
                        {item.type === 'FreshCard' && (
                            <Link
                                to="/freshcard"
                                state={{ cardData: item }} // pass the individual item
                            >
                                <Button className="bg-blue-600 hover:bg-blue-700 mt-2">
                                    Edit FreshCard Details
                                </Button>
                            </Link>
                        )}

                        {/* Remove Button */}
                        <Button
                            onClick={() => {
                                removeFromCart(item.id);
                                toast.info(`${item.title || item.type} removed from cart.`);
                            }}
                            className="bg-red-600 hover:bg-red-700 mt-2"
                        >
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>

            {/* Total Amount */}
            <p className="text-xl font-semibold mb-4">Total: ${totalAmount}</p>

            {/* Checkout Button: Pass all cartItems + totalAmount */}
            <Link
                to="/checkout"
                state={{ cartItems, totalAmount }}
            >
                <Button className="mt-2 w-full bg-green-500 hover:bg-yellow-600 text-gray-900 font-bold">
                    Proceed to Checkout
                </Button>
            </Link>

            {/* Thank You Note */}
            <p className="mt-4 text-center text-gray-300 italic">
                Thank you for checking out your products with us! We appreciate your trust.
            </p>
        </div>
    );
};

export default Cart;

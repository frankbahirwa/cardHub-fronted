import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart from localStorage on initialization
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item, customerDetails = null) => {
        if (!item || !item.id || !item.price) {
            console.error('Invalid item attempted to be added to the cart:', item);
            toast.error('Failed to add item to cart. Invalid item.');
            return;
        }

        setCartItems((prev) => {
            const isDuplicate = prev.some((cartItem) => cartItem.id === item.id);
            if (isDuplicate) {
                toast.info(`${item.title} is already in the cart.`);
                return prev;
            }
            toast.success(`${item.title} added to cart!`);
            return [...prev, { ...item, customerDetails }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => {
            const removedItem = prev.find((item) => item.id === id);
            if (!removedItem) {
                console.error('Attempted to remove non-existent item from cart:', id);
                toast.error('Failed to remove item. Item not found in cart.');
                return prev;
            }
            toast.info(`${removedItem.title} removed from cart.`);
            return prev.filter((item) => item.id !== id);
        });
    };

    const clearCart = () => {
        if (cartItems.length === 0) {
            toast.info('Cart is already empty.');
            return;
        }
        setCartItems([]);
        toast.info('Cart cleared.');
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
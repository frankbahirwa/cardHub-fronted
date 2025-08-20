// src/pages/storefront/Checkout.js
import React from 'react';
import CheckoutForm from '../../components/storefront/CheckoutForm';

const Checkout = () => {
    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <CheckoutForm />
        </div>
    );
};

export default Checkout;
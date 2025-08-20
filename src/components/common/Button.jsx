// src/components/common/Button.js
import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
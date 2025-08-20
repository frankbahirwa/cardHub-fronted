// src/components/common/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-md w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
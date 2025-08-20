import React from 'react';
import { FaSadTear } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 animate-gradient">
            <style>
                {`
                    @keyframes float {
                        0% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                        100% { transform: translateY(0); }
                    }
                    .animate-float {
                        animation: float 2s ease-in-out infinite;
                    }
                    @keyframes gradientMove {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-gradient {
                        background-size: 200% 200%;
                        animation: gradientMove 6s ease infinite;
                    }
                `}
            </style>
            <FaSadTear className="text-blue-200 text-[8rem] mb-6 animate-float drop-shadow-lg" />
            <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg animate-float">
                404 - Page Not Found
            </h1>
            <p className="text-lg text-blue-100 mb-8 animate-float">
                Oops! The page you are looking for does not exist.
            </p>
            <a
                href="/"
                className="px-6 py-3 bg-white text-blue-600 rounded-full shadow-lg font-semibold hover:bg-blue-100 transition"
            >
                Go Home
            </a>
        </div>
    );
};

export default NotFound;
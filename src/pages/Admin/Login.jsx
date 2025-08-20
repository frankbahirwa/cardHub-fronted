// src/pages/admin/Login.js
import React from 'react';
import LoginForm from '../../components/admin/LoginForm';

const Login = () => {
    const handleLogin = (token) => {
        // Save token to localStorage or context
        localStorage.setItem('adminToken', token);
    };

    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default Login;
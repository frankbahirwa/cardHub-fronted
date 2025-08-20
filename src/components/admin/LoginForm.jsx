import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import api from "../../services/api";
import Button from "../common/Button.jsx";

const LoginForm = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // 🔹 NEW
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading
        setError("");
        try {
            const res = await api.post("/api/admin/login", credentials);
            onLogin(res.data.token);
            navigate("/admin/dashboard/cards");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
            console.error("Login error:", err);
        } finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <motion.div
            className="flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.form
                onSubmit={handleSubmit}
                className="bg-gray-900 p-8 rounded-2xl shadow-2xl text-white max-w-md w-full space-y-6 shadow-[0_4px_6px_rgba(255,255,255,0.3)]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {/* Title */}
                <motion.h2
                    className="text-3xl font-bold text-center flex items-center justify-center gap-2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <FaSignInAlt className="text-blue-500" /> Admin Login
                </motion.h2>

                {/* Error Message */}
                {error && (
                    <motion.p
                        className="text-red-400 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {error}
                    </motion.p>
                )}

                {/* Username Field */}
                <motion.div
                    className="relative"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="p-3 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 w-full outline-none transition-all"
                        required
                    />
                </motion.div>

                {/* Password Field */}
                <motion.div
                    className="relative"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="p-3 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 w-full outline-none transition-all"
                        required
                    />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <Button
                        type="submit"
                        disabled={loading} // 🔹 Disable while loading
                        className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-lg transition-colors ${loading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        {loading ? (
                            <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                        ) : (
                            <>
                                <FaSignInAlt /> Login
                            </>
                        )}
                    </Button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};

export default LoginForm;

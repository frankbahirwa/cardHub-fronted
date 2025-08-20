import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaCreditCard,
    FaEnvelope,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa";
import api from "../../services/api";
import Button from "../common/Button.jsx";

const PurchaseManager = () => {
    const [purchases, setPurchases] = useState([]);
    const [openSections, setOpenSections] = useState({
        pending: true,
        approved: false,
        rejected: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllPurchases();
        fetchRejectedPurchases();
    }, []);

    const fetchAllPurchases = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/purchases");
            setPurchases(res.data);
        } catch (err) {
            console.error("Error fetching purchases:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRejectedPurchases = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/purchases/rejected");
            setPurchases((prev) => [...prev, ...res.data]);
        } catch (err) {
            console.error("Error fetching rejected purchases:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        setLoading(true);
        try {
            await api.patch(`/api/purchases/${id}/approve`);
            fetchAllPurchases();
        } catch (err) {
            console.error("Error approving purchase:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (id) => {
        setLoading(true);
        try {
            await api.patch(`/api/purchases/${id}/reject`);
            fetchAllPurchases();
        } catch (err) {
            console.error("Error rejecting purchase:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const groupedPurchases = {
        pending: purchases.filter((p) => p.status === "pending"),
        approved: purchases.filter((p) => p.status === "approved"),
        rejected: purchases.filter((p) => p.status === "rejected"),
    };

    const renderPurchases = (items, status) => (
        <AnimatePresence>
            {items.length > 0 ? (
                <motion.div
                    className="grid md:grid-cols-2 gap-6 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {items.map((purchase) => (
                        <motion.div
                            key={purchase._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-shadow"
                        >
                            <div className="mb-3">
                                <p className="flex items-center gap-2 text-gray-300">
                                    <FaEnvelope className="text-yellow-400" /> {purchase.buyerInfo.email}
                                </p>
                                <p className="text-gray-400">Payment Method: {purchase.paymentMethod}</p>
                                <p className="text-gray-400">
                                    Total:{" "}
                                    <span className="text-green-400 font-semibold">
                                        ${purchase.totalAmount}
                                    </span>
                                </p>
                                <p>
                                    Status:{" "}
                                    <span
                                        className={`px-2 py-1 text-sm rounded ${status === "pending"
                                            ? "bg-yellow-500 text-black"
                                            : status === "approved"
                                                ? "bg-green-600 text-white"
                                                : "bg-red-600 text-white"
                                            }`}
                                    >
                                        {status}
                                    </span>
                                </p>
                                <p className="text-gray-400">
                                    Cards:{" "}
                                    <span className="text-white">
                                        {purchase.cards.map((item) => item.card.title).join(", ")}
                                    </span>
                                </p>
                            </div>

                            {status === "pending" && (
                                <div className="flex gap-3 mt-4">
                                    <Button
                                        onClick={() => handleApprove(purchase._id)}
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
                                    >
                                        <FaCheckCircle /> Approve
                                    </Button>
                                    <Button
                                        onClick={() => handleReject(purchase._id)}
                                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
                                    >
                                        <FaTimesCircle /> Reject
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.p
                    className="text-gray-400 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    No {status} purchases found.
                </motion.p>
            )}
        </AnimatePresence>
    );

    return (
        <div className="p-6 relative">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 animate-spin"></div>
                </div>
            )}

            <motion.h2
                className="text-3xl font-bold mb-6 text-white flex items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <FaCreditCard className="text-blue-500" /> Manage Purchases
            </motion.h2>

            {["pending", "approved", "rejected"].map((status) => (
                <div key={status} className="mb-6">
                    <button
                        onClick={() => toggleSection(status)}
                        className="flex justify-between items-center w-full bg-gray-700 px-4 py-3 rounded-lg shadow-md text-white font-semibold hover:bg-gray-600 transition"
                    >
                        <span className="capitalize">{status} Purchases</span>
                        {openSections[status] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    <AnimatePresence>
                        {openSections[status] && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderPurchases(groupedPurchases[status], status)}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default PurchaseManager;

import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import QRCodeDisplay from '../common/QrCodeDisplay.jsx';
import { motion } from 'framer-motion';
import { FaBitcoin, FaEnvelope, FaMoneyBillWave } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const PAYMENT_METHODS = {
    BTC: { address: '1C48ZNuVNV2EUmMvueiSE9D3t183eBj5Kn', logo: 'btc-logo.png', rate: 0.00003, displayName: 'Bitcoin' },
    USDT: { address: 'TMfCPUsCBaMtjY2qfjkJd5V72HAvSmppiz', logo: 'usdt-logo.png', rate: 1, displayName: 'Tether (USDT)' },
    LTC: { address: '0x1ac3a5ecfda670abafde4758ffe8bd9f7d17d247', logo: 'ltc-logo.png', rate: 0.004, displayName: 'Litecoin' },
    SOL: { address: '0x1ac3a5ecfda670abafde4758ffe8bd9f7d17d247', logo: 'sol-logo.png', rate: 0.02, displayName: 'Solana' },
    USDC: { address: '0x1ac3a5ecfda670abafde4758ffe8bd9f7d17d247', logo: 'usdc-logo.png', rate: 1, displayName: 'USD Coin (USDC)' },
    ETH: { address: '0x1ac3a5ecfda670abafde4758ffe8bd9f7d17d247', logo: 'eth-logo.png', rate: 0.0005, displayName: 'Ethereum' },
    DAI: { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', logo: 'dai-logo.png', rate: 1, displayName: 'Dai' },
};

const CheckoutForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, totalAmount, clearCart } = useCart();

    const cardData = location.state?.cardData || (cartItems.length === 1 ? cartItems[0] : null);
    const initialAmount = location.state?.totalAmount || totalAmount;

    const [paymentMethod, setPaymentMethod] = useState('');
    const [email, setEmail] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [preparedPayload, setPreparedPayload] = useState(null);

    useEffect(() => {
        if (paymentMethod && PAYMENT_METHODS[paymentMethod]) {
            setConvertedAmount((initialAmount * PAYMENT_METHODS[paymentMethod].rate).toFixed(6));
        }
    }, [paymentMethod, initialAmount]);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!paymentMethod || !email) {
            alert('Please select payment method and enter your email');
            return;
        }

        const statePayload = {
            cardData,
            totalAmount: initialAmount,
            paymentMethod,
            email,
        };

        console.log('Submitting payload:', preparedPayload);
        setPreparedPayload(statePayload);

        // Show QR if unknown card type
        setShowQR(true);

        clearCart();
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Address copied to clipboard!');
    };

    return (
        <motion.div
            className="bg-gray-900 p-8 rounded-2xl text-white max-w-5xl mx-auto mt-12 shadow-[0_4px_6px_rgba(255,255,255,0.3)]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="mb-6 bg-gray-800 p-4 rounded-lg shadow-inner text-gray-300">
                <h2 className="text-2xl font-bold text-yellow-300 mb-2">Checkout Instructions</h2>
                <p className="mb-2">Review your order and select a payment method. Provide an <span className="font-semibold text-white">active email</span>.</p>
                <p className="mb-0 italic">Thank you for shopping with us!</p>
            </div>

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaMoneyBillWave className="text-yellow-400" /> Payment Details
            </h2>

            {!showQR ? (
                <motion.form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-1 flex items-center gap-2">
                            <FaBitcoin /> Payment Method
                        </label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => handlePaymentMethodChange(e.target.value)}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                            required
                        >
                            <option value="">Select Payment Method</option>
                            {Object.keys(PAYMENT_METHODS).map((method) => (
                                <option key={method} value={method}>{PAYMENT_METHODS[method].displayName}</option>
                            ))}
                        </select>
                    </div>

                    {paymentMethod && (
                        <p className="text-gray-300">Amount to Pay: <span className="font-semibold">{convertedAmount} {paymentMethod}</span></p>
                    )}

                    <div>
                        <label className="block text-gray-400 mb-1 flex items-center gap-2">
                            <FaEnvelope /> Contact Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded w-full">
                        Proceed to payment
                    </button>
                </motion.form>
            ) : (
                <motion.div className="text-center">
                    <QRCodeDisplay
                        paymentAddress={PAYMENT_METHODS[paymentMethod]?.address}
                        paymentMethod={paymentMethod}
                        logo={PAYMENT_METHODS[paymentMethod]?.logo}
                    />
                    <p className="mt-4 text-gray-300">Amount: {convertedAmount} {paymentMethod}</p>
                    <p className="mt-2 text-gray-300">Payment Address: {PAYMENT_METHODS[paymentMethod]?.address}</p>
                    <button
                        onClick={() => copyToClipboard(PAYMENT_METHODS[paymentMethod]?.address)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Copy Address
                    </button>
                </motion.div>
            )}

            {/* Manual Proceed Buttons */}
            {preparedPayload && (
                <div className="mt-4 space-x-2">
                    {preparedPayload.cardData?.cardType === 'FreshCard' && (
                        <button
                            onClick={() => navigate('/freshcard', { state: preparedPayload })}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded"
                        >
                            Provide delivery information
                        </button>
                    )}
                    {['AgedCard', 'BankCard'].includes(preparedPayload.cardData?.cardType) && (
                        <button
                            onClick={() => navigate('/NonFreshCard', { state: preparedPayload })}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded"
                        >
                            Provide delivery information
                        </button>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default CheckoutForm;

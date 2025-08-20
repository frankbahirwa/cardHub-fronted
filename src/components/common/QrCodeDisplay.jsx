import { QRCodeCanvas } from 'qrcode.react';

const QRCodeDisplay = ({ paymentAddress, paymentMethod }) => {
    const logoUrls = {
        Bitcoin: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        Tether: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
        Litecoin: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
        Solana: 'https://cryptologos.cc/logos/solana-sol-logo.png',
        USD_Coin: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
        Ethereum: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        Dai: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    };

    const logo = logoUrls[paymentMethod];

    return (
        <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">
                Pay with {paymentMethod}
            </h3>
            <div className="relative inline-block">
                <div className="bg-white p-2 rounded">
                    <QRCodeCanvas value={paymentAddress} size={200} />
                </div>
                {logo && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
                        <img
                            src={logo}
                            alt={`${paymentMethod} logo`}
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRCodeDisplay;
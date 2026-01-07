import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sun, Wind, Flame, User, Check, X, Zap, Send } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';

interface EnergyRequest {
    id: string;
    requesterName: string;
    requesterAddress: string;
    energyType: 'Solar' | 'Wind' | 'Fusion' | 'Hydro';
    amount: string;
    price: string;
    timestamp: string;
}

const mockRequests: EnergyRequest[] = [
    { id: '1', requesterName: 'Rajesh Kumar', requesterAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEa4', energyType: 'Solar', amount: '12.5', price: '0.25', timestamp: '5m ago' },
    { id: '2', requesterName: 'Priya Sharma', requesterAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72', energyType: 'Wind', amount: '8.2', price: '0.18', timestamp: '12m ago' },
    { id: '3', requesterName: 'Amit Patel', requesterAddress: '0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c', energyType: 'Fusion', amount: '45.0', price: '1.12', timestamp: '18m ago' },
    { id: '4', requesterName: 'Sneha Reddy', requesterAddress: '0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836', energyType: 'Hydro', amount: '15.4', price: '0.32', timestamp: '25m ago' },
];

const RequestCard: React.FC<{ request: EnergyRequest; onAccept: (id: string) => void; onReject: (id: string) => void }> = ({ request, onAccept, onReject }) => {
    const getIcon = () => {
        switch (request.energyType) {
            case 'Solar': return <Sun size={20} />;
            case 'Wind': return <Wind size={20} />;
            case 'Fusion': return <Flame size={20} />;
            case 'Hydro': return <Zap size={20} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-5 relative overflow-hidden group"
        >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-hologram/5 rounded-full blur-2xl group-hover:bg-hologram/10 transition-colors" />
            <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-start flex-1">
                        <div className="p-2.5 bg-white/5 rounded-lg text-hologram shrink-0">
                            {getIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <User className="w-4 h-4 text-white/40" />
                                <h4 className="font-bold text-white/90 text-sm">{request.requesterName}</h4>
                            </div>
                            <p className="text-xs font-mono text-white/40 truncate">{request.requesterAddress}</p>
                            <p className="text-xs font-mono text-white/50 mt-1">{request.timestamp}</p>
                        </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                        <p className="text-lg font-bold text-energy-production">{request.price} ETH</p>
                        <p className="text-xs font-mono text-white/40">{request.amount} MW/h</p>
                    </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 border-l-2 border-hologram">
                    <p className="text-xs font-mono text-white/60 uppercase mb-1">Energy Request</p>
                    <p className="text-sm text-white/80">Requesting <span className="text-hologram font-bold">{request.amount} MW/h</span> of {request.energyType} energy</p>
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        onClick={() => onAccept(request.id)}
                        className="flex-1 bg-energy-production/10 border border-energy-production/50 text-energy-production py-2.5 rounded font-bold text-xs uppercase tracking-wider hover:bg-energy-production/20 transition-colors flex items-center justify-center gap-2"
                    >
                        <Check size={16} />
                        Accept & Fulfill
                    </button>
                    <button
                        onClick={() => onReject(request.id)}
                        className="px-4 bg-white/5 border border-white/20 text-white/60 py-2.5 rounded hover:bg-white/10 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export const Trading2D: React.FC = () => {
    const { isConnected, address, connectWallet, addFulfilledRequest, fulfilledRequests } = useWeb3();
    const [requests] = useState<EnergyRequest[]>(mockRequests);
    const [fulfilling, setFulfilling] = useState<string | null>(null);

    const handleAccept = (id: string) => {
        if (!isConnected) {
            alert('Please connect your wallet first!');
            return;
        }
        setFulfilling(id);
    };

    const handleReject = (id: string) => {
        console.log('Rejected request:', id);
    };

    const handleSendEnergy = () => {
        if (fulfilling) {
            const request = requests.find(r => r.id === fulfilling);
            if (request) {
                // Demo transaction
                setTimeout(() => {
                    const newTransaction = {
                        id: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
                        type: 'outgoing',
                        amount: request.amount,
                        unit: 'MW/h',
                        source: request.energyType,
                        from: 'YOU',
                        to: request.requesterName,
                        timestamp: 'Just now',
                        status: 'Confirmed'
                    };
                    addFulfilledRequest(newTransaction);
                    setFulfilling(null);
                    alert(`Energy sent to ${request.requesterName} successfully! 🎉`);
                }, 1000);
            }
        }
    };

    const fulfilledIds = fulfilledRequests.map(r => {
        // Find matching request by name and amount if possible, or just use IDs if we stored them
        // For now, let's assume we store the original request ID in the transaction metadata or just use names
        return mockRequests.find(mr => mr.requesterName === r.to && mr.amount === r.amount)?.id;
    }).filter(id => id !== undefined) as string[];

    const fulfillingRequest = requests.find(r => r.id === fulfilling);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 h-full overflow-y-auto">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold glow-text uppercase tracking-widest">Energy Marketplace</h2>
                    <p className="text-white/40 font-mono text-xs mt-2 uppercase">Peer-to-Peer Energy Request Fulfillment</p>
                </div>
                {!isConnected && (
                    <button
                        onClick={connectWallet}
                        className="glass-panel px-6 py-2 text-xs font-bold uppercase tracking-widest bg-hologram/10 text-hologram hover:bg-hologram/20 animate-pulse-glow"
                    >
                        Connect Wallet to Fulfill Requests
                    </button>
                )}
            </header>

            {fulfilling && fulfillingRequest && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="holographic-card p-8 relative overflow-hidden"
                >
                    <div className="absolute -right-16 -top-16 w-96 h-96 bg-energy-production/10 rounded-full blur-3xl" />
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Send className="text-hologram" size={24} />
                            <h3 className="text-xl font-bold text-white/90 uppercase">Fulfill Energy Request</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-mono text-white/40 uppercase mb-2">Requester</p>
                                    <div className="glass-panel p-4 bg-white/5">
                                        <p className="font-bold text-white/90">{fulfillingRequest.requesterName}</p>
                                        <p className="text-xs font-mono text-white/50 mt-1">{fulfillingRequest.requesterAddress}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-white/40 uppercase mb-2">Your Address</p>
                                    <div className="glass-panel p-4 bg-white/5">
                                        <p className="text-xs font-mono text-hologram">{address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-mono text-white/40 uppercase mb-2">Energy Details</p>
                                    <div className="glass-panel p-4 bg-white/5 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-white/60 text-sm">Type</span>
                                            <span className="text-white/90 font-bold">{fulfillingRequest.energyType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/60 text-sm">Amount</span>
                                            <span className="text-white/90 font-bold">{fulfillingRequest.amount} MW/h</span>
                                        </div>
                                        <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                                            <span className="text-white/60 text-sm">Total Price</span>
                                            <span className="text-energy-production font-bold text-lg">{fulfillingRequest.price} ETH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleSendEnergy}
                                className="flex-1 bg-hologram py-4 rounded font-bold text-space uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Send Energy & Complete Transaction
                            </button>
                            <button
                                onClick={() => setFulfilling(null)}
                                className="px-8 bg-white/5 border border-white/20 text-white/60 rounded hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                    <h3 className="text-sm font-mono text-hologram border-b border-white/10 pb-3 mb-6 uppercase flex items-center gap-2">
                        <ArrowUpRight size={16} />
                        Active Energy Requests ({requests.filter(r => !fulfilledIds.includes(r.id)).length})
                    </h3>
                </div>

                {requests.filter(r => !fulfilledIds.includes(r.id)).map((request) => (
                    <RequestCard
                        key={request.id}
                        request={request}
                        onAccept={handleAccept}
                        onReject={handleReject}
                    />
                ))}
            </div>

            {fulfilledIds.length > 0 && (
                <div className="glass-panel p-6">
                    <h3 className="font-mono text-xs text-energy-production border-b border-white/10 pb-3 mb-4 uppercase flex items-center gap-2">
                        <Check size={16} />
                        Fulfilled Requests ({fulfilledIds.length})
                    </h3>
                    <div className="space-y-2">
                        {requests.filter(r => fulfilledIds.includes(r.id)).map((request) => (
                            <div key={request.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Check className="text-energy-production" size={16} />
                                    <div>
                                        <p className="text-sm font-bold text-white/80">{request.requesterName}</p>
                                        <p className="text-xs font-mono text-white/40">{request.amount} MW/h {request.energyType}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-energy-production">{request.price} ETH</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

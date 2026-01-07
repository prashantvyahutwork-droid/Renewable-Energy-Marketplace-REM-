import React, { useState } from 'react';
import { History, Search, Filter, ExternalLink, ArrowUpRight, ArrowDownLeft, Box, Zap, Sun, Wind, Flame } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useWeb3 } from '../context/Web3Context';

export const Ledger: React.FC = () => {
    const { fulfilledRequests } = useWeb3();
    const [searchTerm, setSearchTerm] = useState('');

    const getSourceIcon = (source: string) => {
        switch (source) {
            case 'Solar': return <Sun size={14} className="text-yellow-400" />;
            case 'Wind': return <Wind size={14} className="text-blue-400" />;
            case 'Hydro': return <Zap size={14} className="text-cyan-400" />;
            case 'Fusion': return <Flame size={14} className="text-orange-500" />;
            default: return <Box size={14} className="text-white/40" />;
        }
    }

    const filteredTransactions = fulfilledRequests.filter(tx =>
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.source.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto h-full overflow-hidden flex flex-col">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold glow-text uppercase tracking-widest flex items-center gap-3">
                        <History className="text-hologram" size={32} />
                        GRID TRANSACTION LEDGER
                    </h2>
                    <p className="text-white/40 text-xs mt-2 uppercase tracking-wider font-mono">Immutable Energy Record // Current Epoch: #14,285,992</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Ledger Records..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 text-sm md:w-64 focus:border-hologram outline-none text-white font-mono"
                        />
                        <Search className="absolute left-3 top-2.5 text-white/40" size={16} />
                    </div>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </header>

            {/* Stream View */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0">
                {/* Transaction List */}
                <div className="lg:col-span-3 glass-panel p-0 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                        <h3 className="font-mono text-sm uppercase text-white/60 tracking-widest">Live Energy Feed</h3>
                        <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-energy-production animate-pulse" />
                            <span className="text-[10px] font-bold text-energy-production uppercase tracking-tighter">Real-time sync</span>
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1 p-6 space-y-2 no-scrollbar">
                        {filteredTransactions.map((tx, i) => (
                            <div key={i} className="group flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-hologram/30 hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "p-3 rounded-full border border-white/10",
                                        tx.type === 'incoming' ? "bg-energy-production/10 text-energy-production" : "bg-white/5 text-white/60"
                                    )}>
                                        {tx.type === 'incoming' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-mono font-bold text-sm tracking-tighter">{tx.id}</span>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded border border-white/10">
                                                {getSourceIcon(tx.source)}
                                                <span className="text-[9px] uppercase font-bold text-white/60">{tx.source}</span>
                                            </div>
                                            <span className={clsx(
                                                "text-[9px] px-2 py-0.5 rounded uppercase font-bold",
                                                tx.status === 'Confirmed' ? "bg-green-500/20 text-green-500 border border-green-500/30" :
                                                    tx.status === 'Pending' ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30" : "bg-red-500/20 text-red-500 border border-red-500/30"
                                            )}>{tx.status}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 pointer-events-none">
                                            <span className="text-xs text-white/40 font-mono">{tx.timestamp}</span>
                                            <span className="text-white/20">•</span>
                                            <span className="text-xs text-white/60 uppercase tracking-wide">{tx.from} <span className="text-hologram/50 mx-1">&rarr;</span> {tx.to}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="flex items-baseline justify-end gap-1">
                                        <p className={clsx(
                                            "font-bold font-mono text-lg",
                                            tx.type === 'incoming' ? "text-energy-production shadow-[0_0_10px_rgba(34,197,94,0.1)]" : "text-white"
                                        )}>
                                            {tx.type === 'incoming' ? '+' : '-'}{tx.amount}
                                        </p>
                                        <span className="text-[10px] font-mono text-white/40 font-bold uppercase">{tx.unit}</span>
                                    </div>
                                    <button className="text-[10px] uppercase text-hologram opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1 w-full mt-1 font-bold">
                                        Explorer <ExternalLink size={10} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Block Visualizer */}
                <div className="glass-panel p-6 flex flex-col gap-4 bg-gradient-to-b from-white/5 to-transparent border border-white/5">
                    <h3 className="font-mono text-sm uppercase text-white/60 border-b border-white/10 pb-4 tracking-widest">Block Stream</h3>

                    <div className="space-y-4 flex-1 overflow-hidden relative">
                        {/* Decorative Line */}
                        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/5 z-0" />

                        {[14285992, 14285991, 14285990, 14285989, 14285988, 14285987, 14285986].map((block, i) => (
                            <div key={block} className="relative z-10 flex gap-4 items-start animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="w-8 h-8 rounded-sm bg-black border border-hologram/30 flex items-center justify-center shrink-0 text-hologram shadow-[0_0_8px_rgba(0,242,255,0.1)]">
                                    <Box size={14} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs font-bold text-white font-mono tracking-tighter">#{block}</p>
                                        <span className="text-[9px] font-mono text-hologram/60">LIVE</span>
                                    </div>
                                    <p className="text-[9px] text-white/30 mt-1 uppercase font-mono">128 TX • 4.2ms LATENCY</p>
                                    <div className="mt-2 w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-hologram/40"
                                            initial={{ width: 0 }}
                                            animate={{ width: "70%" }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-space to-transparent z-20 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

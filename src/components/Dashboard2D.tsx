import React from 'react';
import { motion } from 'framer-motion';
import { Activity, User, Sparkles, Code2, Zap, Shield, TrendingUp, Globe, Cpu, Database, Lock } from 'lucide-react';

export const Dashboard2D: React.FC = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-full">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold glow-text tracking-tighter">BIJLI CORE</h1>
                    <p className="text-hologram/60 font-mono text-sm mt-1 uppercase">Holographic Management Interface v2.0</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-panel px-4 py-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-energy-production" />
                        <span className="text-xs font-mono">grid_status: ACTIVE</span>
                    </div>
                </div>
            </header>

            {/* Main Project Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="holographic-card p-10 relative overflow-hidden group"
            >
                <div className="absolute -right-16 -top-16 w-96 h-96 bg-hologram/5 rounded-full blur-3xl group-hover:bg-hologram/10 transition-colors" />
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                        <div className="p-4 bg-hologram/10 rounded-xl text-hologram">
                            <Sparkles className="w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold glow-text uppercase tracking-wider">BIJLI.GRID</h2>
                            <p className="text-hologram/60 font-mono text-sm uppercase tracking-widest mt-2">The Future of Decentralized Energy Markets</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-white/90 mb-3 flex items-center gap-2">
                                <div className="w-1 h-6 bg-hologram rounded-full" />
                                Vision & Mission
                            </h3>
                            <p className="text-white/80 leading-relaxed text-base">
                                <span className="text-hologram font-bold">BIJLI.GRID</span> is a revolutionary decentralized energy ecosystem
                                designed to democratize power distribution in India and beyond. By leveraging high-speed blockchain architecture
                                and autonomous smart contracts, we enable prosumers to trade renewable energy credits peer-to-peer with zero latency.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white/90 mb-3 flex items-center gap-2">
                                <div className="w-1 h-6 bg-energy-production rounded-full" />
                                What Makes BIJLI.GRID Unique?
                            </h3>
                            <div className="space-y-3 text-white/70 leading-relaxed">
                                <p>
                                    Our platform ensures <span className="text-energy-production font-semibold">100% transparency</span> in carbon tracking
                                    and institutional-grade security for every watt moved. Built with cutting-edge Web3 technologies, advanced 3D visualizations
                                    powered by Three.js, and real-time data streaming, BIJLI.GRID represents the future of the autonomous energy internet.
                                </p>
                                <p>
                                    We combine the power of <span className="text-hologram font-semibold">blockchain immutability</span> with the flexibility
                                    of modern web applications to create a seamless experience for energy producers, consumers, and prosumers. Whether you're
                                    a solar panel owner wanting to sell excess energy or a business looking to source renewable power, BIJLI.GRID makes it possible
                                    with just a few clicks.
                                </p>
                                <p>
                                    The platform features a <span className="text-energy-glow font-semibold">holographic command interface</span>, 3D network
                                    visualization, real-time transaction ledger, identity management, and a comprehensive marketplace—all designed with a
                                    futuristic cyberpunk aesthetic that makes energy trading not just efficient, but visually stunning.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                            <div className="glass-panel p-5 bg-white/5 border border-white/10 hover:border-hologram/50 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-energy-production/10 rounded-lg">
                                        <Zap className="w-5 h-5 text-energy-production" />
                                    </div>
                                    <h4 className="text-sm font-mono text-white/80 uppercase font-bold">Core Technology</h4>
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    React 19 + TypeScript for type-safe frontend, Three.js for immersive 3D visualizations, Ethers.js for blockchain interactions
                                </p>
                            </div>
                            <div className="glass-panel p-5 bg-white/5 border border-white/10 hover:border-hologram/50 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-hologram/10 rounded-lg">
                                        <Shield className="w-5 h-5 text-hologram" />
                                    </div>
                                    <h4 className="text-sm font-mono text-white/80 uppercase font-bold">Security First</h4>
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Cryptographic verification, decentralized identity, multi-signature wallets, and audit-ready smart contracts
                                </p>
                            </div>
                            <div className="glass-panel p-5 bg-white/5 border border-white/10 hover:border-hologram/50 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-energy-glow/10 rounded-lg">
                                        <Globe className="w-5 h-5 text-energy-glow" />
                                    </div>
                                    <h4 className="text-sm font-mono text-white/80 uppercase font-bold">Global Impact</h4>
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Democratizing energy access, empowering communities, reducing carbon footprint through transparent green settlements
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Key Features Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel p-8"
            >
                <h3 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-3">
                    <TrendingUp className="text-hologram" />
                    Platform Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: <Cpu />, title: 'Command Terminal', desc: 'Full-featured CLI for system diagnostics, node interaction, and grid synchronization commands' },
                        { icon: <User />, title: 'Digital Identity', desc: 'Blockchain-based identity management with reputation scores, credentials, and wallet integration' },
                        { icon: <Globe />, title: '3D Network Map', desc: 'Interactive visualization of global peer network with real-time latency and connection metrics' },
                        { icon: <Database />, title: 'Transaction Ledger', desc: 'Immutable blockchain ledger with searchable transaction history and block stream visualization' },
                        { icon: <TrendingUp />, title: 'Energy Marketplace', desc: 'Live trading interface for renewable energy credits with order books and price charts' },
                        { icon: <Lock />, title: 'System Control', desc: 'Comprehensive settings panel for notifications, preferences, and security configurations' },
                    ].map((feature, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-hologram/30 transition-colors">
                            <div className="text-hologram mb-3">{feature.icon}</div>
                            <h4 className="font-bold text-white/90 mb-2">{feature.title}</h4>
                            <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Creator Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="holographic-card p-8 relative overflow-hidden group"
            >
                <div className="absolute -left-16 -bottom-16 w-96 h-96 bg-energy-production/5 rounded-full blur-3xl group-hover:bg-energy-production/10 transition-colors" />
                <div className="relative z-10">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
                        <div className="p-4 bg-hologram/10 rounded-xl text-hologram">
                            <User className="w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold glow-text uppercase tracking-wider">Creator & Architect</h2>
                            <p className="text-hologram/60 font-mono text-sm uppercase tracking-widest mt-1">The Mind Behind BIJLI.GRID</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center gap-4 mb-4">
                                <Code2 className="w-6 h-6 text-energy-production" />
                                <div>
                                    <p className="text-2xl font-bold text-white/90">Prashant</p>
                                    <p className="text-white/60 text-sm font-mono">Full-Stack Developer & Blockchain Architect</p>
                                </div>
                            </div>

                            <p className="text-white/80 leading-relaxed">
                                A passionate technologist and innovator dedicated to building decentralized systems that solve real-world energy challenges.
                                With deep expertise in Web3 technologies, advanced UI/UX design, and scalable distributed architectures, I believe in the
                                power of blockchain to transform how we produce, consume, and trade energy.
                            </p>

                            <p className="text-white/70 leading-relaxed">
                                BIJLI.GRID represents my vision of making renewable energy accessible to everyone through cutting-edge technology.
                                By combining the transparency of blockchain with the power of modern web applications, we're creating a platform
                                that empowers individuals and communities to participate in the green energy revolution.
                            </p>

                            <div className="pt-4">
                                <h4 className="text-sm font-mono text-white/50 uppercase mb-3">Technical Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'TypeScript', 'Three.js', 'Blockchain', 'Web3', 'Smart Contracts', 'Node.js', 'Solidity', 'Prisma', 'Vite'].map((skill) => (
                                        <span key={skill} className="px-3 py-1.5 bg-white/5 border border-hologram/30 rounded-full text-xs font-mono text-hologram hover:bg-hologram/10 transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="glass-panel p-5 bg-white/5">
                                <h4 className="text-xs font-mono text-white/50 uppercase mb-3">Philosophy</h4>
                                <p className="text-sm text-white/70 leading-relaxed italic">
                                    "Technology should empower people, not corporations. Energy should be a right, not a privilege.
                                    The future is decentralized, transparent, and green."
                                </p>
                            </div>
                            <div className="glass-panel p-5 bg-white/5">
                                <h4 className="text-xs font-mono text-white/50 uppercase mb-3">Mission</h4>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Building tools that democratize energy access and create a sustainable future for the next generation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

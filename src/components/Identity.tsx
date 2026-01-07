import React, { useState, useEffect } from 'react';
import { User, Shield, Mail, Lock, LogIn, UserPlus, Wallet, Check, X, Copy, Key, Hash } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';

interface UserProfile {
    email: string;
    username: string;
    password: string;
}

export const Identity: React.FC = () => {
    const { address, isConnected, balance, connectWallet, disconnect, logout, isLoggedIn, currentUser, login } = useWeb3();
    const [showLogin, setShowLogin] = useState(true);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [chainId, setChainId] = useState<string>('');

    // Form states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

    // Get chain ID when wallet is connected
    useEffect(() => {
        if (isConnected && window.ethereum) {
            window.ethereum.request({ method: 'eth_chainId' })
                .then((id: string) => setChainId(parseInt(id, 16).toString()))
                .catch(console.error);
        }
    }, [isConnected]);

    // Mock user database (in real app, this would be a backend API)
    const getUserFromStorage = () => {
        const users = localStorage.getItem('bijli_users');
        return users ? JSON.parse(users) : [];
    };

    const saveUserToStorage = (user: UserProfile) => {
        const users = getUserFromStorage();
        users.push(user);
        localStorage.setItem('bijli_users', JSON.stringify(users));
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        if (signupPassword !== signupConfirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const users = getUserFromStorage();
        const existingUser = users.find((u: UserProfile) => u.email === signupEmail);

        if (existingUser) {
            alert('Email already registered!');
            return;
        }

        const newUser: UserProfile = {
            email: signupEmail,
            username: signupUsername,
            password: signupPassword
        };

        saveUserToStorage(newUser);
        login({ username: newUser.username, email: newUser.email });
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const users = getUserFromStorage();
        const user = users.find((u: UserProfile) =>
            u.email === loginEmail && u.password === loginPassword
        );

        if (user) {
            login({ username: user.username, email: user.email });
            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 3000);
        } else {
            alert('Invalid email or password!');
        }
    };

    const handleLogout = () => {
        logout();
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    // Login/Signup Screen
    if (!isLoggedIn) {
        return (
            <div className="h-full flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1),transparent_50%)]" />

                <div className="holographic-card p-8 max-w-md w-full relative z-10">
                    <div className="flex items-center justify-center mb-8">
                        <div className="p-4 bg-hologram/10 rounded-xl text-hologram">
                            <Shield size={40} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center glow-text uppercase tracking-wider mb-2">
                        Identity Portal
                    </h2>
                    <p className="text-white/40 text-center font-mono text-xs uppercase mb-8">
                        {showLogin ? 'Secure Access' : 'Create Profile'}
                    </p>

                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setShowLogin(true)}
                            className={`flex-1 py-2 rounded font-bold text-xs uppercase tracking-wider transition-all ${showLogin ? 'bg-hologram text-space' : 'bg-white/5 text-white/40'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setShowLogin(false)}
                            className={`flex-1 py-2 rounded font-bold text-xs uppercase tracking-wider transition-all ${!showLogin ? 'bg-hologram text-space' : 'bg-white/5 text-white/40'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {showLogin ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="text-xs font-mono text-white/60 uppercase mb-2 block">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-white/40" size={18} />
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded pl-11 pr-4 py-3 font-mono text-sm focus:border-hologram outline-none text-white"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-mono text-white/60 uppercase mb-2 block">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 text-white/40" size={18} />
                                    <input
                                        type="password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded pl-11 pr-4 py-3 font-mono text-sm focus:border-hologram outline-none text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-hologram py-3 rounded font-bold text-space uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
                            >
                                <LogIn size={18} />
                                Enter Grid
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label className="text-xs font-mono text-white/60 uppercase mb-2 block">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-white/40" size={18} />
                                    <input
                                        type="email"
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded pl-11 pr-4 py-3 font-mono text-sm focus:border-hologram outline-none text-white"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-mono text-white/60 uppercase mb-2 block">Username</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-white/40" size={18} />
                                    <input
                                        type="text"
                                        value={signupUsername}
                                        onChange={(e) => setSignupUsername(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded pl-11 pr-4 py-3 font-mono text-sm focus:border-hologram outline-none text-white"
                                        placeholder="Choose username"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-mono text-white/60 uppercase mb-2 block">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 text-white/40" size={18} />
                                    <input
                                        type="password"
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded pl-11 pr-4 py-3 font-mono text-sm focus:border-hologram outline-none text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-mono text-white/60 uppercase mb-2 block">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 text-white/40" size={18} />
                                    <input
                                        type="password"
                                        value={signupConfirmPassword}
                                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded pl-11 pr-4 py-3 font-mono text-sm focus:border-hologram outline-none text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-energy-production py-3 rounded font-bold text-space uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(255,51,102,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
                            >
                                <UserPlus size={18} />
                                Create Identity
                            </button>
                        </form>
                    )}
                </div>

                {/* Success Popup */}
                {showSuccessPopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
                        <div className="holographic-card p-8 max-w-sm mx-4 relative overflow-hidden">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-energy-production/20 rounded-full blur-3xl" />
                            <div className="relative z-10 text-center">
                                <div className="w-16 h-16 bg-energy-production/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="text-energy-production" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Login Successful!</h3>
                                <p className="text-white/60 text-sm">Welcome to BIJLI.GRID</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Logged In Screen
    return (
        <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold glow-text uppercase tracking-widest flex items-center gap-3">
                        <User className="text-hologram" size={32} />
                        Digital Identity
                    </h2>
                    <p className="text-white/40 text-xs mt-2 uppercase tracking-wider">
                        User Profile // {currentUser?.username}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="glass-panel px-4 py-2 text-xs font-bold uppercase tracking-wider border-white/20 text-white/60 hover:bg-white/10 transition-colors"
                >
                    Logout
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Profile Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* User Info Card */}
                    <div className="holographic-card p-6 relative overflow-hidden">
                        <div className="absolute -right-16 -top-16 w-96 h-96 bg-hologram/5 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <h3 className="text-sm font-mono text-hologram border-b border-white/10 pb-3 mb-6 uppercase">
                                Profile Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="glass-panel p-4 bg-white/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="w-4 h-4 text-white/40" />
                                        <p className="text-xs font-mono text-white/40 uppercase">Username</p>
                                    </div>
                                    <p className="font-bold text-white">{currentUser?.username}</p>
                                </div>
                                <div className="glass-panel p-4 bg-white/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Mail className="w-4 h-4 text-white/40" />
                                        <p className="text-xs font-mono text-white/40 uppercase">Email</p>
                                    </div>
                                    <p className="font-bold text-white text-sm">{currentUser?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Wallet Connection */}
                    {!isConnected ? (
                        <div className="holographic-card p-8 text-center">
                            <Wallet className="w-16 h-16 text-hologram mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
                            <p className="text-white/60 mb-6 text-sm">
                                Link your blockchain wallet to access full features
                            </p>
                            <button
                                onClick={connectWallet}
                                className="bg-hologram px-8 py-3 rounded font-bold text-space uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:brightness-110 transition-all inline-flex items-center gap-2"
                            >
                                <Wallet size={18} />
                                Connect MetaMask
                            </button>
                        </div>
                    ) : (
                        <div className="holographic-card p-6 relative overflow-hidden">
                            <div className="absolute -left-16 -bottom-16 w-96 h-96 bg-energy-production/5 rounded-full blur-3xl" />
                            <div className="relative z-10">
                                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                                    <h3 className="text-sm font-mono text-hologram uppercase flex items-center gap-2">
                                        <Wallet size={16} />
                                        Wallet Details
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-energy-production animate-pulse" />
                                        <span className="text-energy-production font-mono">CONNECTED</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="glass-panel p-4 bg-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Key className="w-4 h-4 text-white/40" />
                                            <p className="text-xs font-mono text-white/40 uppercase">Wallet Address</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="font-mono text-sm text-white">{address?.slice(0, 20)}...{address?.slice(-10)}</p>
                                            <button
                                                onClick={() => copyToClipboard(address || '')}
                                                className="text-hologram hover:text-hologram/80 transition-colors"
                                            >
                                                <Copy size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="glass-panel p-4 bg-white/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Hash className="w-4 h-4 text-white/40" />
                                                <p className="text-xs font-mono text-white/40 uppercase">Chain ID</p>
                                            </div>
                                            <p className="font-bold text-white text-lg">{chainId || '1'}</p>
                                        </div>
                                        <div className="glass-panel p-4 bg-white/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Wallet className="w-4 h-4 text-white/40" />
                                                <p className="text-xs font-mono text-white/40 uppercase">Balance</p>
                                            </div>
                                            <p className="font-bold text-hologram text-lg">{parseFloat(balance || '0').toFixed(4)} ETH</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={disconnect}
                                        className="w-full bg-white/5 border border-white/20 text-white/60 py-3 rounded hover:bg-white/10 transition-colors font-bold text-xs uppercase tracking-wider"
                                    >
                                        Disconnect Wallet
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 bg-gradient-to-b from-hologram/10 to-transparent">
                        <h3 className="text-xs font-mono text-hologram mb-4 uppercase">Account Status</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white/60">Profile</span>
                                <Check className="text-energy-production" size={16} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white/60">Email Verified</span>
                                <Check className="text-energy-production" size={16} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white/60">Wallet</span>
                                {isConnected ? (
                                    <Check className="text-energy-production" size={16} />
                                ) : (
                                    <X className="text-white/20" size={16} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

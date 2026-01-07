import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BrowserProvider, formatEther, type Eip1193Provider } from 'ethers';

declare global {
    interface Window {
        ethereum?: Eip1193Provider & {
            on: (event: string, callback: (...args: any[]) => void) => void;
            removeListener: (event: string, callback: (...args: any[]) => void) => void;
        };
    }
}

interface Web3ContextType {
    address: string | null;
    balance: string | null;
    isConnected: boolean;
    isConnecting: boolean;
    connectWallet: () => Promise<void>;
    disconnect: () => void;
    provider: BrowserProvider | null;
    fulfilledRequests: any[];
    addFulfilledRequest: (request: any) => void;
    isLoggedIn: boolean;
    currentUser: { username: string; email: string } | null;
    login: (user: { username: string; email: string }) => void;
    logout: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [provider, setProvider] = useState<BrowserProvider | null>(null);
    const [fulfilledRequests, setFulfilledRequests] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<{ username: string; email: string } | null>(null);

    const login = useCallback((user: { username: string; email: string }) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setAddress(null);
        setBalance(null);
        setIsConnected(false);
        setProvider(null);
    }, []);

    const addFulfilledRequest = useCallback((request: any) => {
        setFulfilledRequests(prev => [request, ...prev]);
    }, []);

    const updateAccountData = useCallback(async (prov: BrowserProvider, addr: string) => {
        try {
            const bal = await prov.getBalance(addr);
            setBalance(Number(formatEther(bal)).toFixed(4));
            setAddress(addr);
            setIsConnected(true);
        } catch (err) {
            console.error("Error updating account data:", err);
        }
    }, []);

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to use this feature.');
            return;
        }

        setIsConnecting(true);
        try {
            const browserProvider = new BrowserProvider(window.ethereum);
            const accounts = await browserProvider.send("eth_requestAccounts", []);

            if (accounts.length > 0) {
                setProvider(browserProvider);
                await updateAccountData(browserProvider, accounts[0]);
            }
        } catch (err) {
            console.error("Connection error:", err);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnect = () => {
        setAddress(null);
        setBalance(null);
        setIsConnected(false);
        setProvider(null);
    };

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length === 0) {
                    disconnect();
                } else if (provider) {
                    updateAccountData(provider, accounts[0]);
                }
            };

            const handleChainChanged = () => {
                window.location.reload();
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            return () => {
                if (window.ethereum) {
                    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                    window.ethereum.removeListener('chainChanged', handleChainChanged);
                }
            };
        }
    }, [provider, updateAccountData]);

    return (
        <Web3Context.Provider value={{
            address,
            balance,
            isConnected,
            isConnecting,
            connectWallet,
            disconnect,
            provider,
            fulfilledRequests,
            addFulfilledRequest,
            isLoggedIn,
            currentUser,
            login,
            logout
        }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => {
    const context = useContext(Web3Context);
    if (context === undefined) {
        throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
};

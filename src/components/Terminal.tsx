import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Send, RefreshCw, Smartphone, Monitor, Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface LogEntry {
    type: 'info' | 'success' | 'warning' | 'error' | 'command';
    message: string;
    timestamp: string;
}

export const Terminal: React.FC = () => {
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState<LogEntry[]>([
        { type: 'info', message: 'BIJLI.GRID TERMINAL v2.0.4 ONLINE', timestamp: new Date().toLocaleTimeString() },
        { type: 'warning', message: 'Connection established via secure node [0x8f...3d2a]', timestamp: new Date().toLocaleTimeString() },
        { type: 'success', message: 'System ready for input. Type "help" for commands.', timestamp: new Date().toLocaleTimeString() },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [logs]);

    const handleCommand = (cmd: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { type: 'command', message: `> ${cmd}`, timestamp }]);

        const command = cmd.toLowerCase().trim();
        let response: LogEntry;

        switch (command) {
            case 'help':
                response = { type: 'info', message: 'Available commands: status, scan, connect, clear, balance, grid', timestamp };
                break;
            case 'status':
                response = { type: 'success', message: 'System Integrity: 100% | Node Latency: 24ms | Peers: 12', timestamp };
                break;
            case 'clear':
                setLogs([]);
                return;
            case 'scan':
                response = { type: 'warning', message: 'Scanning network... Found 3 potential threats blocked by firewall.', timestamp };
                break;
            case 'connect':
                response = { type: 'success', message: 'Connected to mainnet relay. Synchronization active.', timestamp };
                break;
            case 'grid':
                response = { type: 'info', message: 'Grid load: 450MW | Stabilization active | Frequency: 50.02Hz', timestamp };
                break;
            default:
                response = { type: 'error', message: `Unknown command: "${command}". Type "help" for list.`, timestamp };
        }

        setTimeout(() => {
            setLogs(prev => [...prev, response]);
        }, 300);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleCommand(input);
        setInput('');
    };

    return (
        <div className="h-full flex flex-col p-6 gap-6 text-white font-mono">
            <header className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-3xl font-bold glow-text uppercase tracking-widest flex items-center gap-3">
                        <TerminalIcon className="text-hologram" size={32} />
                        Command Interface
                    </h2>
                    <p className="text-white/40 text-xs mt-2 uppercase tracking-wider">Direct Node Access // Secure Channel</p>
                </div>
                <div className="flex gap-4 text-xs font-bold text-hologram">
                    <div className="glass-panel px-3 py-1 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        ONLINE
                    </div>
                    <div className="glass-panel px-3 py-1">
                        LATENCY: 24ms
                    </div>
                </div>
            </header>

            {/* Terminal Output Area */}
            <div className="flex-1 glass-panel p-6 overflow-hidden flex flex-col relative bg-black/40">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-hologram/50 to-transparent opacity-50" />

                <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm scrollbar-hide">
                    {logs.map((log, i) => (
                        <div key={i} className={cn(
                            "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                            log.type === 'command' && "text-white opacity-80 mt-4 font-bold",
                            log.type === 'info' && "text-blue-400",
                            log.type === 'success' && "text-energy-production",
                            log.type === 'warning' && "text-yellow-400",
                            log.type === 'error' && "text-red-500"
                        )}>
                            <span className="text-white/20 shrink-0 select-none">[{log.timestamp}]</span>
                            <span className="break-all">{log.message}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
                    <span className="text-hologram font-bold animate-pulse">{'>'}</span>
                    <form onSubmit={handleSubmit} className="flex-1">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-white font-mono focus:ring-0 placeholder:text-white/20"
                            placeholder="Enter system command..."
                            autoFocus
                        />
                    </form>
                    <button onClick={handleSubmit} className="text-hologram hover:text-white transition-colors">
                        <Send size={18} />
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'SYS_DIAGNOSTIC', cmd: 'status', icon: <Monitor size={16} /> },
                    { label: 'NET_SCAN', cmd: 'scan', icon: <RefreshCw size={16} /> },
                    { label: 'GRID_SYNC', cmd: 'grid', icon: <Zap size={16} /> },
                    { label: 'MOBILE_LINK', cmd: 'connect', icon: <Smartphone size={16} /> },
                ].map((action) => (
                    <button
                        key={action.label}
                        onClick={() => handleCommand(action.cmd)}
                        className="glass-panel p-3 flex items-center justify-center gap-3 text-xs font-bold text-white/60 hover:text-hologram hover:bg-white/5 transition-all group"
                    >
                        {action.icon}
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

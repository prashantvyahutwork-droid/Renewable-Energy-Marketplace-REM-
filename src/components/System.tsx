import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Wifi, Bell, Volume2, Shield, RefreshCw, Zap, Activity } from 'lucide-react';

interface ToggleProps {
    label: string;
    description: string;
    icon: React.ReactNode;
    enabled: boolean;
    onChange: (val: boolean) => void;
}

const SettingsToggle: React.FC<ToggleProps> = ({ label, description, icon, enabled, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
        <div className="flex gap-4 items-center">
            <div className={`p-2 rounded-lg bg-black/40 border border-white/10 text-hologram`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-bold text-white tracking-wide uppercase">{label}</p>
                <p className="text-[10px] text-white/40 font-mono mt-0.5">{description}</p>
            </div>
        </div>
        <button
            onClick={() => onChange(!enabled)}
            className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${enabled ? 'bg-hologram shadow-[0_0_10px_rgba(0,242,255,0.3)]' : 'bg-white/10'}`}
        >
            <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    </div>
);

export const System: React.FC = () => {
    const [settings, setSettings] = useState({
        notifications: true,
        autoSync: true,
        lowEnergyAlert: true,
        hapticFeedback: false,
        soundEffects: true,
        stealthMode: false,
        relayOptimization: true,
        biometricVerification: true
    });

    const updateSetting = (key: keyof typeof settings) => (val: boolean) => {
        setSettings(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto no-scrollbar pb-24">
            <header className="mb-12">
                <h2 className="text-3xl font-bold glow-text uppercase tracking-widest flex items-center gap-3">
                    <Settings className="text-hologram" size={32} />
                    GRID PREFERENCES
                </h2>
                <p className="text-white/40 text-[10px] mt-2 uppercase tracking-[0.3em] font-mono">Control Center // System Configurations // v2.0.4</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Core Grid Configuration */}
                <div className="space-y-6">
                    <h3 className="text-sm font-mono text-hologram border-b border-white/10 pb-3 mb-6 uppercase tracking-wider flex items-center gap-2">
                        <Zap size={14} />
                        Grid Synchronization
                    </h3>

                    <SettingsToggle
                        label="Smart Grid Auto-Sync"
                        description="Automatically synchronize with nearest energy peer relay"
                        icon={<RefreshCw size={18} />}
                        enabled={settings.autoSync}
                        onChange={updateSetting('autoSync')}
                    />

                    <SettingsToggle
                        label="Relay Node Optimization"
                        description="Prioritize routes with lowest latency (Delhi/Mumbai Hubs)"
                        icon={<Activity size={18} />}
                        enabled={settings.relayOptimization}
                        onChange={updateSetting('relayOptimization')}
                    />

                    <SettingsToggle
                        label="Energy Low Warning"
                        description="Alert when localized energy credits drop below 5 MW/h"
                        icon={<Bell size={18} />}
                        enabled={settings.lowEnergyAlert}
                        onChange={updateSetting('lowEnergyAlert')}
                    />
                </div>

                {/* Security & Access */}
                <div className="space-y-6">
                    <h3 className="text-sm font-mono text-hologram border-b border-white/10 pb-3 mb-6 uppercase tracking-wider flex items-center gap-2">
                        <Shield size={14} />
                        Security Protocols
                    </h3>

                    <SettingsToggle
                        label="Biometric Verification"
                        description="Require fingerprint for large MW energy transactions"
                        icon={<Shield size={18} />}
                        enabled={settings.biometricVerification}
                        onChange={updateSetting('biometricVerification')}
                    />

                    <SettingsToggle
                        label="Transaction Alerts"
                        description="Push notifications for all incoming/outgoing transfers"
                        icon={<Bell size={18} />}
                        enabled={settings.notifications}
                        onChange={updateSetting('notifications')}
                    />

                    <SettingsToggle
                        label="Stealth Routing"
                        description="Obfuscate peer connection history on public explorer"
                        icon={<Settings size={18} />}
                        enabled={settings.stealthMode}
                        onChange={updateSetting('stealthMode')}
                    />
                </div>

                {/* Interface Experience */}
                <div className="space-y-6 md:col-span-2">
                    <h3 className="text-sm font-mono text-white/40 border-b border-white/10 pb-3 mb-6 uppercase tracking-wider">
                        Interface Experience
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SettingsToggle
                            label="Holographic Sound Effects"
                            description="Auditory feedback for grid interactions"
                            icon={<Volume2 size={18} />}
                            enabled={settings.soundEffects}
                            onChange={updateSetting('soundEffects')}
                        />
                        <SettingsToggle
                            label="Auto-Connect Node"
                            description="Automatically link wallet on interface launch"
                            icon={<Wifi size={18} />}
                            enabled={settings.hapticFeedback}
                            onChange={updateSetting('hapticFeedback')}
                        />
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 p-6 glass-panel bg-energy-production/5 border-energy-production/20 rounded-xl"
            >
                <div className="flex items-center gap-4 text-energy-production">
                    <Activity size={24} />
                    <div>
                        <h4 className="font-bold text-sm uppercase">Node Health Status: Optimal</h4>
                        <p className="text-[10px] font-mono mt-0.5 opacity-60 uppercase">All grid systems operational. Protocol integrity verified.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

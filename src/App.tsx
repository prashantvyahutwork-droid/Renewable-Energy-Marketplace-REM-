import React, { useState } from 'react';
import { LayoutDashboard, ShoppingCart, User, Globe, Settings, History, Menu, X, Zap } from 'lucide-react';
import { Dashboard2D } from './components/Dashboard2D';
import { Dashboard3D } from './components/Dashboard3D';
import { Trading2D } from './components/Trading2D';
import { Identity } from './components/Identity';
import { Network } from './components/Network';
import { Ledger } from './components/Ledger';
import { System } from './components/System';
import { Web3Provider, useWeb3 } from './context/Web3Context';
import { Canvas } from '@react-three/fiber';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 group relative",
      active ? "text-hologram bg-hologram/10" : "text-white/40 hover:text-white/80 hover:bg-white/5"
    )}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-hologram shadow-[0_0_15px_#00f2ff]" />}
    <div className={cn("transition-transform group-hover:scale-110", active && "animate-pulse-glow")}>
      {icon}
    </div>
    <span className="text-xs font-mono font-bold uppercase tracking-[0.2em]">{label}</span>
  </button>
);

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isConnected, isConnecting, address, connectWallet, disconnect, isLoggedIn } = useWeb3();

  // Redirect to Identity if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      setActiveSection('PROFILE');
    }
  }, [isLoggedIn]);

  const renderSection = () => {
    // Force Identity section if not logged in
    if (!isLoggedIn) return <Identity />;

    switch (activeSection) {
      case 'DASHBOARD':
        return (
          <div className="h-full relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Canvas shadows>
                <Dashboard3D />
              </Canvas>
            </div>
            <div className="relative z-10 h-full overflow-y-auto no-scrollbar">
              <Dashboard2D />
            </div>
          </div>
        );
      case 'TRADING': return <Trading2D />;
      case 'PROFILE': return <Identity />;
      case 'WORLD': return <Network />;
      case 'HISTORY': return <Ledger />;
      case 'SETTINGS': return <System />;
      default: return (
        <div className="h-full flex flex-col items-center justify-center text-white/20">
          <Globe className="w-24 h-24 mb-6 animate-pulse" />
          <h2 className="text-2xl font-mono font-bold uppercase tracking-tighter">{activeSection} SECTION UNDER CORE MAINTENANCE</h2>
          <p className="mt-2 font-mono text-sm">[ CODE_ALPHA_V2 ]</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-space text-white font-sans selection:bg-hologram/30 relative">
      {/* Sidebar Navigation - Absolute Drawer for 'Sliding' feel */}
      <aside className={cn(
        "fixed h-full glass-panel rounded-none border-y-0 border-l-0 transition-all duration-500 ease-in-out z-50 bg-space/80 backdrop-blur-2xl px-6",
        isSidebarOpen ? "translate-x-0 w-72 opacity-100 shadow-[20px_0_50px_rgba(0,0,0,0.5)]" : "-translate-x-full w-72 opacity-0"
      )}>
        <div className="py-8 pb-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-hologram animate-pulse-glow flex items-center justify-center">
              <Zap className="w-5 h-5 text-space fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter glow-text">BIJLI.GRID</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-full lg:opacity-0 transition-opacity">
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-1 -mx-6">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeSection === 'DASHBOARD'}
            onClick={() => {
              if (!isLoggedIn) return;
              setActiveSection('DASHBOARD');
              if (window.innerWidth < 1024) setIsSidebarOpen(false);
            }}
          />
          <NavItem
            icon={<ShoppingCart size={20} />}
            label="Marketplace"
            active={activeSection === 'TRADING'}
            onClick={() => {
              if (!isLoggedIn) return;
              setActiveSection('TRADING');
              if (window.innerWidth < 1024) setIsSidebarOpen(false);
            }}
          />
          <NavItem icon={<User size={20} />} label="Identity" active={activeSection === 'PROFILE'} onClick={() => { setActiveSection('PROFILE'); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} />
          <NavItem
            icon={<Globe size={20} />}
            label="Network"
            active={activeSection === 'WORLD'}
            onClick={() => {
              if (!isLoggedIn) return;
              setActiveSection('WORLD');
              if (window.innerWidth < 1024) setIsSidebarOpen(false);
            }}
          />
          <NavItem
            icon={<History size={20} />}
            label="Ledger"
            active={activeSection === 'HISTORY'}
            onClick={() => {
              if (!isLoggedIn) return;
              setActiveSection('HISTORY');
              if (window.innerWidth < 1024) setIsSidebarOpen(false);
            }}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="System"
            active={activeSection === 'SETTINGS'}
            onClick={() => {
              if (!isLoggedIn) return;
              setActiveSection('SETTINGS');
              if (window.innerWidth < 1024) setIsSidebarOpen(false);
            }}
          />
        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="glass-panel p-4 bg-white/5 rounded-xl border-white/5">
            <p className="text-[10px] font-mono text-white/40 uppercase mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full animate-pulse", isLoggedIn ? "bg-energy-production" : "bg-red-500")} />
              <span className="text-[10px] font-mono">{isLoggedIn ? 'GRID_ACTIVE' : 'ID_PROTECTED'}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px] transition-opacity duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area - Stable Layout */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 z-40 bg-space/50 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn("p-2 hover:bg-white/5 rounded-lg transition-colors", !isLoggedIn && "opacity-20 cursor-not-allowed")}
              disabled={!isLoggedIn}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-white/40 uppercase">Power Hub</span>
              <span className="text-xs font-bold tracking-widest text-hologram">{isLoggedIn ? activeSection : 'AUTHENTICATION REQUIRED'}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {isLoggedIn && (
              <>
                {isConnected ? (
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-mono text-white/40">NODE_ADDRESS</p>
                      <p className="text-xs font-bold font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                    </div>
                    <button
                      onClick={disconnect}
                      className="glass-panel px-4 py-2 text-xs font-bold uppercase tracking-wider border-energy-glow/50 text-energy-glow hover:bg-energy-glow/10"
                    >
                      DISCONNECT
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="glass-panel px-6 py-2 text-xs font-bold uppercase tracking-widest bg-hologram/10 text-hologram hover:bg-hologram/20 animate-pulse-glow"
                  >
                    {isConnecting ? 'ESTABLISHING...' : 'LINK_NODE'}
                  </button>
                )}
              </>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hologram/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-energy-glow/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative h-full z-10">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
}

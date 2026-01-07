import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Globe, Server, Activity, Wifi, Zap } from 'lucide-react';

const NetworkNode = ({ position, color, size = 0.5, isMain = false }: { position: [number, number, number], color: string, size?: number, isMain?: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z =
                size + Math.sin(state.clock.elapsedTime * (isMain ? 4 : 2) + position[0]) * (isMain ? 0.2 : 0.1);
        }
    });

    return (
        <Float speed={isMain ? 4 : 2} rotationIntensity={isMain ? 1 : 0.5} floatIntensity={isMain ? 1 : 0.5}>
            <mesh ref={meshRef} position={position}>
                <sphereGeometry args={[size, isMain ? 32 : 16, isMain ? 32 : 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isMain ? 5 : 2}
                    toneMapped={false}
                    transparent
                    opacity={isMain ? 1 : 0.8}
                />
            </mesh>
            <pointLight position={position} intensity={isMain ? 2 : 0.5} color={color} distance={isMain ? 10 : 3} />
        </Float>
    );
};

const ConnectionLines = ({ nodes, mainPos }: { nodes: { pos: [number, number, number], color: string }[], mainPos: [number, number, number] }) => {
    const lines = useMemo(() => {
        const linePoints: THREE.Vector3[] = [];
        // Connect everyone to main node
        nodes.forEach(node => {
            linePoints.push(new THREE.Vector3(...mainPos));
            linePoints.push(new THREE.Vector3(...node.pos));
        });
        // Casually connect others
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (Math.random() > 0.85) {
                    linePoints.push(new THREE.Vector3(...nodes[i].pos));
                    linePoints.push(new THREE.Vector3(...nodes[j].pos));
                }
            }
        }
        return linePoints;
    }, [nodes, mainPos]);

    return (
        <lineSegments>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={lines.length}
                    array={new Float32Array(lines.flatMap(v => [v.x, v.y, v.z]))}
                    itemSize={3}
                    args={[new Float32Array(lines.flatMap(v => [v.x, v.y, v.z])), 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#00f2ff" transparent opacity={0.2} />
        </lineSegments>
    );
};


const NetworkScene = () => {
    const mainPos: [number, number, number] = [0, 0, 0];
    const nodes = useMemo(() => {
        return Array.from({ length: 25 }).map(() => ({
            pos: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            ] as [number, number, number],
            color: Math.random() > 0.6 ? "#00f2ff" : "#ff3366"
        })).filter(n => Math.sqrt(n.pos[0] ** 2 + n.pos[1] ** 2 + n.pos[2] ** 2) > 2); // Keep clear of center
    }, []);

    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <Stars radius={100} depth={50} count={7000} factor={4} saturation={1} fade speed={1.5} />

            <group>
                <NetworkNode position={mainPos} color="#00f2ff" size={0.8} isMain={true} />
                {nodes.map((node, i) => (
                    <NetworkNode key={i} position={node.pos} color={node.color} size={Math.random() * 0.2 + 0.15} />
                ))}
                <ConnectionLines nodes={nodes} mainPos={mainPos} />
            </group>

            <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={false} />
        </>
    );
};

export const Network: React.FC = () => {
    return (
        <div className="h-full relative overflow-hidden flex flex-col">
            {/* Helper UI Overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 p-8 flex justify-between items-start pointer-events-none">
                <div>
                    <h2 className="text-3xl font-bold glow-text uppercase tracking-widest flex items-center gap-3">
                        <Globe className="text-hologram" size={32} />
                        BIJLI.GRID PEER TOPOLOGY
                    </h2>
                    <div className="mt-4 flex gap-6">
                        <div className="glass-panel px-4 py-2 bg-black/40 backdrop-blur-md border border-hologram/20">
                            <p className="text-[10px] text-white/40 uppercase font-mono">Connected Peers</p>
                            <p className="text-xl font-bold text-white tracking-widest">12,482</p>
                        </div>
                        <div className="glass-panel px-4 py-2 bg-black/40 backdrop-blur-md border border-energy-production/20">
                            <p className="text-[10px] text-white/40 uppercase font-mono">Grid Hashrate</p>
                            <p className="text-xl font-bold text-energy-production tracking-widest">1.4 PH/s</p>
                        </div>
                        <div className="glass-panel px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 text-white/40">
                            <p className="text-[10px] uppercase font-mono text-center">Protocol</p>
                            <p className="text-sm font-bold mt-1">BIJLI_PROTOCOL_v2.0</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 pointer-events-auto">
                    <div className="flex items-center gap-2 text-xs font-mono text-white/60 bg-black/40 px-3 py-1 rounded-full border border-hologram/30 shadow-[0_0_10px_rgba(0,242,255,0.2)]">
                        <div className="w-2 h-2 bg-hologram rounded-full animate-pulse" />
                        <span>Core Node Active</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/60 bg-black/40 px-3 py-1 rounded-full border border-energy-production/30 shadow-[0_0_10px_rgba(255,51,102,0.2)]">
                        <div className="w-2 h-2 bg-energy-production rounded-full" />
                        <span>Energy Relay Sync</span>
                    </div>
                </div>
            </div>

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-space to-black">
                <Canvas camera={{ position: [0, 0, 18] }}>
                    <NetworkScene />
                </Canvas>
            </div>

            {/* Bottom Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10 pointer-events-none">
                <div className="glass-panel p-6 bg-black/60 backdrop-blur-md flex justify-between items-center pointer-events-auto border-t border-white/5">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-4 group">
                            <div className="p-2.5 bg-hologram/10 rounded-lg group-hover:bg-hologram/20 transition-colors">
                                <Zap className="text-hologram" size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-wider">Delhi Core Hub</p>
                                <p className="text-[10px] text-white/40 font-mono">LATENCY: 8ms • LOAD: 42%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group border-l border-white/10 pl-8">
                            <div className="p-2.5 bg-energy-production/10 rounded-lg group-hover:bg-energy-production/20 transition-colors">
                                <Server className="text-energy-production" size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-wider">Mumbai Peer Relay</p>
                                <p className="text-[10px] text-white/40 font-mono">LATENCY: 14ms • LOAD: 68%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group border-l border-white/10 pl-8">
                            <div className="p-2.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                <Activity className="text-white/60" size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">Bangalore Grid</p>
                                <p className="text-[10px] text-white/40 font-mono">LATENCY: 12ms • PREFERRED</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-hologram glass-panel px-4 py-2 border-hologram/30">
                        <Wifi size={16} className="animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Grid_Link_Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

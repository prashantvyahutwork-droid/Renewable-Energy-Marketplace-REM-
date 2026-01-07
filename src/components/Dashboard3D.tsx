import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const HolographicGauge: React.FC<{ position: [number, number, number]; label: string; value: string; color: string }> = ({ position, label, value, color }) => {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * 0.5;
            // Add a subtle flicker
            const material = ringRef.current.material as THREE.MeshBasicMaterial;
            material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 10) * 0.05;
        }
    });

    return (
        <group position={position}>
            <mesh ref={ringRef}>
                <ringGeometry args={[0.5, 0.6, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
            <mesh>
                <ringGeometry args={[0.45, 0.47, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
            <Text
                position={[0, 0, 0.1]}
                fontSize={0.15}
                color="white"
                font="/fonts/Inter-Bold.woff"
                anchorX="center"
                anchorY="middle"
            >
                {value}
            </Text>
            <Text
                position={[0, -0.7, 0]}
                fontSize={0.08}
                color={color}
                anchorX="center"
                anchorY="middle"
            >
                {label.toUpperCase()}
            </Text>
        </group>
    );
};

const EnergyFlowParticles: React.FC = () => {
    const count = 150;
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = new THREE.Object3D();
    const particles = Array.from({ length: count }, () => ({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 10,
        speed: 0.01 + Math.random() / 200,
        xFactor: -5 + Math.random() * 10,
        yFactor: -5 + Math.random() * 10,
        zFactor: -5 + Math.random() * 10
    }));

    useFrame(() => {
        particles.forEach((particle, i) => {
            let { t, factor, speed } = particle;
            t = particle.t += speed / 2;
            const s = Math.cos(t);
            dummy.position.set(
                (particle.xFactor) + (Math.cos(t) * factor),
                (particle.yFactor) + (Math.sin(t) * factor),
                (particle.zFactor) + (Math.cos(t) * Math.sin(t) * factor)
            );
            dummy.scale.set(s, s, s);
            dummy.updateMatrix();
            if (meshRef.current) meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#00f2ff" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
}

export const Dashboard3D: React.FC = () => {
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 2.5} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
            <pointLight position={[-10, 5, -5]} intensity={1} color="#ff3366" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => setClicked(!clicked)}
                    scale={hovered ? 1.05 : 1}
                    rotation-x={clicked ? 0.3 : 0}
                    rotation-y={Math.sin(Date.now() / 2000) * 0.05} // Idle breathing rotation
                >
                    {/* Main Translucent Hub Panel with Layered Glass */}
                    <mesh>
                        <boxGeometry args={[6, 4, 0.1]} />
                        <meshPhysicalMaterial
                            transparent
                            opacity={0.2}
                            roughness={0}
                            metalness={1}
                            transmission={0.9}
                            thickness={1}
                            ior={1.5}
                            color="#00ccff"
                        />
                    </mesh>

                    {/* Glowing Edge Border */}
                    <mesh>
                        <boxGeometry args={[6.1, 4.1, 0.12]} />
                        <meshBasicMaterial color="#00f2ff" wireframe transparent opacity={0.2} />
                    </mesh>

                    {/* Additional Holographic Accents */}
                    <mesh position={[0, 0, -0.2]}>
                        <planeGeometry args={[7, 5]} />
                        <meshBasicMaterial color="#00f2ff" transparent opacity={0.02} side={THREE.DoubleSide} />
                    </mesh>

                    {/* Gauges */}
                    <HolographicGauge position={[-2, 1, 0.2]} label="Production" value="842 kW" color="#00ffcc" />
                    <HolographicGauge position={[0, 1, 0.2]} label="Consumption" value="612 kW" color="#ff3366" />
                    <HolographicGauge position={[2, 1, 0.2]} label="Surplus" value="230 kW" color="#00d4ff" />

                    {/* Center Scanline Effect (Fake) */}
                    <mesh position={[0, 0, 0.06]}>
                        <planeGeometry args={[5.8, 3.8]} />
                        <meshBasicMaterial color="#00f2ff" transparent opacity={0.03} />
                    </mesh>

                    {/* Center Data Stream Placeholder */}
                    <group position={[0, -0.8, 0.2]}>
                        <mesh>
                            <planeGeometry args={[5.5, 1]} />
                            <meshBasicMaterial color="#00f2ff" transparent opacity={0.05} />
                        </mesh>
                        <Text position={[0, 0, 0.05]} fontSize={0.12} color="#00d4ff" font="/fonts/Inter-Bold.woff" anchorX="center">
                            {`>> BIJLI_GRID_STATUS: STABLE // SCANNING_P2P_NODES...`}
                        </Text>
                    </group>
                </group>
            </Float>

            <EnergyFlowParticles />

            <Environment preset="night" />
        </group>
    );
};

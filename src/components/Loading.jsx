import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box, Float, Html, useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// 3D Loading Animation Component
const LoadingGeometry = () => {
    const groupRef = useRef();
    const sphereRef = useRef();
    const boxRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
        
        if (sphereRef.current) {
            sphereRef.current.rotation.x = state.clock.elapsedTime * 0.8;
            sphereRef.current.rotation.z = state.clock.elapsedTime * 0.6;
        }

        if (boxRef.current) {
            boxRef.current.rotation.y = -state.clock.elapsedTime * 0.4;
            boxRef.current.rotation.z = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 0, 0]}>
                    <meshStandardMaterial 
                        color="#3b82f6" 
                        transparent 
                        opacity={0.8}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>
            
            <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
                <Box ref={boxRef} args={[1.5, 1.5, 1.5]} position={[3, 0, 0]}>
                    <meshStandardMaterial 
                        color="#00d4ff" 
                        transparent 
                        opacity={0.6}
                        wireframe
                    />
                </Box>
            </Float>
            
            <Float speed={1.8} rotationIntensity={0.5} floatIntensity={3}>
                <Sphere args={[0.7, 16, 16]} position={[-2.5, 1, 0]}>
                    <meshStandardMaterial 
                        color="#a855f7" 
                        transparent 
                        opacity={0.7}
                        emissive="#a855f7"
                        emissiveIntensity={0.2}
                    />
                </Sphere>
            </Float>
        </group>
    );
};

// Progress Bar Component
const ProgressBar = ({ progress }) => {
    const progressRef = useRef(null);

    useEffect(() => {
        if (progressRef.current) {
            gsap.to(progressRef.current, {
                width: `${progress}%`,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    }, [progress]);

    return (
        <div className="w-80 max-w-full mx-auto mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-primary-400 text-sm font-medium">Loading Assets</span>
                <span className="text-white font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
                <div 
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-cyan rounded-full w-0 transition-all duration-500"
                />
            </div>
        </div>
    );
};

// Loading Text Animation
const LoadingText = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(textRef.current, {
            opacity: 0.5,
            duration: 1,
            ease: "power2.inOut"
        });
    }, []);

    return (
        <motion.div
            ref={textRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
        >
            <motion.h1
                className="text-4xl md:text-5xl font-display font-bold text-white"
                animate={{ 
                    backgroundPosition: ["0%", "100%", "0%"]
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
                style={{
                    background: "linear-gradient(90deg, #3b82f6, #00d4ff, #a855f7, #3b82f6)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                }}
            >
                My Portfolio
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-dark-300 text-lg"
            >
                Creating amazing experiences...
            </motion.p>
        </motion.div>
    );
};

// Loading Dots Animation
const LoadingDots = () => {
    return (
        <div className="flex gap-2 justify-center mt-8">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="w-3 h-3 bg-primary-500 rounded-full"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.2
                    }}
                />
            ))}
        </div>
    );
};

// Main Loading Component
const Loading = ({ isLoading, onLoadingComplete }) => {
    const { progress } = useProgress();
    const containerRef = useRef(null);

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => {
                // Animate out before calling onLoadingComplete
                gsap.to(containerRef.current, {
                    opacity: 0,
                    y: -50,
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                        onLoadingComplete();
                    }
                });
            }, 1000); // Wait 1 second after loading completes

            return () => clearTimeout(timer);
        }
    }, [progress, onLoadingComplete]);

    if (!isLoading) return null;

    return (
        <AnimatePresence>
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-dark-900 flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-3xl"></div>
                </div>

                {/* 3D Canvas */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full max-w-2xl max-h-2xl">
                        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                            <ambientLight intensity={0.3} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00d4ff" />
                            <LoadingGeometry />
                        </Canvas>
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 text-center space-y-8 max-w-lg mx-auto px-6">
                    <LoadingText />
                    <ProgressBar progress={progress} />
                    <LoadingDots />
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-cyan to-transparent animate-pulse"></div>
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-accent-purple to-transparent animate-pulse"></div>
                    <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent animate-pulse"></div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Loading;
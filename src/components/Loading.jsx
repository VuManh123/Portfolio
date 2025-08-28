import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// CSS-only Loading Animation Components
const LoadingGeometry = () => {
    return (
        <div className="relative w-64 h-64 mx-auto">
            {/* Main sphere */}
            <div className="absolute inset-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full animate-float shadow-2xl shadow-primary-500/30">
                <div className="absolute inset-2 bg-gradient-to-tr from-primary-400/50 to-transparent rounded-full animate-pulse-slow"></div>
                <div className="absolute top-6 left-6 w-12 h-12 bg-white/20 rounded-full blur-sm"></div>
            </div>
            
            {/* Wireframe cube */}
            <div className="absolute top-0 right-0 w-24 h-24 animate-spin-slow">
                <div className="relative w-full h-full">
                    {/* Cube edges */}
                    <div className="absolute inset-0 border-2 border-accent-cyan/60 rotate-45 transform-gpu animate-pulse"></div>
                    <div className="absolute inset-2 border-2 border-accent-cyan/40 rotate-45 transform-gpu animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute inset-4 border-2 border-accent-cyan/20 rotate-45 transform-gpu animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>
            
            {/* Small purple sphere */}
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-accent-purple to-purple-600 rounded-full animate-bounce-slow shadow-lg shadow-purple-500/30">
                <div className="absolute inset-1 bg-gradient-to-tr from-purple-300/30 to-transparent rounded-full"></div>
            </div>
            
            {/* Orbiting particles */}
            <div className="absolute inset-0 animate-spin-reverse">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full animate-twinkle"></div>
                <div className="absolute top-1/2 right-0 w-3 h-3 bg-accent-cyan rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-accent-purple rounded-full animate-twinkle"></div>
                <div className="absolute top-1/2 left-0 w-3 h-3 bg-primary-400 rounded-full animate-pulse"></div>
            </div>
        </div>
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
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);

    // Simulate loading progress
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    // Simulate realistic loading with varying speeds
                    const increment = Math.random() * 15 + 5;
                    return Math.min(prev + increment, 100);
                });
            }, 200);

            return () => clearInterval(interval);
        }
    }, [isLoading]);

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

                {/* Animated background stars */}
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                {/* CSS-only 3D Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full max-w-2xl max-h-2xl flex items-center justify-center">
                        <LoadingGeometry />
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
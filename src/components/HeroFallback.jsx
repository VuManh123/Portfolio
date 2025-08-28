import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const HeroFallback = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });
        
        tl.from(titleRef.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
        .from(subtitleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from(buttonsRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6");
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-20 lg:pt-0 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900/20"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow"></div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex-1 max-w-2xl space-y-8 text-center lg:text-left"
            >
                {/* Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-primary-400 text-lg font-medium tracking-wide"
                >
                    👋 Welcome to my portfolio
                </motion.div>

                {/* Main Title */}
                <div ref={titleRef} className="space-y-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                        Hi, I'm{" "}
                        <span className="bg-gradient-to-r from-primary-400 via-accent-cyan to-accent-purple bg-clip-text text-transparent animate-gradient bg-300%">
                            Mạnh
                        </span>
                    </h1>
                    <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-300">
                        <span className="text-white">Creative </span>
                        <span className="text-primary-400">Frontend Developer</span>
                    </div>
                </div>

                {/* Subtitle */}
                <p ref={subtitleRef} className="text-lg md:text-xl text-dark-300 leading-relaxed max-w-xl">
                    I craft beautiful, interactive web experiences using{" "}
                    <span className="text-primary-400 font-semibold">React</span>,{" "}
                    <span className="text-accent-cyan font-semibold">Three.js</span>, and{" "}
                    <span className="text-accent-purple font-semibold">modern animations</span>
                </p>

                {/* Tech Stack Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="flex flex-wrap gap-3 justify-center lg:justify-start"
                >
                    {["React", "Three.js", "Tailwind", "Framer Motion", "GSAP"].map((tech, index) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-300 text-sm font-medium backdrop-blur-sm"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Action Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                    >
                        Hire Me
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 border-2 border-primary-500 text-primary-400 font-semibold rounded-lg hover:bg-primary-500/10 transition-all duration-300"
                    >
                        View Projects
                    </motion.button>
                </div>
            </motion.div>

            {/* CSS-only Visual Element */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="relative flex-1 h-[400px] lg:h-[600px] w-full max-w-2xl"
            >
                {/* Enhanced AnimatedBackground */}
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800/50 to-dark-900/50 rounded-2xl overflow-hidden">
                    {/* Large Animated Orbs */}
                    <motion.div
                        className="absolute w-40 h-40 bg-primary-500/20 rounded-full blur-2xl"
                        animate={{
                            x: [0, 120, 0],
                            y: [0, -60, 0],
                            scale: [1, 1.3, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    
                    <motion.div
                        className="absolute w-32 h-32 bg-accent-cyan/20 rounded-full blur-xl"
                        animate={{
                            x: [0, -100, 0],
                            y: [0, 80, 0],
                            scale: [1, 0.7, 1],
                            rotate: [0, -90, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />
                    
                    <motion.div
                        className="absolute w-28 h-28 bg-accent-purple/20 rounded-full blur-lg"
                        animate={{
                            x: [0, 80, 0],
                            y: [0, -100, 0],
                            scale: [1, 1.6, 1],
                            rotate: [0, 270, 360],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />

                    {/* Central Icon with Complex Animation */}
                    <div className="relative z-10 text-center">
                        <motion.div
                            className="text-8xl mb-6 inline-block"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                                filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                background: "linear-gradient(45deg, #3b82f6, #00d4ff, #a855f7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                backgroundSize: "200% 200%",
                            }}
                        >
                            ⚛️
                        </motion.div>
                        <motion.p
                            className="text-primary-400 text-xl font-semibold"
                            animate={{
                                opacity: [0.6, 1, 0.6],
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            Creative Experience
                        </motion.p>
                    </div>

                    {/* Enhanced Floating Particles */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute rounded-full ${
                                i % 3 === 0 ? 'w-3 h-3 bg-primary-400/60' :
                                i % 3 === 1 ? 'w-2 h-2 bg-accent-cyan/60' :
                                'w-1 h-1 bg-accent-purple/60'
                            }`}
                            style={{
                                left: `${15 + (i * 6)}%`,
                                top: `${20 + (i * 4)}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.sin(i) * 20, 0],
                                opacity: [0.4, 1, 0.4],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 4 + (i * 0.3),
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                        />
                    ))}

                    {/* Geometric Shapes */}
                    <motion.div
                        className="absolute top-16 right-16 w-8 h-8 border-2 border-primary-400/50 rotate-45"
                        animate={{
                            rotate: [45, 405],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    
                    <motion.div
                        className="absolute bottom-24 left-16 w-6 h-6 bg-accent-cyan/30 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-4 h-4 bg-accent-cyan rounded-full animate-bounce-slow"></div>
                <div className="absolute bottom-20 left-10 w-6 h-6 bg-accent-purple rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-5 w-2 h-2 bg-primary-400 rounded-full animate-ping"></div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
            >
                <span className="text-dark-400 text-sm font-medium">Scroll down</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 border-2 border-primary-500/50 rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 16, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1 h-3 bg-primary-500 rounded-full mt-2"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroFallback;
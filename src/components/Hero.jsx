import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import SafeCanvas from "./SafeCanvas";
import HeroFallback from "./HeroFallback";

const AnimatedSphere = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 32, 32]} scale={1.2}>
        <MeshDistortMaterial 
          color="#3b82f6" 
          attach="material" 
          distort={0.3} 
          speed={2}
          roughness={0.3}
          metalness={0.6}
        />
      </Sphere>
    </Float>
  );
};

const Hero = () => {
    const [useWebGL, setUseWebGL] = useState(true);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);

    useEffect(() => {
        // Check for Intel UHD Graphics 620 and disable WebGL
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                // Force fallback for Intel UHD Graphics 620
                if (renderer.includes('Intel') && renderer.includes('UHD Graphics 620')) {
                    console.log('Intel UHD Graphics 620 detected - using CSS fallback');
                    setUseWebGL(false);
                }
            }
        } else {
            setUseWebGL(false);
        }

        const tl = gsap.timeline({ delay: 0.5 });
        
        if (titleRef.current) {
            tl.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        }
        if (subtitleRef.current) {
            tl.from(subtitleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");
        }
        if (buttonsRef.current) {
            tl.from(buttonsRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6");
        }
    }, []);

    // Use fallback for Intel UHD Graphics 620 or if WebGL fails
    if (!useWebGL) {
        return <HeroFallback />;
    }

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

            {/* 3D Canvas */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="relative flex-1 h-[400px] lg:h-[600px] w-full max-w-2xl"
            >
                <SafeCanvas 
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    fallback={
                        <div className="flex items-center justify-center h-full bg-dark-800/50 rounded-lg">
                            <div className="text-center p-8">
                                <div className="text-6xl mb-4 animate-pulse">🌟</div>
                                <p className="text-primary-400 text-lg font-medium">
                                    Creative Developer
                                </p>
                            </div>
                        </div>
                    }
                >
                    <Stars radius={50} depth={50} count={200} factor={4} saturation={0.5} fade />
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00d4ff" />
                    <AnimatedSphere />
                    <OrbitControls 
                        enableZoom={false} 
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableDamping
                        dampingFactor={0.05}
                    />
                </SafeCanvas>

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

export default Hero;

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section id="hero" className="h-screen flex flex-col md:flex-row items-center justify-between px-10">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex-1"
            >
                <h1 className="text-5xl font-bold mb-6">Hi, I'm <span className="text-blue-400">Mạnh</span></h1>
                <p className="text-xl text-gray-300 mb-6">Frontend Developer | UI/UX Enthusiast</p>
                <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-400 transition">Hire Me</button>
            </motion.div>

            <div className="flex-1 h-[400px]">
                <Canvas>
                    <OrbitControls enableZoom={false} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 3, 2]} />
                    <Sphere args={[1, 100, 200]} scale={1.5}>
                        <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.5} speed={2} />
                    </Sphere>
                </Canvas>
            </div>
        </section>
    );
};

export default Hero;

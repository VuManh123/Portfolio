import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center px-10 bg-gray-900">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="max-w-2xl text-center"
            >
                <h2 className="text-4xl font-bold mb-4">About Me</h2>
                <p className="text-lg text-gray-300">
                    I'm passionate about creating stunning web experiences with modern technologies like React, Tailwind, and Three.js.
                </p>
            </motion.div>
        </section>
    );
};

export default About;

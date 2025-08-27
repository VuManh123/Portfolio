import React from "react";
import { motion } from "framer-motion";

const projects = [
    { title: "Portfolio Website", description: "React + Tailwind + Three.js" },
    { title: "E-Commerce App", description: "Next.js + Stripe + GSAP" },
    { title: "Landing Page", description: "Framer Motion + Lottie Animations" },
];

const Projects = () => {
    return (
        <section id="projects" className="min-h-screen px-10 py-20 bg-gray-800">
            <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {projects.map((proj, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        className="bg-gray-700 p-6 rounded-lg hover:scale-105 transition-transform"
                    >
                        <h3 className="text-2xl font-semibold">{proj.title}</h3>
                        <p className="text-gray-300 mt-2">{proj.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;

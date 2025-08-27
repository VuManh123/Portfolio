import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-10 bg-gray-900">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-4xl font-bold mb-6"
            >
                Contact Me
            </motion.h2>
            <motion.form
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md flex flex-col gap-4"
            >
                <input type="text" placeholder="Your Name" className="p-3 rounded bg-gray-800 border border-gray-600" />
                <input type="email" placeholder="Your Email" className="p-3 rounded bg-gray-800 border border-gray-600" />
                <textarea placeholder="Your Message" className="p-3 rounded bg-gray-800 border border-gray-600 h-32"></textarea>
                <button className="bg-blue-500 py-3 rounded hover:bg-blue-400 transition">Send Message</button>
            </motion.form>
        </section>
    );
};

export default Contact;

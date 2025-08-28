import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    { name: "GitHub", icon: "💻", url: "https://github.com", color: "#333" },
    { name: "LinkedIn", icon: "💼", url: "https://linkedin.com", color: "#0077b5" },
    { name: "Twitter", icon: "🐦", url: "https://twitter.com", color: "#1da1f2" },
    { name: "Instagram", icon: "📷", url: "https://instagram.com", color: "#e4405f" },
    { name: "Dribbble", icon: "🎨", url: "https://dribbble.com", color: "#ea4c89" },
    { name: "Behance", icon: "🎭", url: "https://behance.net", color: "#1769ff" }
];

const contactInfo = [
    { label: "Email", value: "hello@manhdev.com", icon: "📧", link: "mailto:hello@manhdev.com" },
    { label: "Phone", value: "+84 123 456 789", icon: "📞", link: "tel:+84123456789" },
    { label: "Location", value: "Ho Chi Minh City, VN", icon: "📍", link: "#" },
    { label: "Availability", value: "Open to new opportunities", icon: "🟢", link: "#" }
];

const Contact = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        .from(formRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5");
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            // You can add success notification here
        }, 2000);
    };

    return (
        <section 
            ref={sectionRef}
            id="contact" 
            className="relative min-h-screen py-20 px-6 lg:px-16 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent-purple/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    ref={titleRef}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-primary-400 text-lg font-medium tracking-wide uppercase"
                    >
                        Let's Work Together
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-4"
                    >
                        Get in <span className="bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">Touch</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg text-dark-300 mt-6 max-w-2xl mx-auto"
                    >
                        Ready to bring your ideas to life? Let's create something amazing together. 
                        Drop me a message and I'll get back to you as soon as possible.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-8">
                                Contact <span className="text-primary-400">Information</span>
                            </h3>
                            
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={index}
                                    href={info.link}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="flex items-center gap-4 p-4 bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-xl hover:border-primary-400/40 transition-all duration-300 group"
                                >
                                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <div className="text-primary-400 text-sm font-medium">{info.label}</div>
                                        <div className="text-white font-semibold">{info.value}</div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold text-white">
                                Follow <span className="text-primary-400">Me</span>
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex flex-col items-center gap-2 p-4 bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-xl hover:border-primary-400/40 transition-all duration-300 group"
                                    >
                                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                            {social.icon}
                                        </div>
                                        <span className="text-xs text-dark-300 group-hover:text-primary-400 transition-colors duration-300">
                                            {social.name}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">
                            Send me a <span className="text-primary-400">Message</span>
                        </h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className="block text-primary-400 text-sm font-medium mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-700/50 border border-primary-500/30 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                </motion.div>
                                
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="block text-primary-400 text-sm font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-700/50 border border-primary-500/30 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-primary-400 text-sm font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-dark-700/50 border border-primary-500/30 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all duration-300"
                                    placeholder="Project Discussion"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <label className="block text-primary-400 text-sm font-medium mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-dark-700/50 border border-primary-500/30 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all duration-300 resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                                        isSubmitting 
                                            ? 'bg-dark-600 text-dark-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-primary-500 to-accent-cyan text-white hover:shadow-lg hover:shadow-primary-500/25'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-dark-400 border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </div>
                                    ) : (
                                        'Send Message'
                                    )}
                                </motion.button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-center mt-16 pt-8 border-t border-primary-500/20"
                >
                    <p className="text-dark-400 text-sm">
                        © 2024 Mạnh Portfolio. Made with ❤️ using React, CSS3 & Tailwind CSS
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;

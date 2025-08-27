import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: "React", level: 95, icon: "⚛️", color: "#61dafb" },
    { name: "TypeScript", level: 90, icon: "📘", color: "#3178c6" },
    { name: "Tailwind CSS", level: 92, icon: "🎨", color: "#06b6d4" },
    { name: "Three.js", level: 85, icon: "🎯", color: "#000000" },
    { name: "Framer Motion", level: 88, icon: "🎭", color: "#0055ff" },
    { name: "GSAP", level: 80, icon: "⚡", color: "#88ce02" },
    { name: "Next.js", level: 87, icon: "▲", color: "#000000" },
    { name: "Node.js", level: 75, icon: "🟢", color: "#339933" },
];

const achievements = [
    { number: "50+", label: "Projects Completed", icon: "🚀" },
    { number: "3+", label: "Years Experience", icon: "💼" },
    { number: "20+", label: "Happy Clients", icon: "😊" },
    { number: "100%", label: "Client Satisfaction", icon: "⭐" },
];

const SkillBar = ({ skill, index }) => {
    const skillRef = useRef(null);
    const isInView = useInView(skillRef, { once: true, margin: "-100px" });
    
    useEffect(() => {
        if (isInView && skillRef.current) {
            gsap.to(skillRef.current.querySelector('.skill-progress'), {
                width: `${skill.level}%`,
                duration: 1.5,
                delay: index * 0.1,
                ease: "power3.out"
            });
        }
    }, [isInView, skill.level, index]);

    return (
        <motion.div
            ref={skillRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="space-y-2"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold text-white">{skill.name}</span>
                </div>
                <span className="text-primary-400 font-bold">{skill.level}%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
                <div 
                    className="skill-progress h-full rounded-full w-0"
                    style={{ backgroundColor: skill.color }}
                />
            </div>
        </motion.div>
    );
};

const About = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    
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
        .from(contentRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5");
    }, []);

    return (
        <section 
            ref={sectionRef}
            id="about" 
            className="relative min-h-screen py-20 px-6 lg:px-16 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl"></div>
            
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
                        Get to know me
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-4"
                    >
                        About <span className="bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">Me</span>
                    </motion.h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Content Section */}
                    <motion.div
                        ref={contentRef}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                Passionate <span className="text-primary-400">Frontend Developer</span>
                            </h3>
                            <p className="text-lg text-dark-300 leading-relaxed">
                                I'm passionate about creating stunning, interactive web experiences that combine beautiful design with cutting-edge technology. 
                                With expertise in React, Three.js, and modern animation libraries, I bring ideas to life through code.
                            </p>
                            <p className="text-lg text-dark-300 leading-relaxed">
                                My journey in web development started with a curiosity for how things work behind the scenes. 
                                Today, I specialize in creating immersive 3D web experiences and smooth animations that captivate users.
                            </p>
                        </motion.div>

                        {/* Achievements */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-dark-700/50 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6 text-center group"
                                >
                                    <div className="text-3xl mb-2 group-hover:animate-bounce">{achievement.icon}</div>
                                    <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-1">
                                        {achievement.number}
                                    </div>
                                    <div className="text-sm text-dark-300 font-medium">
                                        {achievement.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-cyan text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                            >
                                Download Resume
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-8 text-center">
                                Technical <span className="text-primary-400">Skills</span>
                            </h3>
                            <div className="space-y-6">
                                {skills.map((skill, index) => (
                                    <SkillBar key={skill.name} skill={skill} index={index} />
                                ))}
                            </div>
                        </div>

                        {/* Specialties */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 text-center">
                                Specialties
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {["3D Web Development", "Interactive Animations", "Responsive Design", "Performance Optimization", "UI/UX Design", "Modern JavaScript"].map((specialty, index) => (
                                    <motion.span
                                        key={specialty}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-300 text-sm font-medium"
                                    >
                                        {specialty}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

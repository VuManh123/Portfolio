import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "3D Portfolio Website",
        description: "An immersive portfolio featuring 3D elements, smooth animations, and modern design patterns.",
        technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
        image: "🌐",
        category: "Web Development",
        status: "Featured",
        link: "#",
        github: "#"
    },
    {
        id: 2,
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with payment integration, admin dashboard, and responsive design.",
        technologies: ["Next.js", "Stripe", "MongoDB", "GSAP"],
        image: "🛒",
        category: "Full Stack",
        status: "Completed",
        link: "#",
        github: "#"
    },
    {
        id: 3,
        title: "Interactive Landing Page",
        description: "High-converting landing page with scroll-triggered animations and micro-interactions.",
        technologies: ["React", "Framer Motion", "Lottie", "GSAP"],
        image: "🎨",
        category: "Frontend",
        status: "Live",
        link: "#",
        github: "#"
    },
    {
        id: 4,
        title: "Dashboard Analytics",
        description: "Real-time analytics dashboard with data visualization and interactive charts.",
        technologies: ["React", "D3.js", "Node.js", "Chart.js"],
        image: "📊",
        category: "Data Viz",
        status: "In Progress",
        link: "#",
        github: "#"
    },
    {
        id: 5,
        title: "Mobile App UI",
        description: "Modern mobile app interface with smooth animations and intuitive user experience.",
        technologies: ["React Native", "Expo", "Lottie", "Reanimated"],
        image: "📱",
        category: "Mobile",
        status: "Completed",
        link: "#",
        github: "#"
    },
    {
        id: 6,
        title: "3D Game Interface",
        description: "Interactive 3D game interface with WebGL rendering and physics simulations.",
        technologies: ["Three.js", "Cannon.js", "WebGL", "GLSL"],
        image: "🎮",
        category: "3D/WebGL",
        status: "Featured",
        link: "#",
        github: "#"
    }
];

const categories = ["All", "Web Development", "Full Stack", "Frontend", "Data Viz", "Mobile", "3D/WebGL"];

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl overflow-hidden hover:border-primary-400/40 transition-all duration-300"
        >
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Featured' ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' :
                    project.status === 'Live' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                }`}>
                    {project.status}
                </span>
            </div>

            {/* Project Image/Icon */}
            <div className="relative p-8 bg-gradient-to-br from-primary-500/10 to-accent-cyan/10">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-primary-400 text-sm font-medium">{project.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-dark-300 text-sm leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                            className="px-2 py-1 bg-primary-500/10 border border-primary-500/30 rounded text-primary-300 text-xs font-medium"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <motion.a
                        href={project.link}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2 bg-primary-500 text-white text-sm font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-300 text-center"
                    >
                        View Live
                    </motion.a>
                    <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 border border-primary-500 text-primary-400 text-sm font-semibold rounded-lg hover:bg-primary-500/10 transition-colors duration-300"
                    >
                        Code
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    
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
        });
    }, []);

    const filteredProjects = selectedCategory === "All" 
        ? projects 
        : projects.filter(project => project.category === selectedCategory);

    return (
        <section 
            ref={sectionRef}
            id="projects" 
            className="relative min-h-screen py-20 px-6 lg:px-16 bg-gradient-to-b from-dark-800 to-dark-900 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent-cyan/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl"></div>

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
                        My Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-4"
                    >
                        Featured <span className="bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">Projects</span>
                    </motion.h2>
                </motion.div>

                {/* Filter Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-wrap gap-3 justify-center mb-12"
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                selectedCategory === category
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                    : 'bg-dark-700/50 border border-primary-500/30 text-primary-300 hover:bg-primary-500/10 hover:border-primary-400/50'
                            }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>

                {/* View More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-center mt-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-cyan text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                    >
                        View All Projects
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;

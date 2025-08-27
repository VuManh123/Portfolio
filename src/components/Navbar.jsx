import React from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-md flex justify-between items-center px-10 py-4 border-b border-white/10"
    >
      {/* Logo */}
      <motion.h1
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-extrabold text-white tracking-wide cursor-pointer"
      >
        My<span className="text-blue-500">Portfolio</span>
      </motion.h1>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-8 text-lg font-medium">
        {navLinks.map((link, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1 }}
            className="relative group"
          >
            <a
              href={link.href}
              className="text-white hover:text-blue-400 transition-colors duration-300"
            >
              {link.name}
            </a>
            {/* Underline Animation */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </motion.li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden text-white text-3xl cursor-pointer">
        ☰
      </div>
    </motion.nav>
  );
};

export default Navbar;

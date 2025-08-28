import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import WebGLStatus from "./components/WebGLStatus";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const minLoadingTime = 3000; // Minimum 3 seconds for nice loading experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  return (
    <div className="font-sans bg-dark-900 text-white overflow-x-hidden">
      <Loading isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Suspense fallback={null}>
              <Navbar />
              <Hero />
              <About />
              <Projects />
              <Contact />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
      
      <WebGLStatus />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebGL } from '../hooks/useWebGL';

const WebGLStatus = () => {
  const { isSupported, isContextLost, canRender } = useWebGL();
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Check for Intel UHD Graphics 620 specifically
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (renderer.includes('Intel') && renderer.includes('UHD Graphics 620')) {
          setShowStatus(true);
          const timer = setTimeout(() => setShowStatus(false), 8000);
          return () => clearTimeout(timer);
        }
      }
    }

    // Show status if there are issues
    if (!canRender || isContextLost) {
      setShowStatus(true);
      const timer = setTimeout(() => setShowStatus(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [canRender, isContextLost]);

  if (!showStatus && canRender) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 bg-dark-800/95 backdrop-blur-sm border border-primary-500/30 rounded-lg p-4 max-w-sm"
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            canRender ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          <div>
            <p className="text-white font-medium text-sm">
              {(() => {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                  if (debugInfo) {
                    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    if (renderer.includes('Intel') && renderer.includes('UHD Graphics 620')) {
                      return "Intel UHD Graphics 620 detected";
                    }
                  }
                }
                if (!isSupported) return "WebGL not supported";
                if (isContextLost) return "WebGL context lost";
                return "WebGL running normally";
              })()}
            </p>
            <p className="text-dark-300 text-xs mt-1">
              {!canRender || (() => {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                  if (debugInfo) {
                    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    if (renderer.includes('Intel') && renderer.includes('UHD Graphics 620')) {
                      return true;
                    }
                  }
                }
                return false;
              })() ? "Using optimized 2D animations for better compatibility" : "3D graphics running smoothly"}
            </p>
          </div>
          <button
            onClick={() => setShowStatus(false)}
            className="text-dark-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WebGLStatus;
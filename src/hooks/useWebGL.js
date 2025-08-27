import { useState, useEffect } from 'react';

export const useWebGL = () => {
  const [isSupported, setIsSupported] = useState(true);
  const [isContextLost, setIsContextLost] = useState(false);

  useEffect(() => {
    // Check WebGL support
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setIsSupported(false);
          return false;
        }

        // Check for common WebGL extensions
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          console.log('WebGL Renderer:', renderer);
          
          // Detect software rendering (usually indicates performance issues)
          if (renderer.includes('SwiftShader') || renderer.includes('Microsoft Basic Render Driver')) {
            console.warn('Software rendering detected - 3D performance may be limited');
          }
        }

        return true;
      } catch (e) {
        console.error('WebGL support check failed:', e);
        setIsSupported(false);
        return false;
      }
    };

    // Initial check
    const supported = checkWebGLSupport();
    
    if (supported) {
      // Listen for context loss events globally
      const handleContextLost = () => {
        console.warn('WebGL context lost globally');
        setIsContextLost(true);
      };

      const handleContextRestored = () => {
        console.log('WebGL context restored globally');
        setIsContextLost(false);
      };

      window.addEventListener('webglcontextlost', handleContextLost);
      window.addEventListener('webglcontextrestored', handleContextRestored);

      return () => {
        window.removeEventListener('webglcontextlost', handleContextLost);
        window.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }
  }, []);

  return {
    isSupported,
    isContextLost,
    canRender: isSupported && !isContextLost
  };
};
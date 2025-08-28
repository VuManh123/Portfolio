import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import ErrorBoundary from './ErrorBoundary';
import AnimatedBackground from './AnimatedBackground';

const SafeCanvas = ({ children, fallback, ...props }) => {
  const [contextLost, setContextLost] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const canvasRef = useRef();
  
  const defaultFallback = <AnimatedBackground />;
  const maxRetries = 2;

  useEffect(() => {
    // Force fallback for Intel UHD Graphics 620 which has known issues
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        console.log('Detected GPU:', renderer);
        
        // Force fallback for problematic Intel graphics
        if (renderer.includes('Intel') && renderer.includes('UHD Graphics 620')) {
          console.warn('Intel UHD Graphics 620 detected - using fallback rendering');
          setContextLost(true);
          return;
        }
      }
    }
  }, []);

  // If context lost or exceeded retry limit, show fallback
  if (contextLost || retryCount >= maxRetries) {
    return fallback || defaultFallback;
  }

  const handleContextLoss = () => {
    console.warn(`WebGL context lost (attempt ${retryCount + 1})`);
    setContextLost(true);
    
    // Auto retry after a delay
    setTimeout(() => {
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        setContextLost(false);
        console.log(`Retrying WebGL... (${retryCount + 1}/${maxRetries})`);
      }
    }, 2000);
  };

  return (
    <ErrorBoundary fallback={fallback || defaultFallback}>
      <Suspense fallback={fallback || defaultFallback}>
        <Canvas
          ref={canvasRef}
          {...props}
          gl={{
            antialias: false, // Disable for better compatibility
            alpha: true,
            powerPreference: "default", // Use default instead of high-performance
            failIfMajorPerformanceCaveat: true, // Fail if software rendering
            preserveDrawingBuffer: false,
            stencil: false,
            depth: true,
            ...props.gl
          }}
          onCreated={({ gl, scene, camera }) => {
            try {
              gl.setClearColor('#0f172a', 0);
              
              // Reduce memory usage
              gl.getExtension('OES_vertex_array_object');
              
              // Handle context loss
              gl.domElement.addEventListener('webglcontextlost', (event) => {
                event.preventDefault();
                handleContextLoss();
              });
              
              gl.domElement.addEventListener('webglcontextrestored', () => {
                console.log('WebGL context restored');
                setContextLost(false);
                setRetryCount(0);
              });

              // Set conservative limits for Intel graphics
              const maxTextureSize = Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE), 1024);
              console.log('Max texture size:', maxTextureSize);

              // Call custom onCreated if provided
              if (props.onCreated) {
                props.onCreated({ gl, scene, camera });
              }
            } catch (error) {
              console.error('WebGL setup failed:', error);
              handleContextLoss();
            }
          }}
          dpr={[0.5, 1]} // Lower DPR for Intel graphics
          performance={{ min: 0.1 }} // Lower performance threshold
          frameloop="demand" // Only render when needed
        >
          {children}
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  );
};

export default SafeCanvas;
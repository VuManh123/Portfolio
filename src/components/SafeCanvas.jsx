import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ErrorBoundary from './ErrorBoundary';
import AnimatedBackground from './AnimatedBackground';
import { useWebGL } from '../hooks/useWebGL';

const SafeCanvas = ({ children, fallback, ...props }) => {
  const { canRender } = useWebGL();
  const defaultFallback = <AnimatedBackground />;

  if (!canRender) {
    return fallback || defaultFallback;
  }

  return (
    <ErrorBoundary fallback={fallback || defaultFallback}>
      <Suspense fallback={fallback || defaultFallback}>
        <Canvas
          {...props}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
            preserveDrawingBuffer: false,
            ...props.gl
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0f172a', 0);
            
            // Handle context loss gracefully
            gl.domElement.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              console.log('WebGL context lost - attempting recovery...');
            });
            
            gl.domElement.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored successfully');
            });

            // Call custom onCreated if provided
            if (props.onCreated) {
              props.onCreated({ gl });
            }
          }}
          dpr={[1, 2]}
          performance={{ min: 0.3 }}
        >
          {children}
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  );
};

export default SafeCanvas;
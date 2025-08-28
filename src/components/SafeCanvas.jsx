import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ErrorBoundary from './ErrorBoundary';
import AnimatedBackground from './AnimatedBackground';
import { useWebGL } from '../hooks/useWebGL';
import { webglRecoveryManager } from '../utils/webglRecovery';

const SafeCanvas = ({ children, fallback, ...props }) => {
  const { canRender, isContextLost, forceRecovery, recoveryAttempts } = useWebGL();
  const defaultFallback = <AnimatedBackground />;

  if (!canRender) {
    return (
      <div className="relative">
        {fallback || defaultFallback}
        {isContextLost && recoveryAttempts > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white text-lg font-medium mb-2">
                Đang khôi phục WebGL...
              </p>
              <p className="text-white/70 text-sm">
                Lần thử {recoveryAttempts}/3
              </p>
            </div>
          </div>
        )}
      </div>
    );
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
          onCreated={({ gl, scene, camera }) => {
            gl.setClearColor('#0f172a', 0);
            
            // Handle context loss gracefully with recovery mechanism
            const handleContextLost = (event) => {
              event.preventDefault();
              console.log('WebGL context lost - attempting recovery...');
              
              // Clean up WebGL resources
              webglRecoveryManager.cleanupWebGLResources(gl);
              
              // Clear any ongoing animations or renders
              if (gl.domElement) {
                gl.domElement.style.display = 'none';
              }
              
              // Notify recovery manager
              webglRecoveryManager.contextLostCallbacks.forEach(callback => {
                try {
                  callback();
                } catch (error) {
                  console.error('Error in context lost callback:', error);
                }
              });
            };
            
            const handleContextRestored = () => {
              console.log('WebGL context restored - reinitializing...');
              
              try {
                // Check if context is actually healthy
                if (!webglRecoveryManager.isContextHealthy(gl)) {
                  console.error('Context restored but not healthy');
                  forceRecovery();
                  return;
                }
                
                // Restore renderer settings
                gl.setClearColor('#0f172a', 0);
                
                // Show canvas again
                if (gl.domElement) {
                  gl.domElement.style.display = '';
                }
                
                // Trigger recovery in the hook
                forceRecovery();
                
                // Re-render the scene
                if (scene && camera) {
                  gl.render(scene, camera);
                }
                
                // Notify recovery manager
                webglRecoveryManager.recoveryCallbacks.forEach(callback => {
                  try {
                    callback();
                  } catch (error) {
                    console.error('Error in recovery callback:', error);
                  }
                });
                
                console.log('✅ WebGL context recovery completed successfully');
              } catch (error) {
                console.error('Error during WebGL context restoration:', error);
                forceRecovery();
              }
            };
            
            gl.domElement.addEventListener('webglcontextlost', handleContextLost);
            gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);

            // Call custom onCreated if provided
            if (props.onCreated) {
              props.onCreated({ gl, scene, camera });
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
/**
 * WebGL Recovery Utilities
 * Provides tools for testing and managing WebGL context recovery
 */

export class WebGLRecoveryManager {
  constructor() {
    this.isRecovering = false;
    this.recoveryCallbacks = [];
    this.contextLostCallbacks = [];
  }

  /**
   * Simulate context loss for testing purposes
   * WARNING: Only use this for development/testing
   */
  simulateContextLoss() {
    if (typeof window !== 'undefined') {
      console.warn('🧪 Simulating WebGL context loss for testing...');
      
      // Find all canvas elements
      const canvases = document.querySelectorAll('canvas');
      
      canvases.forEach(canvas => {
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          // Try to get the WEBGL_lose_context extension
          const loseContextExt = gl.getExtension('WEBGL_lose_context');
          if (loseContextExt) {
            loseContextExt.loseContext();
            console.log('✅ Context loss simulated successfully');
            
            // Auto-restore after a delay for testing
            setTimeout(() => {
              if (loseContextExt.restoreContext) {
                loseContextExt.restoreContext();
                console.log('✅ Context restored automatically');
              }
            }, 2000);
          } else {
            console.warn('❌ WEBGL_lose_context extension not available');
          }
        }
      });
    }
  }

  /**
   * Register callback for when recovery starts
   */
  onRecoveryStart(callback) {
    this.recoveryCallbacks.push(callback);
  }

  /**
   * Register callback for when context is lost
   */
  onContextLost(callback) {
    this.contextLostCallbacks.push(callback);
  }

  /**
   * Clean up all textures and buffers to prepare for recovery
   */
  cleanupWebGLResources(gl) {
    if (!gl) return;

    try {
      // Get all active textures
      const numTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
      for (let i = 0; i < numTextureUnits; i++) {
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
      }

      // Clear all buffers
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindRenderbuffer(gl.RENDERBUFFER, null);
      gl.useProgram(null);

      console.log('🧹 WebGL resources cleaned up for recovery');
    } catch (error) {
      console.error('Error during WebGL cleanup:', error);
    }
  }

  /**
   * Check if WebGL context is healthy
   */
  isContextHealthy(gl) {
    if (!gl) return false;

    try {
      // Try a simple operation
      gl.getParameter(gl.VERSION);
      return !gl.isContextLost();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get WebGL debug information
   */
  getWebGLInfo() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        return { error: 'WebGL not supported' };
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const info = {
        version: gl.getParameter(gl.VERSION),
        vendor: gl.getParameter(gl.VENDOR),
        renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
        maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
        extensions: gl.getSupportedExtensions(),
        contextLost: gl.isContextLost()
      };

      // Clean up
      canvas.remove();
      
      return info;
    } catch (error) {
      return { error: error.message };
    }
  }
}

// Create singleton instance
export const webglRecoveryManager = new WebGLRecoveryManager();

// Development helper - add to window for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.webglRecoveryManager = webglRecoveryManager;
  window.simulateWebGLContextLoss = () => webglRecoveryManager.simulateContextLoss();
  
  console.log('🛠️  WebGL Recovery Manager available in console:');
  console.log('   - window.simulateWebGLContextLoss() - Test context loss');
  console.log('   - window.webglRecoveryManager.getWebGLInfo() - Get WebGL info');
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebGL } from '../hooks/useWebGL';
import { webglRecoveryManager } from '../utils/webglRecovery';

const WebGLStatus = () => {
  const { isSupported, isContextLost, canRender, recoveryAttempts, forceRecovery } = useWebGL();
  const [showStatus, setShowStatus] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [webglInfo, setWebglInfo] = useState(null);

  useEffect(() => {
    // Show status if there are issues
    if (!canRender || isContextLost) {
      setShowStatus(true);
      // Don't auto-hide if context is lost - user needs to see recovery status
      if (!isContextLost) {
        const timer = setTimeout(() => setShowStatus(false), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [canRender, isContextLost]);

  const handleGetDebugInfo = () => {
    const info = webglRecoveryManager.getWebGLInfo();
    setWebglInfo(info);
    setShowDebugInfo(true);
  };

  const handleSimulateContextLoss = () => {
    if (process.env.NODE_ENV === 'development') {
      webglRecoveryManager.simulateContextLoss();
    }
  };

  const handleForceRecovery = () => {
    forceRecovery();
  };

  if (!showStatus && canRender) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 bg-dark-800/95 backdrop-blur-sm border border-primary-500/30 rounded-lg p-4 max-w-sm"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              canRender ? 'bg-green-500' : isContextLost ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
            }`} />
            <div className="flex-1">
              <p className="text-white font-medium text-sm">
                {!isSupported && "WebGL không được hỗ trợ"}
                {isContextLost && `WebGL context lost (${recoveryAttempts}/3)`}
                {canRender && "WebGL hoạt động bình thường"}
              </p>
              <p className="text-dark-300 text-xs mt-1">
                {!canRender && "Đang sử dụng animation 2D dự phòng"}
                {isContextLost && "Đang thử khôi phục..."}
              </p>
            </div>
            <button
              onClick={() => setShowStatus(false)}
              className="text-dark-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Recovery button for context lost */}
          {isContextLost && (
            <div className="flex gap-2">
              <button
                onClick={handleForceRecovery}
                className="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white text-xs rounded transition-colors"
              >
                Khôi phục ngay
              </button>
            </div>
          )}

          {/* Debug controls */}
          <div className="flex gap-2 pt-2 border-t border-dark-600">
            <button
              onClick={handleGetDebugInfo}
              className="px-3 py-1 bg-dark-700 hover:bg-dark-600 text-white text-xs rounded transition-colors"
            >
              Debug Info
            </button>
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={handleSimulateContextLoss}
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded transition-colors"
              >
                Test Context Loss
              </button>
            )}
          </div>

          {/* Debug info panel */}
          {showDebugInfo && webglInfo && (
            <div className="mt-3 p-3 bg-dark-900 rounded border border-dark-600">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium text-xs">WebGL Debug Info</h4>
                <button
                  onClick={() => setShowDebugInfo(false)}
                  className="text-dark-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1 text-xs text-dark-300 max-h-32 overflow-y-auto">
                {webglInfo.error ? (
                  <div className="text-red-400">Error: {webglInfo.error}</div>
                ) : (
                  <>
                    <div><span className="text-white">Version:</span> {webglInfo.version}</div>
                    <div><span className="text-white">Renderer:</span> {webglInfo.renderer}</div>
                    <div><span className="text-white">Context Lost:</span> {webglInfo.contextLost ? 'Yes' : 'No'}</div>
                    <div><span className="text-white">Extensions:</span> {webglInfo.extensions?.length || 0}</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WebGLStatus;
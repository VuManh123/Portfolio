# WebGL Context Recovery System

## Tổng quan

Hệ thống khôi phục WebGL context được thiết kế để xử lý tình huống WebGL context bị mất và tự động khôi phục để đảm bảo trải nghiệm người dùng liền mạch.

## Nguyên nhân WebGL Context Lost

WebGL context có thể bị mất do nhiều nguyên nhân:

1. **GPU Driver Issues**: Driver đồ họa bị crash hoặc reset
2. **Memory Pressure**: Hệ thống thiếu bộ nhớ GPU
3. **Browser Tab Suspension**: Browser tạm dừng tab để tiết kiệm tài nguyên
4. **Hardware Issues**: Vấn đề phần cứng GPU
5. **Power Management**: Laptop chuyển sang chế độ tiết kiệm pin

## Cơ chế khôi phục

### 1. Detection (Phát hiện)
- `useWebGL` hook liên tục monitor trạng thái WebGL
- Event listeners cho `webglcontextlost` và `webglcontextrestored`
- Health check để đảm bảo context thực sự khôi phục

### 2. Recovery Process (Quy trình khôi phục)

```javascript
// Khi context lost xảy ra:
1. Prevent default behavior
2. Clean up WebGL resources
3. Hide canvas element
4. Trigger recovery callbacks
5. Update UI state

// Khi context restored:
1. Health check context
2. Restore renderer settings
3. Show canvas element
4. Re-render scene
5. Notify completion
```

### 3. Fallback Mechanism (Cơ chế dự phòng)
- Hiển thị `AnimatedBackground` khi WebGL không khả dụng
- Loading indicator trong quá trình khôi phục
- Thông báo trạng thái cho user

## Components

### SafeCanvas
- Wrapper cho React Three Fiber Canvas
- Xử lý context lost/restored events
- Tự động cleanup và recovery
- Fallback UI khi cần thiết

### useWebGL Hook
- Monitor WebGL support và trạng thái
- Provide recovery functions
- Track recovery attempts
- Health checking

### WebGLStatus
- UI component hiển thị trạng thái WebGL
- Debug controls (development mode)
- Manual recovery trigger
- WebGL information display

### WebGL Recovery Manager
- Utility class quản lý recovery process
- Resource cleanup functions
- Health checking
- Development testing tools

## Usage

### Basic Implementation
```jsx
import SafeCanvas from './components/SafeCanvas';

function MyComponent() {
  return (
    <SafeCanvas>
      {/* Your 3D content */}
    </SafeCanvas>
  );
}
```

### Custom Recovery Handling
```jsx
import { useWebGL } from './hooks/useWebGL';
import { webglRecoveryManager } from './utils/webglRecovery';

function MyComponent() {
  const { isContextLost, forceRecovery } = useWebGL();
  
  useEffect(() => {
    webglRecoveryManager.onContextLost(() => {
      console.log('Custom context lost handler');
    });
    
    webglRecoveryManager.onRecoveryStart(() => {
      console.log('Custom recovery handler');
    });
  }, []);
  
  // ...
}
```

## Development Tools

### Console Commands (Development Mode)
```javascript
// Simulate context loss for testing
window.simulateWebGLContextLoss();

// Get WebGL debug information
window.webglRecoveryManager.getWebGLInfo();

// Manual recovery
window.webglRecoveryManager.forceRecovery();
```

### WebGLStatus Component
- Hiển thị trạng thái real-time
- Debug info panel
- Test context loss button (dev mode)
- Manual recovery button

## Configuration

### Recovery Attempts
```javascript
// Maximum recovery attempts before giving up
const MAX_RECOVERY_ATTEMPTS = 3;
```

### Timeouts
```javascript
// Delay before attempting recovery
const RECOVERY_DELAY = 100; // ms

// Status display timeout
const STATUS_DISPLAY_TIMEOUT = 5000; // ms
```

## Troubleshooting

### Common Issues

1. **Context không khôi phục được**
   - Kiểm tra GPU driver
   - Restart browser
   - Kiểm tra hardware acceleration

2. **Recovery loop vô hạn**
   - Check recovery attempts limit
   - Verify health check logic
   - Look for memory leaks

3. **Fallback UI không hiển thị**
   - Verify AnimatedBackground component
   - Check CSS/styling
   - Ensure proper error boundaries

### Debug Steps

1. Mở DevTools Console
2. Click "Debug Info" trong WebGLStatus
3. Kiểm tra WebGL renderer information
4. Test với "Test Context Loss" button
5. Monitor recovery attempts và logs

## Best Practices

1. **Always use SafeCanvas**: Đừng sử dụng Canvas trực tiếp
2. **Handle fallbacks**: Luôn provide fallback UI
3. **Monitor status**: Sử dụng WebGLStatus component
4. **Test recovery**: Regular test với development tools
5. **Clean up resources**: Proper cleanup khi unmount

## Performance Considerations

- Recovery process có thể mất vài giây
- Fallback animations should be lightweight
- Avoid complex 3D scenes nếu recovery thất bại nhiều lần
- Monitor memory usage để tránh context loss

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Limited (context recovery khó khăn hơn)
- Mobile browsers: Varies (power management ảnh hưởng nhiều)
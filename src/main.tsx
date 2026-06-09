import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely swallow benign WebSocket errors that sometimes trigger unhandled rejections in sandboxed iframes
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const msg = event.reason?.message || String(event.reason || '');
    if (msg.includes('WebSocket') || msg.includes('websocket') || msg.includes('opened')) {
      event.preventDefault();
      console.warn('Ignored expected sandbox WebSocket error:', msg);
    }
  });

  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (msg.includes('WebSocket') || msg.includes('websocket') || msg.includes('opened')) {
      event.preventDefault();
      console.warn('Ignored expected sandbox error:', msg);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);


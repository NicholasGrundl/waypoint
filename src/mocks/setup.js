// src/mocks/setup.js
export async function setupMocks() {
  if (process.env.REACT_APP_USE_MOCK_AUTH === 'true') {
    console.log('%c🔸 Using mock authentication service', 'color: orange; font-weight: bold;');
    
    try {
      const { worker } = await import('./browser');
      await worker.start({
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      });
      console.log('%c✓ Mock service worker started', 'color: green');
    } catch (error) {
      console.error('Failed to start mock service worker:', error);
    }
  }
  return Promise.resolve();
}
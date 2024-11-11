// src/mocks/setup.js
export async function setupMocks() {
  if (process.env.REACT_APP_USE_MOCK_AUTH === 'true') {
    console.log('%c🔸 Using mock authentication service', 'color: orange; font-weight: bold;');
    
    const { worker } = await import('./browser');
    return worker.start({
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
    });
  }
  return Promise.resolve();
}
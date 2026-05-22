import '@testing-library/jest-dom';

// JSDOM does not implement matchMedia — provide a stub so gsap and motion hooks
// can safely call window.matchMedia() without throwing in the test environment.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Manual mock for lenis.
// Prevents JSDOM from loading the ESM .mjs bundle which requires `window`.

const mockInstance = {
  raf: jest.fn(),
  scrollTo: jest.fn(),
  scroll: 0,
  on: jest.fn(),
  destroy: jest.fn(),
};

const MockLenis = jest.fn(() => mockInstance);
MockLenis._instance = mockInstance;

module.exports = {
  __esModule: true,
  default: MockLenis,
};

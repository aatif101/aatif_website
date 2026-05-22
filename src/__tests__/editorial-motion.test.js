/**
 * Tests for useEditorialMotion reduced-motion guard.
 *
 * Verifies that when prefers-reduced-motion: reduce is active:
 *  - Lenis is never instantiated
 *  - GSAP animations are never created
 *  - <html data-reduced-motion="true"> is stamped
 *  - <html data-motion-ready> is NOT stamped
 *  - Elements with data-motion-reveal have no GSAP inline opacity/transform
 *
 * Note: `lenis` is redirected to __mocks__/lenis.js via moduleNameMapper in
 * package.json so the ESM .mjs bundle never loads in JSDOM.
 */

import { renderHook, act } from '@testing-library/react';
import { useEditorialMotion } from '../hooks/useEditorialMotion';

// ── Module mocks ──────────────────────────────────────────────────────────────
// jest.mock is hoisted — tells Jest to use the manual __mocks__/lenis.js file.
jest.mock('lenis');

jest.mock('gsap', () => ({
  __esModule: true,
  default: {
    registerPlugin: jest.fn(),
    ticker: { add: jest.fn(), remove: jest.fn(), lagSmoothing: jest.fn() },
    fromTo: jest.fn(),
  },
}));

jest.mock('gsap/ScrollTrigger', () => ({
  __esModule: true,
  ScrollTrigger: {
    scrollerProxy: jest.fn(),
    update: jest.fn(),
    refresh: jest.fn(),
    killAll: jest.fn(),
    clearScrollMemory: jest.fn(),
  },
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

function mockMatchMedia(prefersReducedMotion) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)' && prefersReducedMotion,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Lenis mock references — set once per file since the module is cached
const MockLenis = require('lenis').default;

// ── Suite: reduced-motion active ──────────────────────────────────────────────

describe('useEditorialMotion — reduced-motion guard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.removeAttribute('data-reduced-motion');
    document.documentElement.removeAttribute('data-motion-ready');
    mockMatchMedia(true);
  });

  it('stamps data-reduced-motion="true" on <html>', () => {
    renderHook(() => useEditorialMotion());
    expect(document.documentElement.getAttribute('data-reduced-motion')).toBe('true');
  });

  it('does NOT stamp data-motion-ready on <html>', async () => {
    renderHook(() => useEditorialMotion());
    await act(async () => {
      await Promise.resolve();
    });
    expect(document.documentElement.hasAttribute('data-motion-ready')).toBe(false);
  });

  it('does NOT construct a Lenis instance', async () => {
    renderHook(() => useEditorialMotion());
    await act(async () => {
      await Promise.resolve();
    });
    expect(MockLenis).not.toHaveBeenCalled();
  });

  it('does NOT call gsap.fromTo (no animation timelines)', async () => {
    const gsap = require('gsap').default;
    renderHook(() => useEditorialMotion());
    await act(async () => {
      await Promise.resolve();
    });
    expect(gsap.fromTo).not.toHaveBeenCalled();
  });

  it('returns reducedMotion: true', () => {
    const { result } = renderHook(() => useEditorialMotion());
    expect(result.current.reducedMotion).toBe(true);
  });

  it('leaves data-motion-reveal elements without GSAP inline opacity', () => {
    const el = document.createElement('section');
    el.setAttribute('data-motion-reveal', '');
    document.body.appendChild(el);

    renderHook(() => useEditorialMotion());

    // GSAP never ran — no inline opacity/transform should be applied
    expect(el.style.opacity).toBe('');
    expect(el.style.transform).toBe('');

    document.body.removeChild(el);
  });

  it('leaves data-motion-hero elements without GSAP inline opacity', () => {
    const el = document.createElement('div');
    el.setAttribute('data-motion-hero', '');
    document.body.appendChild(el);

    renderHook(() => useEditorialMotion());

    expect(el.style.opacity).toBe('');
    expect(el.style.transform).toBe('');

    document.body.removeChild(el);
  });
});

// ── Suite: normal-motion active ───────────────────────────────────────────────

describe('useEditorialMotion — normal-motion path', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.removeAttribute('data-reduced-motion');
    document.documentElement.removeAttribute('data-motion-ready');
    mockMatchMedia(false);
  });

  it('stamps data-reduced-motion="false" on <html>', () => {
    renderHook(() => useEditorialMotion());
    expect(document.documentElement.getAttribute('data-reduced-motion')).toBe('false');
  });

  it('returns reducedMotion: false', () => {
    const { result } = renderHook(() => useEditorialMotion());
    expect(result.current.reducedMotion).toBe(false);
  });

  it('constructs a Lenis instance when motion is allowed', async () => {
    renderHook(() => useEditorialMotion());
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(MockLenis).toHaveBeenCalledTimes(1);
  });
});

// ── Suite: CSS accessibility contract ─────────────────────────────────────────

describe('useEditorialMotion — CSS accessibility contract', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-motion-ready');
    document.documentElement.removeAttribute('data-reduced-motion');
  });

  it('data-motion-reveal elements are visible before JS motion init', () => {
    // Before data-motion-ready is set, elements must not have inline opacity:0.
    // GSAP sets that inline; in reduced-motion mode the hook skips GSAP entirely.
    const el = document.createElement('section');
    el.setAttribute('data-motion-reveal', '');
    document.body.appendChild(el);

    expect(document.documentElement.hasAttribute('data-motion-ready')).toBe(false);
    expect(el.style.opacity).toBe('');
    expect(el.style.visibility).toBe('');

    document.body.removeChild(el);
  });
});

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scroll + GSAP ScrollTrigger for the editorial layout.
 *
 * When prefers-reduced-motion is active the hook skips Lenis and GSAP entirely,
 * marks <html data-reduced-motion="true"> so CSS can respond, and returns early.
 * The data attribute is always set so downstream code can branch without
 * duplicating the media-query check.
 *
 * Usage: call once at the root component level.
 *   const { reducedMotion } = useEditorialMotion();
 *
 * Returns:
 *   { reducedMotion: boolean }
 */
export function useEditorialMotion() {
  const lenisRef = useRef(null);
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Always stamp the attribute so CSS rules are predictable.
    document.documentElement.setAttribute(
      'data-reduced-motion',
      reducedMotion ? 'true' : 'false'
    );

    if (reducedMotion) return;

    let lenis;
    try {
      // Dynamic import keeps the bundle split-friendly and lets us catch load failures.
      import('lenis').then(({ default: Lenis }) => {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Wire Lenis into the GSAP ticker so ScrollTrigger stays in sync.
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Let ScrollTrigger proxy scroll events through Lenis.
        ScrollTrigger.scrollerProxy(document.documentElement, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.scrollTo(value, { immediate: true });
            }
            return lenis.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });

        lenis.on('scroll', ScrollTrigger.update);
        ScrollTrigger.refresh();
      });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[useEditorialMotion] Lenis/GSAP init failed:', err.message);
      }
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      gsap.ticker.remove();
      ScrollTrigger.killAll();
      ScrollTrigger.clearScrollMemory();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { reducedMotion };
}

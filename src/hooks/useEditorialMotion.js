import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scroll + GSAP ScrollTrigger for the editorial layout,
 * then wires scroll-reveal choreography to real sections via data attributes.
 *
 * Data attribute contract (consumed by this hook):
 *   [data-motion-hero]    — opening name/lede block; fades + rises on page load
 *   [data-motion-reveal]  — section reveal groups; fade + translate on scroll enter
 *   [data-motion-ready]   — stamped on <html> once choreography is initialised
 *
 * When prefers-reduced-motion is active the hook skips Lenis and GSAP entirely,
 * marks <html data-reduced-motion="true"> so CSS can respond, and returns early.
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

    let tickerFn;

    try {
      // Dynamic import keeps the bundle split-friendly and lets us catch load failures.
      import('lenis').then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Wire Lenis into the GSAP ticker so ScrollTrigger stays in sync.
        tickerFn = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerFn);
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

        // ── Hero entrance (page-load, not scroll-triggered) ──────────────────
        const heroEls = document.querySelectorAll('[data-motion-hero]');
        if (heroEls.length) {
          gsap.fromTo(
            heroEls,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              stagger: 0.12,
              clearProps: 'transform',
            }
          );
        }

        // ── Section reveal on scroll enter ───────────────────────────────────
        const revealEls = document.querySelectorAll('[data-motion-reveal]');
        revealEls.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });

        ScrollTrigger.refresh();

        // Signal to CSS / devtools that motion is live.
        document.documentElement.setAttribute('data-motion-ready', 'true');
        if (process.env.NODE_ENV !== 'production') {
          console.debug(
            '[useEditorialMotion] init — heroes:', heroEls.length,
            '| reveals:', revealEls.length
          );
        }
      }).catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[useEditorialMotion] Lenis/GSAP init failed:', err.message);
        }
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
      if (tickerFn) gsap.ticker.remove(tickerFn);
      ScrollTrigger.killAll();
      ScrollTrigger.clearScrollMemory();
      document.documentElement.removeAttribute('data-motion-ready');
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { reducedMotion };
}

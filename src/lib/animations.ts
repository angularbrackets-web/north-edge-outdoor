import { gsap, ScrollTrigger } from './gsap';

/**
 * Scroll-triggered reveal with optional blur.
 * Uses set() + to() for reliability with Svelte 5 hydration.
 */
export function scrollReveal(
  elements: Element | Element[] | NodeListOf<Element> | null,
  trigger: Element | null,
  options: {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    start?: string;
    delay?: number;
    blur?: boolean;
  } = {}
) {
  if (!elements || !trigger) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const {
    y = 50,
    x = 0,
    opacity = 0,
    duration = 0.7,
    stagger = 0,
    ease = 'power3.out',
    start = 'top 80%',
    delay = 0,
    blur = true,
  } = options;

  if (prefersReduced) {
    gsap.set(elements, { y: 0, x: 0, opacity: 1, filter: 'none' });
    return;
  }

  const initialState: Record<string, any> = { y, x, opacity };
  if (blur) initialState.filter = 'blur(8px)';
  gsap.set(elements, initialState);

  const toState: Record<string, any> = {
    y: 0,
    x: 0,
    opacity: 1,
    duration,
    stagger,
    ease,
    delay,
    scrollTrigger: { trigger, start },
  };
  if (blur) toState.filter = 'blur(0px)';

  gsap.to(elements, toState);
}

/**
 * Hero entrance animation — staggered reveal for hero child elements.
 * Call once on mount with an array of elements in reveal order.
 */
export function heroEntrance(
  elements: (Element | null)[],
  options: {
    stagger?: number;
    duration?: number;
    ease?: string;
    y?: number;
  } = {}
) {
  const valid = elements.filter(Boolean) as Element[];
  if (!valid.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    gsap.set(valid, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' });
    return;
  }

  const {
    stagger = 0.12,
    duration = 0.8,
    ease = 'power4.out',
    y = 60,
  } = options;

  gsap.set(valid, { opacity: 0, y, clipPath: 'inset(100% 0% 0% 0%)' });

  gsap.to(valid, {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    duration,
    stagger,
    ease,
    delay: 0.2,
  });
}

export { gsap, ScrollTrigger };

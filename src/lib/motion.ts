import { useEffect, type RefObject } from 'react';

/**
 * Small motion toolkit for the "premium feel" layer.
 * Everything here is additive: with reduced motion (or on touch screens where
 * noted) the page renders exactly as it does without it.
 */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/** True when the wheel event should scroll an inner scrollable box instead of the page. */
const scrollsInside = (target: EventTarget | null, deltaY: number) => {
  let node = target instanceof Element ? target : null;
  while (node && node !== document.body && node !== document.documentElement) {
    const style = getComputedStyle(node);
    const scrollable = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1;
    if (scrollable) {
      const atTop = node.scrollTop <= 0;
      const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
    }
    node = node.parentElement;
  }
  return false;
};

/**
 * Weighted, gliding mouse-wheel scrolling (the "Lenis" feel) without a dependency.
 * Desktop mouse/trackpad only; keyboard, scrollbar, touch and links keep native behaviour.
 * Returns a cleanup function.
 */
export const startSmoothScroll = () => {
  if (prefersReducedMotion() || !hasFinePointer()) return () => undefined;

  let target = window.scrollY;
  let current = window.scrollY;
  let lastWritten = window.scrollY;
  let lastTime = 0;
  let frame = 0;

  const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

  const tick = (time: number) => {
    // Something else moved the page (a link, the keyboard, the scrollbar): let it win.
    if (Math.abs(window.scrollY - lastWritten) > 2) {
      frame = 0;
      return;
    }
    const dt = lastTime ? Math.min(64, time - lastTime) : 16.7;
    lastTime = time;
    const ease = 1 - Math.pow(1 - 0.1, dt / 16.7);
    current += (target - current) * ease;
    if (Math.abs(target - current) < 0.5) current = target;
    window.scrollTo({ top: current, behavior: 'instant' as ScrollBehavior });
    lastWritten = window.scrollY;
    frame = current === target ? 0 : requestAnimationFrame(tick);
  };

  const onWheel = (event: WheelEvent) => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (document.body.style.overflow === 'hidden') return;
    if (scrollsInside(event.target, event.deltaY)) return;

    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    if (!frame) {
      target = current = lastWritten = window.scrollY;
      lastTime = 0;
    }
    target = clamp(target + event.deltaY * unit, 0, maxScroll());
    if (!frame) frame = requestAnimationFrame(tick);
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  return () => {
    window.removeEventListener('wheel', onWheel);
    cancelAnimationFrame(frame);
  };
};

/**
 * Cards with the class "spotlight" get a soft light along their border that follows the cursor.
 * Returns a cleanup function.
 */
export const startSpotlight = () => {
  if (!hasFinePointer()) return () => undefined;
  const onMove = (event: PointerEvent) => {
    const card = (event.target as Element | null)?.closest?.('.spotlight') as HTMLElement | null;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--sx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--sy', `${event.clientY - rect.top}px`);
  };
  document.addEventListener('pointermove', onMove, { passive: true });
  return () => document.removeEventListener('pointermove', onMove);
};

/**
 * Writes a scroll-driven number (usually 0..1) into a CSS variable on the element,
 * once per animation frame. CSS then uses it in calc(). Skipped with reduced motion,
 * so the CSS fallback value applies.
 */
export const useScrollVar = <T extends HTMLElement>(
  ref: RefObject<T>,
  name: string,
  compute: (element: T) => number
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      element.style.setProperty(name, clamp(compute(element)).toFixed(4));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      cancelAnimationFrame(frame);
    };
    // compute is expected to be stable in behaviour; re-binding on every render is unnecessary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, name]);
};

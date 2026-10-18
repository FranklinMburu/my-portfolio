import { useEffect, useSyncExternalStore } from 'react';

/**
 * Minimal client-side router for a handful of static routes.
 * Uses the History API; Vercel rewrites every path to index.html (vercel.json).
 */

const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  window.addEventListener('popstate', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
};

const getPath = () => normalisePath(window.location.pathname);

export const normalisePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

export const usePath = () => useSyncExternalStore(subscribe, getPath);

const scrollToHash = (hash: string) => {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    return true;
  }
  return false;
};

export const navigate = (to: string, { replace = false } = {}) => {
  const url = new URL(to, window.location.origin);
  const samePage = normalisePath(url.pathname) === getPath();

  if (replace) window.history.replaceState({}, '', url);
  else window.history.pushState({}, '', url);

  if (samePage) {
    if (!scrollToHash(url.hash)) window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  listeners.forEach((listener) => listener());
};

/** On route change: jump to the #section if there is one, otherwise to the top. */
export const useScrollOnRouteChange = (path: string) => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // wait for the new page to render
      requestAnimationFrame(() => {
        if (!scrollToHash(hash)) window.scrollTo(0, 0);
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [path]);
};

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

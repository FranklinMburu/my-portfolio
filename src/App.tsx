import { useState, useEffect, useLayoutEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import WebsitesPage from './pages/WebsitesPage';
import WebsiteDetailPage from './pages/WebsiteDetailPage';
import { navigate, usePath, useScrollOnRouteChange } from './lib/router';
import { legacyHashRoutes } from './data/site';
import { startSmoothScroll, startSpotlight } from './lib/motion';

const routes: Record<string, () => JSX.Element> = {
  '/': HomePage,
  '/websites': WebsitesPage,
  '/projects': ProjectsPage,
  '/about': AboutPage,
  '/contact': ContactPage
};

function App() {
  const path = usePath();

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Links shared before the multi-page site (e.g. /#projects) go to their new page.
  useLayoutEffect(() => {
    const target = path === '/' ? legacyHashRoutes[window.location.hash] : undefined;
    if (target && target !== '/') navigate(target, { replace: true });
  }, [path]);

  useScrollOnRouteChange(path);

  // Premium feel: gliding wheel scroll and the light that follows the cursor on cards.
  useEffect(() => {
    const stopScroll = startSmoothScroll();
    const stopSpotlight = startSpotlight();
    return () => {
      stopScroll();
      stopSpotlight();
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const websiteSlug = path.match(/^\/websites\/([^/]+)$/)?.[1];
  const Page = routes[path] ?? NotFoundPage;

  return (
    <div className="bg-page text-ink transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-glass focus:text-ink"
      >
        Skip to content
      </a>
      <Header theme={theme} toggleTheme={toggleTheme} path={path} />
      <main id="main">
        {websiteSlug ? <WebsiteDetailPage slug={decodeURIComponent(websiteSlug)} /> : <Page />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

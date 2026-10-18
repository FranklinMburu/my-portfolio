import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import Link from './Link';
import { navItems, CV_PATH, CV_FILENAME } from '../data/site';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  path: string;
}

const isActive = (to: string, path: string) => (to === '/' ? path === '/' : path === to || path.startsWith(`${to}/`));

const Header = ({ theme, toggleTheme, path }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on navigation, and with Escape; lock page scroll while it is open.
  useEffect(() => setIsMobileMenuOpen(false), [path]);
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const solid = isScrolled || path !== '/' || isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg shadow-lg shadow-primary-cyan/10 ${
          solid ? 'bg-background-dark/95' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-5 py-2.5 sm:px-6 md:py-4" aria-label="Main">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              aria-label="Franklin Mburu Kamande, home"
              className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              FK
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const active = isActive(item.to, path);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={`relative text-sm font-medium transition-colors ${
                      active ? 'text-primary-cyan' : 'text-text-gray hover:text-text-white'
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-hero"></span>}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={CV_PATH}
                download={CV_FILENAME}
                className="hidden min-[340px]:inline-flex h-10 items-center gap-2 px-3.5 text-sm font-semibold rounded-lg text-ink border border-line hover:border-primary-cyan bg-background-dark/50 transition-all duration-300 md:h-auto md:px-4 md:py-2"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>CV</span>
              </a>

              <button
                onClick={toggleTheme}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-background-dark/50 hover:bg-background-dark/70 transition-colors md:h-auto md:w-auto md:p-2"
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-primary-cyan" />
                ) : (
                  <Moon className="w-5 h-5 text-text-gray" />
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-line/70 bg-background-dark/50 hover:bg-background-dark/70 transition-colors min-[340px]:hidden"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-[22px] w-[22px] text-ink" /> : <Menu className="h-[22px] w-[22px] text-ink" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Phones and small tablets: the pages stay visible in a slim second row.
            Only very narrow screens (under 340px) fall back to the menu button. */}
        <div className="hidden min-[340px]:block md:hidden border-t border-line/40">
          <div className="no-scrollbar mx-auto flex h-10 max-w-xl items-stretch justify-between overflow-x-auto px-3 min-[375px]:gap-1 min-[375px]:px-4 sm:px-6">
            {navItems.map((item) => {
              const active = isActive(item.to, path);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex shrink-0 items-center px-1 text-[13px] font-medium tracking-[-0.005em] transition-colors min-[375px]:px-1.5 min-[375px]:text-[13.5px] ${
                    active ? 'text-primary-cyan' : 'text-text-gray hover:text-text-white'
                  }`}
                >
                  {item.label}
                  {active && <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-gradient-hero min-[375px]:inset-x-1.5"></span>}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="min-[340px]:hidden fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 bg-background-dark/95 backdrop-blur-xl border-t border-line/60"
        >
          <div className="container mx-auto px-6 py-8 flex flex-col h-full">
            <div className="space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.to, path);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between px-4 py-4 rounded-xl text-2xl font-semibold transition-colors ${
                      active
                        ? 'text-primary-cyan bg-card/50 border border-primary-cyan/30'
                        : 'text-ink hover:bg-card/40 border border-transparent'
                    }`}
                  >
                    {item.label}
                    {active && <span className="w-2 h-2 rounded-full bg-gradient-hero"></span>}
                  </Link>
                );
              })}
            </div>
            <a
              href={CV_PATH}
              download={CV_FILENAME}
              className="mt-8 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-cyan to-primary-blue"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

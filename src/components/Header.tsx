import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg shadow-lg shadow-primary-cyan/10 ${
        isScrolled ? 'bg-background-dark/95' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            FK
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-primary-cyan'
                    : 'text-text-gray hover:text-text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-hero"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-background-dark/50 hover:bg-background-dark/70 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-primary-cyan" />
              ) : (
                <Moon className="w-5 h-5 text-text-gray" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-background-dark/50 hover:bg-background-dark/70 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-text-gray" />
              ) : (
                <Menu className="w-6 h-6 text-text-gray" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-3 bg-background-dark/95 backdrop-blur-lg rounded-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-primary-cyan bg-background-dark/70'
                    : 'text-text-gray hover:text-text-white hover:bg-background-dark/30'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

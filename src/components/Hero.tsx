import { useEffect, useRef } from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import Link from './Link';
import { CV_PATH, CV_FILENAME } from '../data/site';
import SkillsSection from './SkillsSection';
import CountUp from './motion/CountUp';
import { projects } from '../data/projects';
import { hasFinePointer, prefersReducedMotion, useScrollVar } from '../lib/motion';

/** Fixed positions so the stars don't jump when the hero re-renders. */
const stars = Array.from({ length: 30 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 3}s`,
  animationDuration: `${2 + Math.random() * 3}s`
}));

/** Entrance order: each element waits this long before it rises in. */
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties;

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // --hp: 0 at the top of the page, 1 once the hero has been scrolled past.
  useScrollVar(sectionRef, '--hp', (element) => window.scrollY / Math.max(1, element.offsetHeight));

  // Large screens: the hero stays pinned while the next section slides over it.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const wide = window.matchMedia('(min-width: 1024px)');
    const place = () => {
      section.style.top = wide.matches ? `${Math.min(0, window.innerHeight - section.offsetHeight)}px` : '';
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(section);
    window.addEventListener('resize', place);
    wide.addEventListener('change', place);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', place);
      wide.removeEventListener('change', place);
    };
  }, []);

  // A soft cyan light that drifts after the cursor.
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const glow = glowRef.current;
    const section = sectionRef.current;
    if (!glow || !section || event.pointerType !== 'mouse' || !hasFinePointer() || prefersReducedMotion()) return;
    const rect = section.getBoundingClientRect();
    glow.style.opacity = '1';
    glow.style.transform = `translate(${event.clientX - rect.left - 300}px, ${event.clientY - rect.top - 300}px)`;
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      id="home"
      className="relative z-0 lg:sticky min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background-dark px-4 sm:px-6 md:px-8 pt-24 pb-24 md:pt-20 md:pb-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark to-accent-purple/20"></div>

      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-[600px] w-[600px] rounded-full opacity-0 sm:block"
        style={{
          background: 'radial-gradient(circle, rgb(var(--c-accent) / 0.13), transparent 62%)',
          transition: 'transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.8s ease'
        }}
      />

      <div className="absolute inset-0 opacity-20 hidden sm:block" style={{ transform: 'translateY(calc(var(--hp, 0) * 160px))' }}>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary-cyan rounded-full filter blur-[96px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary-blue rounded-full filter blur-[96px] animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0" style={{ transform: 'translateY(calc(var(--hp, 0) * -90px))' }}>
        {stars.map((style, i) => (
          <div key={i} className="absolute w-1 h-1 bg-primary-cyan rounded-full animate-twinkle hidden sm:block" style={style}></div>
        ))}
      </div>

      <div
        className="relative z-10 container mx-auto text-center"
        style={{
          transform: 'translateY(calc(var(--hp, 0) * 70px)) scale(calc(1 - var(--hp, 0) * 0.07))',
          opacity: 'calc(1 - var(--hp, 0) * 0.85)'
        }}
      >
        <div className="intro inline-block px-3 py-2 mb-6 rounded-full bg-primary-cyan/10 border border-primary-cyan/20" style={delay(100)}>
          <span className="text-primary-cyan text-xs sm:text-sm font-medium">Available for Projects</span>
        </div>

        <div className="intro-mask">
          <div className="intro-name" style={delay(250)}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent leading-tight animate-pulse-once">
              Franklin Mburu Kamande
            </h1>
          </div>
        </div>

        <h2 className="intro text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-text-gray" style={delay(650)}>
          Applied AI Engineer & Full-Stack Developer
        </h2>

        <p className="intro text-sm sm:text-base md:text-lg text-text-gray mb-8 max-w-xl mx-auto leading-relaxed" style={delay(800)}>
          Building intelligent systems that think, learn, and deliver real-world impact
        </p>

        <div className="intro flex flex-col sm:flex-row items-center justify-center gap-4" style={delay(950)}>
          <Link
            to="/projects"
            className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-cyan/50 transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={CV_PATH}
            download={CV_FILENAME}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-background-dark/50 backdrop-blur-sm rounded-lg font-semibold text-text-white border border-background-dark hover:border-primary-cyan hover:bg-background-dark/70 transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Download CV</span>
          </a>

          <Link
            to="/contact"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-background-dark/50 backdrop-blur-sm rounded-lg font-semibold text-text-white border border-background-dark hover:border-accent-purple hover:bg-background-dark/70 transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Contact Me</span>
          </Link>
        </div>

        <div className="intro mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-md sm:max-w-lg md:max-w-2xl mx-auto" style={delay(1100)}>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-cyan mb-1">
              <CountUp value={String(projects.length)} delay={1100} />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-text-gray">Portfolio Projects</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-blue mb-1">
              <CountUp value="100+" delay={1100} />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-text-gray">GitHub Repos</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-purple mb-1">
              <CountUp value="1 Year" delay={1100} />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-text-gray">ICT Leadership</div>
          </div>
        </div>

        <SkillsSection />
      </div>

      <a
        href="#featured"
        aria-label="Scroll to featured work"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ opacity: 'calc(1 - var(--hp, 0) * 4)' }}
      >
        <div className="w-5 h-8 border-2 border-text-gray rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-primary-cyan rounded-full animate-scroll"></div>
        </div>
      </a>
    </section>
  );
};

export default Hero;

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

/** How far (in screen heights) the visitor scrolls while the hero story plays. */
const STORY_SCREENS = 1.6;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
/** 0..1 progress of `story` through the window [from, to]. */
const segment = (story: number, from: number, to: number) => clamp((story - from) / (to - from));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Story mode (large screens, motion allowed): the first screen shows only the pill and a huge name.
 * Scrolling shrinks the name into place and brings in the rest of the hero, one group at a time,
 * while the hero stays pinned. Then the next section slides over it.
 */
const storyAllowed = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(min-width: 1024px) and (min-height: 600px)').matches &&
  !prefersReducedMotion();

/** Distance from the top of `ancestor` to the top of `node`, ignoring transforms. */
const offsetWithin = (node: HTMLElement, ancestor: HTMLElement) => {
  let y = 0;
  let current: HTMLElement | null = node;
  while (current && current !== ancestor) {
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return y;
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);

  const [story, setStory] = useState(storyAllowed);
  const [countStats, setCountStats] = useState(() => !storyAllowed());
  const storyLength = useRef(0);
  const nameMetrics = useRef({ big: 1, shift: 0, height: 0 });

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (min-height: 600px)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStory(storyAllowed());
    query.addEventListener('change', sync);
    motion.addEventListener('change', sync);
    return () => {
      query.removeEventListener('change', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  // --hp: 0 until the story has played, then 0..1 as the next section slides over the hero.
  useScrollVar(sectionRef, '--hp', (element) => (window.scrollY - storyLength.current) / Math.max(1, element.offsetHeight));

  // Large screens: the hero stays pinned (while the story plays, and while the next section slides over it).
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

  // The story itself: scroll position -> name size and which groups are showing.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const name = nameRef.current;
    const pill = pillRef.current;
    if (!section || !name || !pill) return;

    const cards = Array.from(skillsRef.current?.querySelectorAll<HTMLElement>('.intro') ?? []);
    const groups: Array<[HTMLElement | null, number, number]> = [
      [titleRef.current, 0.26, 0.44],
      [lineRef.current, 0.32, 0.5],
      [buttonsRef.current, 0.44, 0.62],
      [statsRef.current, 0.54, 0.72],
      ...cards.map((card, i) => [card, 0.64 + i * 0.06, 0.8 + i * 0.06] as [HTMLElement, number, number])
    ];

    const clearAll = () => {
      storyLength.current = 0;
      [name, pill, ...groups.map(([el]) => el)].forEach((el) => {
        if (!el) return;
        el.style.transform = '';
        el.style.opacity = '';
        el.style.filter = '';
        el.style.pointerEvents = '';
      });
      if (cueRef.current) cueRef.current.style.removeProperty('--cue');
    };

    if (!story) {
      clearAll();
      setCountStats(true);
      return;
    }

    const measure = () => {
      storyLength.current = window.innerHeight * STORY_SCREENS;
      const heading = name.querySelector('h1');
      if (!heading) return;
      const range = document.createRange();
      range.selectNodeContents(heading);
      // The text's real width at its normal size (undo whatever scale is applied right now).
      const applied = Number(name.dataset.scale || '1') || 1;
      const textWidth = range.getBoundingClientRect().width / applied;
      const height = name.offsetHeight;
      // Where the name's middle sits on the first screen, before any scrolling.
      const naturalCenter = offsetWithin(name, section) + height / 2;
      nameMetrics.current = {
        big: Math.max(1, Math.min(3.4, (window.innerWidth * 0.88) / Math.max(1, textWidth))),
        shift: window.innerHeight * 0.5 - naturalCenter,
        height
      };
    };

    let frame = 0;
    let counted = false;
    const update = () => {
      frame = 0;
      const progress = storyLength.current ? clamp(window.scrollY / storyLength.current) : 1;

      // Name: huge and centred at the top, shrinking into its normal place.
      const n = easeInOut(segment(progress, 0, 0.36));
      const { big, shift, height } = nameMetrics.current;
      const scale = 1 + (big - 1) * (1 - n);
      const y = shift * (1 - n);
      name.style.transform = `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(4)})`;
      pill.style.transform = `translateY(${(y - ((scale - 1) * height) / 2).toFixed(1)}px)`;
      // Remember the scale currently applied, so re-measuring can undo it.
      name.dataset.scale = scale.toFixed(4);

      // Everything else arrives in order.
      for (const [el, from, to] of groups) {
        if (!el) continue;
        const t = easeOut(segment(progress, from, to));
        if (t >= 1) {
          el.style.transform = '';
          el.style.opacity = '';
          el.style.filter = '';
          el.style.pointerEvents = '';
        } else {
          el.style.opacity = t.toFixed(3);
          el.style.transform = `translateY(${((1 - t) * 44).toFixed(1)}px)`;
          el.style.filter = t > 0.98 ? '' : `blur(${((1 - t) * 6).toFixed(1)}px)`;
          el.style.pointerEvents = t < 0.6 ? 'none' : '';
        }
      }

      if (!counted && progress > 0.58) {
        counted = true;
        setCountStats(true);
      }
      cueRef.current?.style.setProperty('--cue', (1 - segment(progress, 0, 0.08)).toFixed(3));
    };

    const remeasure = () => {
      measure();
      update();
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    name.style.transform = '';
    name.dataset.scale = '1';
    measure();
    update();
    if (window.scrollY > storyLength.current * 0.58) setCountStats(true);

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', remeasure);
    document.fonts?.ready.then(remeasure).catch(() => undefined);
    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', remeasure);
      cancelAnimationFrame(frame);
      clearAll();
    };
  }, [story]);

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
    <>
      <section
        ref={sectionRef}
        onPointerMove={onPointerMove}
        id="home"
        className={`relative z-0 lg:sticky min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background-dark px-4 sm:px-6 md:px-8 pt-24 pb-24 md:pt-20 md:pb-16 ${story ? 'hero-story' : ''}`}
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
          <div ref={pillRef} className="relative z-10">
            <div className="intro inline-block px-3 py-2 mb-6 rounded-full bg-primary-cyan/10 border border-primary-cyan/20" style={delay(100)}>
              <span className="text-primary-cyan text-xs sm:text-sm font-medium">Available for Projects</span>
            </div>
          </div>

          <div ref={nameRef} className="hero-name">
            <div className="intro-mask">
              <div className="intro-name" style={delay(250)}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent leading-tight animate-pulse-once">
                  Franklin Mburu Kamande
                </h1>
              </div>
            </div>
          </div>

          <h2 ref={titleRef} className="stage intro text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-text-gray" style={delay(650)}>
            Applied AI Engineer & Full-Stack Developer
          </h2>

          <p ref={lineRef} className="stage intro text-sm sm:text-base md:text-lg text-text-gray mb-8 max-w-xl mx-auto leading-relaxed" style={delay(800)}>
            Building intelligent systems that think, learn, and deliver real-world impact
          </p>

          <div ref={buttonsRef} className="stage intro flex flex-col sm:flex-row items-center justify-center gap-4" style={delay(950)}>
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

          <div ref={statsRef} className="stage intro mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-md sm:max-w-lg md:max-w-2xl mx-auto" style={delay(1100)}>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-cyan mb-1">
                <CountUp value={String(projects.length)} delay={story ? 0 : 1100} run={countStats} />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-text-gray">Portfolio Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-blue mb-1">
                <CountUp value="100+" delay={story ? 0 : 1100} run={countStats} />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-text-gray">GitHub Repos</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-purple mb-1">
                <CountUp value="1 Year" delay={story ? 0 : 1100} run={countStats} />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-text-gray">ICT Leadership</div>
            </div>
          </div>

          <div ref={skillsRef} className="stage">
            <SkillsSection />
          </div>
        </div>

        <a
          ref={cueRef}
          href="#featured"
          aria-label="Scroll to featured work"
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce"
          style={{ opacity: 'calc(min(var(--cue, 1), 1 - var(--hp, 0) * 4))' }}
        >
          <div className="w-5 h-8 border-2 border-text-gray rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-primary-cyan rounded-full animate-scroll"></div>
          </div>
        </a>
      </section>

      {/* Scroll room for the story; the pinned hero stays on screen while this passes. */}
      {story && <div aria-hidden="true" style={{ height: `${STORY_SCREENS * 100}vh` }} />}
    </>
  );
};

export default Hero;

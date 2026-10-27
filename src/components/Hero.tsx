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

/**
 * The hero "story":
 *  - full (large screens): the whole hero is pinned; the name starts huge and shrinks into place,
 *    then every group arrives in turn, then the next section slides over.
 *  - compact (phones and tablets): the top of the hero (pill, name, title, line, buttons) is pinned;
 *    the name starts as three huge stacked words and settles into place, then the rest arrives;
 *    stats and skill cards rise in as they scroll into view.
 *  - off (reduced motion): the hero exactly as designed, no story.
 */
type Mode = 'full' | 'compact' | 'off';

const FULL_SCREENS = 1.6;
const COMPACT_SCREENS = 1.1;

const getMode = (): Mode => {
  if (typeof window === 'undefined' || prefersReducedMotion()) return 'off';
  return window.matchMedia('(min-width: 1024px) and (min-height: 600px)').matches ? 'full' : 'compact';
};

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
/** 0..1 progress of `story` through the window [from, to]. */
const segment = (story: number, from: number, to: number) => clamp((story - from) / (to - from));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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

/** Width of an element's text (not its box), divided by any scale currently applied. */
const textWidth = (element: Element, appliedScale = 1) => {
  const range = document.createRange();
  range.selectNodeContents(element);
  return range.getBoundingClientRect().width / (appliedScale || 1);
};

const setStyles = (el: HTMLElement | null, styles: Partial<Record<'transform' | 'opacity' | 'filter' | 'pointerEvents', string>>) => {
  if (!el) return;
  Object.assign(el.style, styles);
};

const resetStyles = (el: HTMLElement | null) =>
  setStyles(el, { transform: '', opacity: '', filter: '', pointerEvents: '' });

/** Fade/rise/un-blur an element by t (0 hidden .. 1 in place). At 1 every inline style is removed. */
const arrive = (el: HTMLElement | null, t: number) => {
  if (!el) return;
  if (t >= 1) return resetStyles(el);
  setStyles(el, {
    opacity: t.toFixed(3),
    transform: `translateY(${((1 - t) * 44).toFixed(1)}px)`,
    filter: `blur(${((1 - t) * 6).toFixed(1)}px)`,
    pointerEvents: t < 0.6 ? 'none' : ''
  });
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);

  const [mode, setMode] = useState<Mode>(getMode);
  const [countStats, setCountStats] = useState(() => getMode() === 'off');
  const storyLength = useRef(0);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const queries = [
      window.matchMedia('(min-width: 1024px) and (min-height: 600px)'),
      window.matchMedia('(prefers-reduced-motion: reduce)')
    ];
    const sync = () => setMode(getMode());
    queries.forEach((q) => q.addEventListener('change', sync));
    return () => queries.forEach((q) => q.removeEventListener('change', sync));
  }, []);

  // --hp (large screens): 0 until the story has played, then 0..1 as the next section slides over the hero.
  useScrollVar(sectionRef, '--hp', (element) =>
    modeRef.current === 'full' ? (window.scrollY - storyLength.current) / Math.max(1, element.offsetHeight) : 0
  );

  // Large screens: the whole hero stays pinned (during the story, and while the next section slides over it).
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

  // The story: scroll position -> name size and which groups are showing.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const top = topRef.current;
    const name = nameRef.current;
    const pill = pillRef.current;
    const heading = name?.querySelector('h1');
    if (!section || !top || !name || !pill || !heading) return;

    const cards = Array.from(skillsRef.current?.querySelectorAll<HTMLElement>('.intro') ?? []);
    const title = titleRef.current;
    const line = lineRef.current;
    const buttons = buttonsRef.current;
    const stats = statsRef.current;
    const big = bigRef.current;
    const everything = [top, name, pill, big, title, line, buttons, stats, ...cards];

    const cleanup = () => {
      storyLength.current = 0;
      everything.forEach(resetStyles);
      top.style.position = '';
      top.style.top = '';
      cueRef.current?.style.removeProperty('--cue');
      if (cueRef.current) cueRef.current.style.pointerEvents = '';
    };

    if (mode === 'off') {
      cleanup();
      setCountStats(true);
      return;
    }

    let frame = 0;
    let counted = false;
    const count = () => {
      if (!counted) {
        counted = true;
        setCountStats(true);
      }
    };

    // ---------- Large screens ----------
    if (mode === 'full') {
      const groups: Array<[HTMLElement | null, number, number]> = [
        [title, 0.26, 0.44],
        [line, 0.32, 0.5],
        [buttons, 0.44, 0.62],
        [stats, 0.54, 0.72],
        ...cards.map((card, i) => [card, 0.64 + i * 0.06, 0.8 + i * 0.06] as [HTMLElement, number, number])
      ];
      let metrics = { big: 1, shift: 0, height: 0 };
      let applied = 1;

      const measure = () => {
        storyLength.current = window.innerHeight * FULL_SCREENS;
        const height = name.offsetHeight;
        metrics = {
          big: Math.max(1, Math.min(3.4, (window.innerWidth * 0.88) / Math.max(1, textWidth(heading, applied)))),
          // Where the name's middle sits on the first screen, before any scrolling.
          shift: window.innerHeight * 0.5 - (offsetWithin(name, section) + height / 2),
          height
        };
      };

      const update = () => {
        frame = 0;
        const progress = clamp(window.scrollY / storyLength.current);
        const n = easeInOut(segment(progress, 0, 0.36));
        applied = 1 + (metrics.big - 1) * (1 - n);
        const y = metrics.shift * (1 - n);
        name.style.transform = `translateY(${y.toFixed(1)}px) scale(${applied.toFixed(4)})`;
        pill.style.transform = `translateY(${(y - ((applied - 1) * metrics.height) / 2).toFixed(1)}px)`;
        for (const [el, from, to] of groups) arrive(el, easeOut(segment(progress, from, to)));
        if (progress > 0.58) count();
        cueRef.current?.style.setProperty('--cue', (1 - segment(progress, 0, 0.08)).toFixed(3));
      };

      const request = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      const remeasure = () => {
        measure();
        update();
      };

      measure();
      update();
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', remeasure);
      document.fonts?.ready.then(remeasure).catch(() => undefined);
      return () => {
        window.removeEventListener('scroll', request);
        window.removeEventListener('resize', remeasure);
        cancelAnimationFrame(frame);
        cleanup();
      };
    }

    // ---------- Phones and tablets ----------
    const nameInner = name.querySelector<HTMLElement>('.intro-name');
    const groups: Array<[HTMLElement | null, number, number]> = [
      [title, 0.46, 0.66],
      [line, 0.54, 0.74],
      [buttons, 0.64, 0.88]
    ];
    let m = { pinTop: 0, bigTop: 0, bigDy: 0, bigEnd: 1, pillDy: 0 };
    let lastWidth = 0;

    const measure = () => {
      const vh = window.innerHeight;
      storyLength.current = vh * COMPACT_SCREENS;
      // Pin the top of the hero roughly in the middle of the screen, below the fixed header.
      top.style.position = 'sticky';
      const pinTop = Math.max(84, Math.round((vh - top.offsetHeight) / 2));
      top.style.top = `${pinTop}px`;
      if (!big) return;
      const bigHeight = big.offsetHeight;
      // The big stacked name is centred on the screen at first...
      const bigTop = vh / 2 - pinTop - bigHeight / 2;
      // ...and travels to the real name's place, shrinking to its width.
      const nameCenter = offsetWithin(name, top) + name.offsetHeight / 2;
      const bigInner = big.firstElementChild ?? big;
      m = {
        pinTop,
        bigTop,
        bigDy: nameCenter - (bigTop + bigHeight / 2),
        bigEnd: Math.min(1, textWidth(heading) / Math.max(1, textWidth(bigInner))),
        // The pill sits just above the big name at first.
        pillDy: bigTop - 18 - (offsetWithin(pill, top) + pill.offsetHeight)
      };
      big.style.top = `${bigTop.toFixed(1)}px`;
      lastWidth = window.innerWidth;
    };

    const update = () => {
      frame = 0;
      const progress = clamp(window.scrollY / storyLength.current);
      const n = easeInOut(segment(progress, 0, 0.42));
      if (big) {
        big.style.transform = `translateY(${(m.bigDy * n).toFixed(1)}px) scale(${(1 + (m.bigEnd - 1) * n).toFixed(4)})`;
        big.style.opacity = (1 - segment(n, 0.35, 0.75)).toFixed(3);
        big.style.filter = `blur(${(segment(n, 0.35, 0.75) * 8).toFixed(1)}px)`;
      }
      // The real name rises up out of its edge as the big words leave.
      const r = easeOut(segment(progress, 0.19, 0.36));
      name.style.opacity = r > 0 ? '1' : '0';
      if (nameInner) nameInner.style.transform = r >= 1 ? '' : `translateY(${((1 - r) * 110).toFixed(1)}%)`;
      pill.style.transform = `translateY(${(m.pillDy * (1 - n)).toFixed(1)}px)`;
      for (const [el, from, to] of groups) arrive(el, easeOut(segment(progress, from, to)));
      const cue = 1 - segment(progress, 0, 0.08);
      cueRef.current?.style.setProperty('--cue', cue.toFixed(3));
      if (cueRef.current) cueRef.current.style.pointerEvents = cue < 0.05 ? 'none' : '';
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Phones resize when the address bar hides; only re-measure for real width changes.
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastWidth) < 2) return;
      measure();
      update();
    };

    // Stats and skill cards rise in when they scroll into view.
    const below = [stats, ...cards].filter(Boolean) as HTMLElement[];
    below.forEach((el) => arrive(el, 0));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          const wait = el === stats ? 0 : 90 * (cards.indexOf(el) % 2);
          el.style.transition = 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.9s ease';
          el.style.transitionDelay = `${wait}ms`;
          resetStyles(el);
          window.setTimeout(() => {
            el.style.transition = '';
            el.style.transitionDelay = '';
          }, 950 + wait);
          if (el === stats) count();
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.2 }
    );
    below.forEach((el) => observer.observe(el));

    measure();
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', onResize);
    document.fonts?.ready
      .then(() => {
        measure();
        update();
      })
      .catch(() => undefined);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
      if (nameInner) nameInner.style.transform = '';
      below.forEach((el) => {
        el.style.transition = '';
        el.style.transitionDelay = '';
      });
      cleanup();
    };
  }, [mode]);

  // Quiet depth: the stars and the background glows shift a few pixels with the mouse,
  // in opposite directions, easing toward the cursor (--mx/--my run from -1 to 1).
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0, frame: 0 });
  const drift = () => {
    const p = pointer.current;
    const section = sectionRef.current;
    p.x += (p.tx - p.x) * 0.06;
    p.y += (p.ty - p.y) * 0.06;
    const settled = Math.abs(p.tx - p.x) < 0.002 && Math.abs(p.ty - p.y) < 0.002;
    if (settled) {
      p.x = p.tx;
      p.y = p.ty;
    }
    section?.style.setProperty('--mx', p.x.toFixed(4));
    section?.style.setProperty('--my', p.y.toFixed(4));
    p.frame = settled ? 0 : requestAnimationFrame(drift);
  };
  const aim = (x: number, y: number) => {
    const p = pointer.current;
    p.tx = x;
    p.ty = y;
    if (!p.frame) p.frame = requestAnimationFrame(drift);
  };
  useEffect(() => () => cancelAnimationFrame(pointer.current.frame), []);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section || event.pointerType !== 'mouse' || !hasFinePointer() || prefersReducedMotion()) return;
    const rect = section.getBoundingClientRect();
    aim(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onPointerLeave = () => aim(0, 0);

  const countDelay = mode === 'off' ? 1100 : 0;

  return (
    <>
      <section
        ref={sectionRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        id="home"
        className={`hero-clip relative z-0 lg:sticky min-h-screen flex flex-col items-center justify-center bg-background-dark px-4 sm:px-6 md:px-8 pt-[calc(var(--header-h)+1.5rem)] pb-24 md:pt-20 md:pb-16 ${mode === 'off' ? '' : 'hero-story'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark to-accent-purple/20"></div>

        <div
          className="absolute inset-0 opacity-20 hidden sm:block"
          style={{ transform: 'translate(calc(var(--mx, 0) * -18px), calc(var(--my, 0) * -14px + var(--hp, 0) * 160px))' }}
        >
          <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary-cyan rounded-full filter blur-[96px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary-blue rounded-full filter blur-[96px] animate-pulse delay-1000"></div>
        </div>

        {/* Phones: one soft glow, so the story has some light behind it. */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[18%] h-80 w-80 -translate-x-1/2 rounded-full bg-primary-cyan/15 blur-[90px] sm:hidden" />

        <div
          className="absolute inset-0"
          style={{ transform: 'translate(calc(var(--mx, 0) * 10px), calc(var(--my, 0) * 8px + var(--hp, 0) * -90px))' }}
        >
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
          {/* The pin is released once the story's scroll room (below) has passed. */}
          <div>
          <div ref={topRef} className="relative">
            <div ref={pillRef} className="relative z-10">
              <div className="intro inline-block px-3 py-2 mb-6 rounded-full bg-primary-cyan/10 border border-primary-cyan/20" style={delay(100)}>
                <span className="text-primary-cyan text-xs sm:text-sm font-medium">Available for Projects</span>
              </div>
            </div>

            {mode === 'compact' && (
              <div ref={bigRef} aria-hidden="true" className="hero-big pointer-events-none absolute inset-x-0">
                <div className="intro inline-block bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent" style={delay(250)}>
                  Franklin
                  <br />
                  Mburu
                  <br />
                  Kamande
                </div>
              </div>
            )}

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
          </div>

          {/* Phones: room to scroll while the top of the hero plays its story. */}
          {mode === 'compact' && <div aria-hidden="true" style={{ height: `${COMPACT_SCREENS * 100}vh` }} />}
          </div>

          <div ref={statsRef} className="stage intro mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-md sm:max-w-lg md:max-w-2xl mx-auto" style={delay(1100)}>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-cyan mb-1">
                <CountUp value={String(projects.length)} delay={countDelay} run={countStats} />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-text-gray">Portfolio Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-blue mb-1">
                <CountUp value="100+" delay={countDelay} run={countStats} />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-text-gray">GitHub Repos</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-purple mb-1">
                <CountUp value="4 Years" delay={countDelay} run={countStats} />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-text-gray">ICT Leadership &amp; Production Experience</div>
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
          className={`${mode === 'compact' ? 'fixed bottom-5 z-20' : 'absolute bottom-6'} left-1/2 transform -translate-x-1/2 animate-bounce`}
          style={{ opacity: 'calc(min(var(--cue, 1), 1 - var(--hp, 0) * 4))' }}
        >
          <div className="w-5 h-8 border-2 border-text-gray rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-primary-cyan rounded-full animate-scroll"></div>
          </div>
        </a>
      </section>

      {/* Large screens: scroll room for the story; the pinned hero stays on screen while this passes. */}
      {mode === 'full' && <div aria-hidden="true" style={{ height: `${FULL_SCREENS * 100}vh` }} />}
    </>
  );
};

export default Hero;

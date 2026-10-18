import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from '../Link';
import { BrowserFrame, PhoneFrame } from './Frames';
import type { Website } from '../../data/websites';

/**
 * Websites page opening, told on scroll (Apple product-page style).
 *
 * The title fills the screen, then lifts away while a browser rises and pins
 * in the centre. Scrolling then walks through every site: each screenshot
 * slides up over the last, the name and line beside it change in step, the
 * phone view follows a beat later and a soft glow takes the brand's colour.
 *
 * Progress is written straight to the DOM on each animation frame (no React
 * re-render per frame); React only re-renders when the active site changes.
 */

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

const pad = (n: number) => String(n).padStart(2, '0');

const WebsitesStory = ({ sites }: { sites: Website[] }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const screens = useRef<(HTMLDivElement | null)[]>([]);
  const phones = useRef<(HTMLDivElement | null)[]>([]);
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const glows = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const n = sites.length;

  // Where each part of the scroll starts, in pixels; shared with the rail buttons.
  const geometry = () => {
    const section = sectionRef.current!;
    const vh = window.innerHeight;
    const intro = vh * 0.9;
    const tail = vh * 0.5;
    const range = section.offsetHeight - vh;
    const per = Math.max(1, (range - intro - tail) / Math.max(1, n - 1));
    return { vh, intro, per };
  };

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    let frame = 0;

    // Decode every screenshot up front so no screen flashes empty when it slides in.
    section.querySelectorAll('img').forEach((img) => {
      img.decode?.().catch(() => undefined);
    });

    const update = () => {
      frame = 0;
      const { intro, per } = geometry();
      const scrolled = -section.getBoundingClientRect().top;

      const introP = clamp(scrolled / intro);
      stage.style.setProperty('--intro', introP.toFixed(4));

      // Hold on each site for the first part of its stretch, then move on.
      const f = clamp((scrolled - intro) / per, 0, n - 1);
      const base = Math.floor(f);
      const frac = f - base;
      const s = base + smooth(clamp((frac - 0.45) / 0.55));
      stage.style.setProperty('--p', clamp(scrolled / (section.offsetHeight - window.innerHeight)).toFixed(4));

      const place = (els: (HTMLDivElement | null)[], pos: number) =>
        els.forEach((el, i) => {
          if (!el) return;
          const d = i - pos;
          if (d >= 1 || d <= -1) {
            el.style.visibility = 'hidden';
            return;
          }
          el.style.visibility = 'visible';
          // Incoming slides in from below; outgoing drifts up a little and dims.
          el.style.transform = d > 0 ? `translate3d(0, ${(d * 100).toFixed(2)}%, 0)` : `translate3d(0, ${(d * 28).toFixed(2)}%, 0) scale(${(1 + d * 0.06).toFixed(4)})`;
          el.style.setProperty('--dim', d < 0 ? (-d * 0.75).toFixed(3) : '0');
        });

      place(screens.current, s);
      // The phone follows a beat later, but rests exactly in place between changes.
      place(phones.current, base + smooth(clamp((frac - 0.6) / 0.4)));

      texts.current.forEach((el, i) => {
        if (!el) return;
        const d = i - s;
        const a = clamp(1 - Math.abs(d) * 2.2);
        el.style.opacity = a.toFixed(3);
        el.style.transform = `translate3d(0, ${(d * 70).toFixed(1)}px, 0)`;
        el.style.visibility = a <= 0.001 ? 'hidden' : 'visible';
      });
      glows.current.forEach((el, i) => {
        if (el) el.style.opacity = (clamp(1 - Math.abs(i - s)) * 0.5 * introP).toFixed(3);
      });

      const now = Math.round(s);
      if (now !== activeRef.current) {
        activeRef.current = now;
        setActive(now);
      }
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
    // geometry reads refs only; n is fixed for the page's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const jumpTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const { intro, per } = geometry();
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + intro + per * i + 2, behavior: 'smooth' });
  };

  const current = sites[active];

  return (
    <section
      ref={sectionRef}
      aria-label="Selected websites"
      className="story relative bg-background-dark"
      style={{ height: `calc(100svh + ${90 + 50 + (n - 1) * 80}vh)` }}
    >
      <div ref={stageRef} className="story-stage sticky top-0 h-[100svh] overflow-hidden">
        {/* Atmosphere: cool aurora, the active brand's glow, drifting ice specks */}
        <div aria-hidden="true" className="absolute left-1/2 top-[30%] h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-primary-blue opacity-[0.16] blur-[140px]" />
        <div aria-hidden="true" className="absolute left-[6%] top-[8%] h-[380px] w-[380px] rounded-full bg-primary-cyan opacity-[0.11] blur-[110px]" />
        {sites.map((site, i) => (
          <div
            key={site.slug}
            ref={(el) => (glows.current[i] = el)}
            aria-hidden="true"
            className="absolute right-[4%] top-[14%] h-[34vh] w-[70vw] rounded-full opacity-0 blur-[90px] lg:top-[18%] lg:h-[520px] lg:w-[620px] lg:blur-[130px]"
            style={{ background: site.glow === '#ffffff' ? site.stage : site.glow }}
          />
        ))}
        <div aria-hidden="true" className="story-specks absolute inset-0" />

        {/* Opening title */}
        <div className="story-title pointer-events-none absolute inset-x-0 top-[22%] z-10 px-6 text-center lg:top-[18%]">
          <p className="mb-4 text-lg text-muted">
            Websites for businesses that want to be <span className="font-semibold text-ink">seen, trusted and chosen.</span>
          </p>
          <h1
            className="bg-clip-text font-black leading-[0.82] text-transparent"
            style={{
              fontSize: 'clamp(76px, 16.5vw, 228px)',
              letterSpacing: '-0.05em',
              backgroundImage: 'linear-gradient(90deg, rgb(var(--c-accent)) 10%, rgb(var(--c-accent-2)) 70%, rgb(var(--c-violet)))'
            }}
          >
            Websites
          </h1>
          <p className="story-cue mt-10 text-sm font-semibold tracking-wider text-subtle">
            {pad(n)} SITES · SCROLL TO SEE THEM
          </p>
        </div>

        {/* The pinned story */}
        <div className="relative mx-auto flex h-full max-w-[1320px] flex-col justify-center gap-7 px-5 pt-16 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:items-center lg:gap-14 lg:px-8">
          {/* Words */}
          <div className="story-words order-2 lg:order-1">
            <div className="mb-5 flex items-baseline gap-3 font-semibold tabular-nums text-subtle">
              <span className="text-2xl text-ink">{pad(active + 1)}</span>
              <span className="text-sm">/ {pad(n)}</span>
              <span className="ml-2 h-px w-16 self-center bg-line" aria-hidden="true">
                <span
                  className="block h-px bg-gradient-hero transition-[width] duration-500"
                  style={{ width: `${((active + 1) / n) * 100}%` }}
                />
              </span>
            </div>
            <div className="relative h-[156px] sm:h-[170px] lg:h-[300px]">
              {sites.map((site, i) => (
                <div
                  key={site.slug}
                  ref={(el) => (texts.current[i] = el)}
                  className="absolute inset-x-0 top-0 will-change-transform"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                  aria-hidden={i !== active}
                >
                  <h2 className="font-black leading-[0.92] text-ink" style={{ fontSize: 'clamp(34px, 4.2vw, 64px)', letterSpacing: '-0.04em' }}>
                    {site.client}
                  </h2>
                  <p className="mt-3 text-sm font-semibold text-primary-cyan">
                    {site.category}
                    {site.location ? ` · ${site.location}` : ''}
                  </p>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted lg:text-lg">{site.statement}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-5 lg:mt-6">
              <Link
                to={`/websites/${current.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-[15px] font-semibold text-white shadow-[0_10px_34px_rgba(0,216,255,0.32)] transition-transform hover:-translate-y-0.5"
              >
                View {current.client}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Device */}
          <div className="story-device relative order-1 mx-auto w-full lg:order-2">
            <Link to={`/websites/${current.slug}`} aria-label={`${current.client}: view website`} className="group block">
              <BrowserFrame
                url={current.displayUrl}
                className="mx-auto w-full shadow-[0_40px_120px_-20px_rgba(0,123,255,0.55)] lg:w-[min(100%,calc(62vh*1.6))]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0F1F]">
                  {sites.map((site, i) => (
                    <div
                      key={site.slug}
                      ref={(el) => (screens.current[i] = el)}
                      className="story-layer absolute inset-0 will-change-transform"
                      style={{ zIndex: i, visibility: i === 0 ? 'visible' : 'hidden' }}
                    >
                      <img
                        src={site.image}
                        alt={i === active ? `${site.client} website on desktop` : ''}
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        fetchPriority={i < 2 ? 'high' : 'low'}
                      />
                    </div>
                  ))}
                </div>
              </BrowserFrame>
            </Link>

            <PhoneFrame className="story-phone absolute -bottom-10 -left-10 hidden h-[40vh] max-h-[400px] w-auto aspect-[390/844] lg:block xl:-left-14">
              <div className="relative h-full w-full overflow-hidden">
                {sites.map((site, i) => (
                  <div
                    key={site.slug}
                    ref={(el) => (phones.current[i] = el)}
                    className="story-layer absolute inset-0 will-change-transform"
                    style={{ zIndex: i, visibility: i === 0 ? 'visible' : 'hidden' }}
                  >
                    <img src={site.mobileImage} alt="" className="h-full w-full object-cover object-top" fetchPriority="low" />
                  </div>
                ))}
              </div>
            </PhoneFrame>
          </div>
        </div>

        {/* Rail: jump to any site */}
        <nav aria-label="Jump to a website" className="story-rail absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 md:flex lg:right-6">
          {sites.map((site, i) => (
            <button
              key={site.slug}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Show ${site.client}`}
              aria-current={i === active ? 'true' : undefined}
              className="group flex h-4 w-4 items-center justify-center"
            >
              <span
                className={`block w-1 rounded-full transition-all duration-300 ${
                  i === active ? 'h-4 bg-primary-cyan shadow-[0_0_12px_rgba(0,216,255,0.8)]' : 'h-1 bg-white/30 group-hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default WebsitesStory;

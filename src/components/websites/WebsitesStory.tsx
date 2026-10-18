import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from '../Link';
import { PhoneFrame } from './Frames';
import type { Website } from '../../data/websites';

/**
 * Websites page opening, told on scroll (Apple product-page style).
 *
 * A laptop built in CSS 3D starts closed and tilted away. As you scroll it
 * rises, turns to face you and the lid opens. It then carries the story:
 * for each site it glides to one side and angles toward that site's words,
 * the screen changes, and it swings across for the next. After the last site
 * it returns to the centre and the lid starts to close.
 *
 * Everything moves from one scroll position, written to the DOM on each
 * animation frame; React only re-renders when the active site changes.
 */

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pad = (n: number) => String(n).padStart(2, '0');

interface Pose {
  x: number; // px, from centre
  y: number; // px, from centre
  s: number; // scale
  rx: number; // deg, negative = seen from above
  ry: number; // deg
  rz: number; // deg, roll
  lid: number; // deg, 0 = upright, -90 = closed
}

const mix = (a: Pose, b: Pose, t: number): Pose => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  s: lerp(a.s, b.s, t),
  rx: lerp(a.rx, b.rx, t),
  ry: lerp(a.ry, b.ry, t),
  rz: lerp(a.rz, b.rz, t),
  lid: lerp(a.lid, b.lid, t)
});

/**
 * How the laptop rests on each site: turn toward the words, tilt, size,
 * height and lid angle. Small differences so no two pauses look alike.
 */
const HOLDS = [
  { ry: 17, rx: -9, s: 1, dy: 0, lid: 12 }, // Keja
  { ry: 22, rx: -4, s: 0.96, dy: 0.03, lid: 14 }, // Enkare: low and cinematic
  { ry: 12, rx: -12, s: 1.05, dy: -0.01, lid: 10 }, // Tabasamu
  { ry: 15, rx: -17, s: 0.94, dy: 0.01, lid: 16 }, // Mlima: from above, like a table
  { ry: 23, rx: -7, s: 1, dy: 0, lid: 8 }, // Mbegu
  { ry: 12, rx: -10, s: 1.04, dy: -0.01, lid: 12 }, // Ember & Salt
  { ry: 19, rx: -4, s: 1.02, dy: 0.02, lid: 12 }, // Nguvu
  { ry: 16, rx: -13, s: 0.95, dy: 0, lid: 14 }, // Chipukizi
  { ry: 14, rx: -8, s: 1, dy: -0.01, lid: 12 } // Mwamba
];

/**
 * The move that carries the laptop from one site to the next, in order.
 * Moves marked as cuts change the screen at the moment it is hidden from view
 * (back turned, lid shut, out of frame, edge-on); the others slide it.
 */
const MOVES = ['swing', 'spin', 'dive', 'overhead', 'drop', 'bank', 'away', 'lid'] as const;
const CUTS = new Set<string>(['spin', 'overhead', 'drop', 'lid']);

/** Laptop on the right for even sites (words on the left), left for odd ones. */
const sideOf = (i: number) => (i % 2 === 0 ? 1 : -1);

const WebsitesStory = ({ sites }: { sites: Website[] }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
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
    const intro = vh * 1.1;
    const tail = vh * 0.7;
    const range = section.offsetHeight - vh;
    const per = Math.max(1, (range - intro - tail) / Math.max(1, n - 1));
    return { vh, intro, per, tail };
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
      const { vh, intro, per, tail } = geometry();
      const vw = window.innerWidth;
      const wide = vw >= 1024;
      const scrolled = -section.getBoundingClientRect().top;

      const introP = clamp(scrolled / intro);
      stage.style.setProperty('--intro', introP.toFixed(4));
      stage.style.setProperty('--p', clamp(scrolled / (section.offsetHeight - vh)).toFixed(4));

      // Hold on each site for the first part of its stretch, then move on.
      const f = clamp((scrolled - intro) / per, 0, n - 1);
      const base = Math.floor(f);
      const frac = f - base;
      const t = smooth(clamp((frac - 0.45) / 0.55));
      const s = base + t;

      // Poses. On phones the laptop stays centred above the words and turns less.
      const pose = (i: number): Pose => {
        const h = HOLDS[i % HOLDS.length];
        return wide
          ? { x: sideOf(i) * vw * 0.17, y: vh * (h.dy - 0.09), s: h.s, rx: h.rx, ry: -sideOf(i) * h.ry, rz: 0, lid: h.lid }
          : { x: 0, y: vh * (h.dy * 0.5 - 0.17), s: 1 + (h.s - 1) * 0.5, rx: h.rx, ry: -sideOf(i) * h.ry * 0.55, rz: 0, lid: h.lid };
      };
      const start: Pose = { x: 0, y: vh * (wide ? 0.2 : 0.14), s: wide ? 0.58 : 0.66, rx: -62, ry: 0, rz: 0, lid: -90 };
      const end: Pose = { x: 0, y: vh * (wide ? 0 : -0.1), s: wide ? 0.78 : 0.82, rx: -24, ry: 0, rz: 0, lid: -62 };

      let p: Pose;
      let cut = false;
      let phoneFade = 0;
      let wordsFade = 0;
      if (scrolled < intro) {
        const a = smooth(introP);
        p = mix(start, pose(0), a);
        // The lid opens in the second half of the rise.
        p.lid = lerp(-90, pose(0).lid, smooth(clamp((introP - 0.3) / 0.6)));
      } else {
        const a = pose(base);
        const b = pose(Math.min(n - 1, base + 1));
        const bump = Math.sin(Math.PI * t);
        const move = MOVES[base % MOVES.length];
        cut = CUTS.has(move) && t > 0 && t < 1;
        p = mix(a, b, t);
        switch (move) {
          case 'swing': // lifted and carried across
            p.y -= bump * vh * 0.035;
            p.s *= 1 - bump * 0.05;
            break;
          case 'spin': // turntable: a full turn, back of the lid passes the camera
            p.ry += 360 * t;
            p.y -= bump * vh * 0.03;
            p.s *= 1 - bump * 0.14;
            phoneFade = bump * 0.8;
            break;
          case 'dive': // rushes at the camera, screen nearly fills the view
            p.s *= 1 + bump * (wide ? 0.85 : 0.3);
            p.x *= 1 - bump;
            p.y = lerp(p.y, wide ? vh * 0.02 : -vh * 0.12, bump);
            p.rx = lerp(p.rx, 0, bump);
            p.ry = lerp(p.ry, 0, bump);
            phoneFade = Math.min(1, bump * 2.5);
            wordsFade = Math.min(1, bump * 2.5);
            break;
          case 'overhead': // tips to a top-down view, screen edge-on
            p.rx = lerp(p.rx, -80, bump);
            p.y += bump * vh * 0.05;
            p.s *= 1 - bump * 0.08;
            phoneFade = bump;
            break;
          case 'drop': // sinks out of frame, comes up on the other side
            p.x = lerp(a.x, b.x, smooth(clamp((t - 0.35) / 0.3)));
            p.y += Math.pow(bump, 0.8) * vh * 0.95;
            wordsFade = wide ? 0 : Math.min(1, bump * 2.5);
            break;
          case 'bank': // rolls into the turn like a plane
            p.rz = -(Math.sign(b.x - a.x) || sideOf(base)) * bump * (wide ? 12 : 7);
            p.y -= bump * vh * 0.06;
            break;
          case 'away': // shrinks into the distance and comes back
            p.s *= 1 - bump * 0.55;
            p.y -= bump * vh * 0.08;
            p.ry += bump * 35 * sideOf(base);
            phoneFade = bump * 0.7;
            break;
          case 'lid': // shuts, and the next site opens "like a file"
            p.lid = lerp(p.lid, -90, Math.min(1, bump * 1.25));
            p.rx = lerp(p.rx, -32, bump);
            p.y += bump * vh * 0.03;
            phoneFade = bump;
            break;
        }
      }
      const lastHoldEnd = intro + per * (n - 1) + tail * 0.25;
      const outro = smooth(clamp((scrolled - lastHoldEnd) / (tail * 0.75)));
      if (outro > 0) p = mix(p, end, outro);

      const rig = rigRef.current;
      const body = bodyRef.current;
      const lid = lidRef.current;
      if (rig) rig.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) scale(${p.s.toFixed(4)})`;
      if (body) body.style.transform = `rotateX(${p.rx.toFixed(2)}deg) rotateY(${p.ry.toFixed(2)}deg) rotateZ(${p.rz.toFixed(2)}deg)`;
      if (lid) lid.style.transform = `rotateX(${p.lid.toFixed(2)}deg)`;
      if (auraRef.current) auraRef.current.style.transform = `translate3d(${(p.x * 0.7).toFixed(1)}px, 0, 0)`;

      // Phone stands in front of the laptop's inner corner, toward the words,
      // and crosses in front of the screen when the laptop changes side.
      if (phoneRef.current) {
        const side = p.x / (vw * 0.17 || 1);
        const show = clamp((introP - 0.75) * 4) * (1 - outro) * (1 - phoneFade);
        const reach = (rig?.offsetWidth ?? 0) * 0.55;
        phoneRef.current.style.transform = `translate3d(${(-side * reach).toFixed(1)}px, 0, 420px)`;
        phoneRef.current.style.opacity = show.toFixed(3);
      }

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
      // Cut moves swap the screen in one go while it is out of sight.
      const cutPos = base + (t >= 0.5 ? 1 : 0);
      place(screens.current, cut ? cutPos : s);
      place(phones.current, cut ? cutPos : base + smooth(clamp((frac - 0.6) / 0.4)));

      texts.current.forEach((el, i) => {
        if (!el) return;
        const d = i - s;
        const a = clamp(1 - Math.abs(d) * 2.2) * clamp((introP - 0.6) * 2.5) * (1 - outro) * (1 - wordsFade);
        el.style.opacity = a.toFixed(3);
        el.style.transform = `translate3d(0, ${(d * 60).toFixed(1)}px, 0)`;
        el.style.visibility = a <= 0.001 ? 'hidden' : 'visible';
        el.style.pointerEvents = a > 0.5 ? 'auto' : 'none';
      });
      glows.current.forEach((el, i) => {
        if (el) el.style.opacity = (clamp(1 - Math.abs(i - s)) * 0.5 * introP * (1 - outro * 0.6)).toFixed(3);
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
      style={{ height: `calc(100svh + ${110 + 70 + (n - 1) * 90}vh)` }}
    >
      <div ref={stageRef} className="story-stage sticky top-0 h-[100svh] overflow-hidden">
        {/* Atmosphere: cool aurora, the active brand's glow (follows the laptop), drifting ice specks */}
        <div aria-hidden="true" className="absolute left-1/2 top-[30%] h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-primary-blue opacity-[0.16] blur-[140px]" />
        <div aria-hidden="true" className="absolute left-[6%] top-[8%] h-[380px] w-[380px] rounded-full bg-primary-cyan opacity-[0.11] blur-[110px]" />
        <div ref={auraRef} aria-hidden="true" className="absolute inset-0 will-change-transform">
          {sites.map((site, i) => (
            <div
              key={site.slug}
              ref={(el) => (glows.current[i] = el)}
              className="absolute left-1/2 top-[14%] h-[34vh] w-[70vw] -translate-x-1/2 rounded-full opacity-0 blur-[90px] lg:top-[16%] lg:h-[520px] lg:w-[620px] lg:blur-[130px]"
              style={{ background: site.glow === '#ffffff' ? site.stage : site.glow }}
            />
          ))}
        </div>
        <div aria-hidden="true" className="story-specks absolute inset-0" />

        {/* Opening title */}
        <div className="story-title pointer-events-none absolute inset-x-0 top-[22%] z-20 px-6 text-center lg:top-[16%]">
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
            {pad(n)} SITES · SCROLL TO OPEN
          </p>
        </div>

        {/* The laptop */}
        <div className="story-scene absolute inset-0 flex items-center justify-center pt-16">
          <div ref={rigRef} className="story-rig relative w-[84vw] will-change-transform lg:w-[min(44vw,70vh)]">
            <Link
              to={`/websites/${current.slug}`}
              aria-label={`${current.client}: view website`}
              className="story-body block"
            >
              <div ref={bodyRef} className="story-body-3d relative">
                {/* Lid: screen on the front, brushed metal on the back */}
                <div ref={lidRef} className="story-lid relative">
                  <div className="story-lid-front rounded-t-[1.4vw] rounded-b-[0.35vw] border border-white/15 bg-[#06080d] p-[2.2%] pb-[3%] lg:rounded-t-[16px] lg:rounded-b-[5px]">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[0.4vw] bg-[#0A0F1F] lg:rounded-[4px]">
                      {sites.map((site, i) => (
                        <div
                          key={site.slug}
                          ref={(el) => (screens.current[i] = el)}
                          className="story-layer absolute inset-0 will-change-transform"
                          style={{ zIndex: i, visibility: i === 0 ? 'visible' : 'hidden' }}
                        >
                          <img
                            src={site.image}
                            alt={i === active ? `${site.client} website on a laptop` : ''}
                            className="h-full w-full object-cover object-top"
                            fetchPriority={i < 2 ? 'high' : 'low'}
                          />
                        </div>
                      ))}
                      <div aria-hidden="true" className="story-glare pointer-events-none absolute inset-0 z-50" />
                    </div>
                  </div>
                  <div aria-hidden="true" className="story-lid-back absolute inset-0 rounded-t-[1.4vw] rounded-b-[0.35vw] lg:rounded-t-[16px] lg:rounded-b-[5px]">
                    <span className="story-lid-mark" />
                  </div>
                </div>
                {/* Keyboard deck, lying flat toward you from the hinge */}
                <div aria-hidden="true" className="story-deck absolute left-[-5%] top-full w-[110%]">
                  <div className="story-keys" />
                  <div className="story-pad" />
                </div>
              </div>
            </Link>

            {/* Phone, standing in front of the laptop */}
            <div ref={phoneRef} className="story-phone-slot pointer-events-none absolute bottom-[-12%] left-[42.5%] hidden w-[15%] lg:block" style={{ opacity: 0 }}>
              <div>
                <PhoneFrame className="aspect-[390/844] w-full !rounded-[22px] !p-1.5">
                  <div className="relative h-full w-full overflow-hidden rounded-[16px]">
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
          </div>
        </div>

        {/* Words: opposite the laptop on large screens, under it on phones */}
        {sites.map((site, i) => (
          <div
            key={site.slug}
            ref={(el) => (texts.current[i] = el)}
            className={`story-text absolute inset-x-5 bottom-[7vh] z-30 will-change-transform sm:inset-x-10 lg:inset-x-auto lg:bottom-auto lg:top-1/2 lg:w-[30vw] lg:max-w-[440px] ${
              sideOf(i) === 1 ? 'lg:left-[6vw]' : 'lg:right-[6vw]'
            }`}
            style={{ opacity: 0, visibility: 'hidden' }}
            aria-hidden={i !== active}
          >
            <div className="lg:-translate-y-1/2 lg:pt-16">
              <div className="mb-4 flex items-baseline gap-3 font-semibold tabular-nums text-subtle">
                <span className="text-2xl text-ink">{pad(i + 1)}</span>
                <span className="text-sm">/ {pad(n)}</span>
                <span className="ml-2 h-px w-16 self-center bg-line" aria-hidden="true">
                  <span className="block h-px bg-gradient-hero" style={{ width: `${((i + 1) / n) * 100}%` }} />
                </span>
              </div>
              <h2 className="font-black leading-[0.92] text-ink" style={{ fontSize: 'clamp(32px, 4.2vw, 64px)', letterSpacing: '-0.04em' }}>
                {site.client}
              </h2>
              <p className="mt-3 text-sm font-semibold text-primary-cyan">
                {site.category}
                {site.location ? ` · ${site.location}` : ''}
              </p>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted lg:text-lg">{site.statement}</p>
              <Link
                to={`/websites/${site.slug}`}
                tabIndex={i === active ? 0 : -1}
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-[15px] font-semibold text-white shadow-[0_10px_34px_rgba(0,216,255,0.32)] transition-transform hover:-translate-y-0.5 lg:mt-7"
              >
                View {site.client}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}

        {/* Rail: jump to any site */}
        <nav aria-label="Jump to a website" className="story-rail absolute right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 md:flex lg:right-5">
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

import { useState } from 'react';
import WebsitesStory from '../components/websites/WebsitesStory';
import { prefersReducedMotion } from '../lib/motion';
import { ArrowRight } from 'lucide-react';
import Link from '../components/Link';
import Reveal from '../components/Reveal';
import { BrowserFrame, PhoneFrame } from '../components/websites/Frames';
import { DesktopShot, PhoneShot } from '../components/websites/WebsiteVisuals';
import { websites, websiteCategories, type Website } from '../data/websites';
import { useDocumentTitle } from '../lib/router';

const ViewBadge = ({ size = 'md', label = 'View' }: { size?: 'md' | 'lg'; label?: string }) => (
  <span
    className={`pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full bg-gradient-hero-br text-center font-bold leading-tight text-white opacity-0 shadow-[0_16px_50px_rgba(0,216,255,0.5)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 ${
      size === 'lg' ? 'h-32 w-32 text-[15px]' : 'h-28 w-28 text-[15px]'
    }`}
  >
    {label}
  </span>
);

const Statement = ({ site, large = false }: { site: Website; large?: boolean }) => (
  <p
    className={`${large ? 'text-2xl md:text-[30px]' : 'text-xl md:text-[26px]'} font-medium leading-snug tracking-tight text-muted`}
  >
    <span className="font-bold text-ink">{site.client}</span> – {site.statement}
  </p>
);

const WebsiteTile = ({ site }: { site: Website }) => (
  <Link to={`/websites/${site.slug}`} className="group block" aria-label={`${site.client}: view website`}>
    <div
      className="relative flex h-[380px] items-center justify-center overflow-hidden rounded-[28px] sm:h-[480px] lg:h-[560px]"
      style={{ background: site.stage }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full opacity-30 blur-[90px]"
        style={{ background: site.glow }}
      />
      <div className="relative transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04]">
        {site.phoneFirst ? (
          <div className="flex items-end gap-5">
            <PhoneFrame className="h-[330px] w-[160px] -rotate-6 sm:h-[410px] sm:w-[200px]">
              <PhoneShot site={site} />
            </PhoneFrame>
            <PhoneFrame className="h-[330px] w-[160px] -translate-y-8 rotate-[5deg] sm:h-[410px] sm:w-[200px]">
              <PhoneShot site={site} alt />
            </PhoneFrame>
          </div>
        ) : (
          <div style={{ transform: `rotate(${site.tilt ?? 0}deg)` }}>
            <BrowserFrame compact light={site.mock === 'saas'} className="w-[78vw] max-w-[470px] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="h-[230px] sm:h-[300px]">
                <DesktopShot site={site} />
              </div>
            </BrowserFrame>
          </div>
        )}
      </div>
      <ViewBadge />
    </div>
    <div className="mt-7">
      <Statement site={site} />
    </div>
  </Link>
);

const WebsitesPage = () => {
  useDocumentTitle('Websites - Franklin Mburu Kamande');
  const [category, setCategory] = useState<(typeof websiteCategories)[number]>('All');
  // The scroll story replaces the still opening; reduced-motion visitors keep the still one.
  const [story] = useState(() => !prefersReducedMotion());

  const featured = websites.find((site) => site.featured) ?? websites[0];
  const rest = websites.filter(
    (site) => (story || site !== featured) && (category === 'All' || site.category === category)
  );
  const left = rest.filter((_, i) => i % 2 === 0);
  const right = rest.filter((_, i) => i % 2 === 1);

  return (
    <div className={story ? 'pt-0' : 'overflow-hidden pt-[var(--header-h)]'}>
      {story ? (
        <WebsitesStory sites={websites} />
      ) : (
      /* Hero: giant title with the featured website rising through it */
      <section className="relative bg-background-dark px-6 pb-28 pt-16 md:pb-36">
        <div aria-hidden="true" className="absolute left-1/2 top-32 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary-blue opacity-[0.16] blur-[140px]" />
        <div aria-hidden="true" className="absolute left-[8%] top-10 h-[360px] w-[360px] rounded-full bg-primary-cyan opacity-[0.12] blur-[110px]" />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="animate-rise mb-3 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-sm text-lg leading-relaxed text-muted">
              Websites for businesses that want to be <span className="font-semibold text-ink">seen, trusted and chosen.</span>
            </p>
            <span className="text-sm font-semibold tracking-wider text-subtle">
              ({String(websites.length).padStart(2, '0')}) SELECTED WORK
            </span>
          </div>

          <h1
            className="animate-rise bg-clip-text text-center font-black leading-[0.82] text-transparent"
            style={{
              fontSize: 'clamp(76px, 16.5vw, 228px)',
              letterSpacing: '-0.05em',
              backgroundImage: 'linear-gradient(90deg, rgb(var(--c-accent)) 10%, rgb(var(--c-accent-2)) 70%, rgb(var(--c-violet)))'
            }}
          >
            Websites
          </h1>

          <Link
            to={`/websites/${featured.slug}`}
            className="group animate-rise-late relative mx-auto mt-3 block max-w-[1000px] sm:-mt-[3vw] lg:-mt-12"
            aria-label={`${featured.client}: view website`}
          >
            <BrowserFrame
              url={featured.displayUrl ?? featured.url?.replace(/^https?:\/\//, '')}
              className="shadow-[0_40px_120px_-20px_rgba(0,123,255,0.55)]"
            >
              <div className="h-[260px] transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[400px] lg:h-[520px]">
                <DesktopShot site={featured} />
              </div>
            </BrowserFrame>
            <ViewBadge size="lg" label="View website" />
            <PhoneFrame className="absolute -bottom-16 -right-14 hidden h-[410px] w-[200px] lg:block">
              <PhoneShot site={featured} />
            </PhoneFrame>
          </Link>

          <div className="animate-rise-late mx-auto mt-14 max-w-[1000px] lg:pr-56">
            <Statement site={featured} large />
          </div>
        </div>
      </section>
      )}

      {/* Work: two staggered columns, one bold line each */}
      <section className="bg-page px-6 py-28 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          {websiteCategories.length > 2 && (
          <div className="mb-16 flex flex-wrap gap-3 md:mb-20" role="group" aria-label="Filter websites">
            {websiteCategories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors ${
                  category === item ? 'bg-ink font-semibold text-page' : 'border border-line text-body hover:border-primary-cyan/60'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          )}

          {rest.length === 0 ? (
            <p className="py-16 text-center text-lg text-muted">More {category.toLowerCase()} work coming soon.</p>
          ) : (
            <div className="grid gap-x-12 gap-y-20 md:grid-cols-2">
              <div className="flex flex-col gap-20 md:gap-28">
                {left.map((site) => (
                  <Reveal key={site.slug}>
                    <WebsiteTile site={site} />
                  </Reveal>
                ))}
              </div>
              <div className="flex flex-col gap-20 md:gap-28 md:pt-48">
                {right.map((site) => (
                  <Reveal key={site.slug} delay={120}>
                    <WebsiteTile site={site} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Outlined type band */}
      <section aria-hidden="true" className="overflow-hidden border-y border-line/40 bg-page py-12 md:py-14">
        <div className="animate-marquee flex w-max gap-14 whitespace-nowrap font-black leading-none" style={{ fontSize: 'clamp(64px, 9vw, 120px)', letterSpacing: '-0.035em' }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-14">
              <span className="text-outline">Business websites</span>
              <span className="text-ink">·</span>
              <span className="text-outline">Landing pages</span>
              <span className="text-ink">·</span>
              <span className="text-outline">Web apps</span>
              <span className="text-ink">·</span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <section className="relative overflow-hidden bg-background-dark px-6 py-32 text-center md:py-44">
        <div aria-hidden="true" className="absolute -bottom-64 left-1/2 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-primary-blue opacity-[0.18] blur-[140px]" />
        <Reveal className="relative mx-auto max-w-[1240px]">
          <h2 className="mb-12 font-black leading-[0.88] text-ink" style={{ fontSize: 'clamp(64px, 11vw, 148px)', letterSpacing: '-0.05em' }}>
            Let's build
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, rgb(var(--c-accent)), rgb(var(--c-accent-2)) 60%, rgb(var(--c-violet)))' }}
            >
              yours.
            </span>
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-hero px-10 py-5 text-lg font-bold text-white shadow-[0_16px_50px_rgba(0,216,255,0.4)] transition-transform duration-300 hover:-translate-y-1"
          >
            Start a project
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default WebsitesPage;

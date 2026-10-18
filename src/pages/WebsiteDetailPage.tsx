import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from '../components/Link';
import Reveal from '../components/Reveal';
import { BrowserFrame, PhoneFrame } from '../components/websites/Frames';
import { DesktopShot, PhoneShot } from '../components/websites/WebsiteVisuals';
import { websites } from '../data/websites';
import { useDocumentTitle } from '../lib/router';
import NotFoundPage from './NotFoundPage';

const WebsiteDetailPage = ({ slug }: { slug: string }) => {
  const index = websites.findIndex((site) => site.slug === slug);
  const site = websites[index];
  useDocumentTitle(site ? `${site.client} - Websites - Franklin Mburu Kamande` : 'Page not found - Franklin Mburu Kamande');

  if (!site) return <NotFoundPage />;

  const next = websites[(index + 1) % websites.length];
  const hasLiveLink = Boolean(site.url && site.url !== '#');
  const linkLabel = site.status === 'Concept' ? 'Open the site' : 'Visit live site';
  const facts = [site.category === 'Business' ? 'Business website' : site.category, site.location, site.year, site.role].filter(Boolean);

  return (
    <div className="overflow-hidden pt-16">
      {/* Title */}
      <section className="relative bg-background-dark px-6 pb-10 pt-14">
        <div aria-hidden="true" className="absolute -top-40 right-[8%] h-[440px] w-[440px] rounded-full opacity-[0.1] blur-[110px]" style={{ background: site.glow }} />
        <div className="relative mx-auto max-w-[1240px]">
          <Link to="/websites" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary-cyan">
            <ArrowLeft className="h-4 w-4" />
            All websites
          </Link>
          <div className="animate-rise flex flex-wrap items-end justify-between gap-8">
            <div>
              <h1 className="mb-4 font-black leading-[0.95] text-ink" style={{ fontSize: 'clamp(48px, 7vw, 88px)', letterSpacing: '-0.04em' }}>
                {site.client}
              </h1>
              <div className="flex flex-wrap items-center gap-2.5 text-[15px] text-muted">
                <span className={`h-2 w-2 rounded-full ${site.status === 'Live' ? 'bg-signal' : 'bg-accent-purple'}`} />
                {facts.join(' · ')}
                {site.status === 'Concept' && <span className="text-accent-purple">· Concept</span>}
              </div>
            </div>
            {hasLiveLink && (
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-hero px-7 py-4 font-semibold text-white shadow-[0_10px_34px_rgba(0,216,255,0.32)] transition-transform hover:-translate-y-1"
              >
                {linkLabel}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Hero screenshot */}
      <section className="bg-background-dark px-6 pb-24 pt-4">
        <div className="animate-rise-late mx-auto max-w-[1240px]">
          <BrowserFrame
            url={site.displayUrl ?? site.url?.replace(/^https?:\/\//, '')}
            light={site.mock === 'saas'}
            className="shadow-[0_0_90px_-14px_rgba(0,123,255,0.35)]"
          >
            <div className="h-[280px] sm:h-[460px] lg:h-[640px]">
              <DesktopShot site={site} />
            </div>
          </BrowserFrame>
        </div>
      </section>

      {/* One sentence */}
      <section className="bg-background-dark px-6 pb-24">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-2xl font-medium leading-snug tracking-tight text-body md:text-[28px]">{site.summary}</p>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="bg-page px-6 py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
          {site.gallery && site.gallery.length > 0 && (
            <div className="grid gap-10 md:grid-cols-2">
              {site.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 100}>
                  <BrowserFrame compact>
                    <img src={src} alt={`${site.client} website, page ${i + 2}`} className="w-full" loading="lazy" />
                  </BrowserFrame>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal>
            <div className="relative flex flex-wrap justify-center gap-10 overflow-hidden rounded-3xl border border-white/10 px-6 py-14" style={{ background: site.stage }}>
              <div aria-hidden="true" className="absolute -top-28 left-[40%] h-[360px] w-[360px] rounded-full opacity-20 blur-[100px]" style={{ background: site.glow }} />
              <PhoneFrame className="relative h-[440px] w-[210px]">
                <PhoneShot site={site} />
              </PhoneFrame>
              <PhoneFrame className="relative h-[440px] w-[210px] sm:mt-10">
                <PhoneShot site={site} alt />
              </PhoneFrame>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next website */}
      {next && next !== site && (
        <section className="border-t border-line/40 bg-background-dark px-6 py-24">
          <div className="mx-auto max-w-[1240px]">
            <p className="mb-5 text-sm font-semibold tracking-[0.15em] text-subtle">NEXT</p>
            <Link to={`/websites/${next.slug}`} className="group flex flex-wrap items-center gap-10">
              <div className="min-w-0 flex-[1_1_520px]">
                <BrowserFrame compact light={next.mock === 'saas'}>
                  <div className="h-[260px] transition-transform duration-700 group-hover:scale-[1.03] sm:h-[300px]">
                    <DesktopShot site={next} />
                  </div>
                </BrowserFrame>
              </div>
              <div className="flex flex-[1_1_300px] flex-col gap-4">
                <span className="font-black leading-none text-ink" style={{ fontSize: 'clamp(40px, 5vw, 56px)', letterSpacing: '-0.035em' }}>
                  {next.client}
                </span>
                <span className="inline-flex items-center gap-2.5 text-lg font-semibold text-primary-cyan">
                  View website
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default WebsiteDetailPage;

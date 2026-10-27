import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Mail } from 'lucide-react';
import Link from '../components/Link';
import Reveal from '../components/Reveal';
import FlowDiagram from '../components/caseStudy/FlowDiagram';
import { getStatusColor, statusHint } from '../lib/projectStatus';
import { caseStudies } from '../data/projects';
import { useDocumentTitle } from '../lib/router';
import NotFoundPage from './NotFoundPage';

const Section = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-line/50 py-16 md:py-20">
    <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-12">
      <div>
        <h2 id={`${id}-heading`} className="text-2xl font-bold tracking-tight text-ink md:sticky md:top-[calc(var(--header-h)+32px)]">
          {title}
        </h2>
        <div className="mt-3 h-1 w-10 rounded-full bg-gradient-hero" aria-hidden="true" />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
);

const Prose = ({ paragraphs }: { paragraphs: string[] }) => (
  <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed text-body">
    {paragraphs.map((p) => (
      <p key={p}>{p}</p>
    ))}
  </div>
);

const CaseStudyPage = ({ slug }: { slug: string }) => {
  const index = caseStudies.findIndex((project) => project.slug === slug);
  const project = caseStudies[index];
  useDocumentTitle(project ? `${project.title} - Case study - Franklin Mburu Kamande` : 'Page not found - Franklin Mburu Kamande');

  if (!project || !project.caseStudy) return <NotFoundPage />;

  const study = project.caseStudy;
  const previous = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <div className="overflow-hidden pt-[var(--header-h)]">
      {/* Title */}
      <header className="relative bg-background-dark px-6 pb-16 pt-14 md:pb-20">
        <div aria-hidden="true" className="absolute -top-48 right-[6%] h-[460px] w-[460px] rounded-full bg-primary-blue opacity-[0.14] blur-[120px]" />
        <div aria-hidden="true" className="absolute -left-24 top-24 h-[320px] w-[320px] rounded-full bg-primary-cyan opacity-[0.08] blur-[110px]" />
        <div className="relative mx-auto max-w-[1100px]">
          <Link to="/projects" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary-cyan">
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>
          <div className="animate-rise">
            <p className="mb-4 text-sm font-semibold text-primary-cyan">Case study</p>
            <h1 className="max-w-[18ch] font-black leading-[0.98] text-ink" style={{ fontSize: 'clamp(38px, 6vw, 72px)', letterSpacing: '-0.04em' }}>
              {project.title}
            </h1>
            <p className="mt-6 max-w-[56ch] text-xl leading-relaxed text-muted md:text-2xl">{study.summary}</p>
          </div>

          <dl className="animate-rise-late mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card/90 p-5 backdrop-blur-sm lg:col-span-2">
              <dt className="text-xs font-semibold text-subtle">Role</dt>
              <dd className="mt-1.5 text-[15px] leading-snug text-ink">{study.role}</dd>
            </div>
            <div className="bg-card/90 p-5 backdrop-blur-sm lg:col-span-2">
              <dt className="text-xs font-semibold text-subtle">Context</dt>
              <dd className="mt-1.5 text-[15px] leading-snug text-ink">{study.context}</dd>
            </div>
            <div className="bg-card/90 p-5 backdrop-blur-sm">
              <dt className="text-xs font-semibold text-subtle">Year</dt>
              <dd className="mt-1.5 text-[15px] text-ink">{study.year}</dd>
            </div>
            <div className="bg-card/90 p-5 backdrop-blur-sm">
              <dt className="text-xs font-semibold text-subtle">Status</dt>
              <dd className="mt-1.5">
                <span title={statusHint[project.status]} className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </dd>
            </div>
            <div className="bg-card/90 p-5 backdrop-blur-sm sm:col-span-2">
              <dt className="text-xs font-semibold text-subtle">Built with</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded border border-primary-cyan/20 bg-primary-cyan/10 px-2 py-1 text-xs text-primary-cyan">
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 font-semibold text-white shadow-[0_10px_34px_rgba(0,216,255,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  Open the live demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card/50 px-6 py-3 font-semibold text-ink backdrop-blur-sm transition-colors hover:border-primary-cyan/60"
                >
                  <Github className="h-4 w-4" />
                  Read the code
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="bg-page px-6">
        <div className="mx-auto max-w-[1100px]">
          <Section id="problem" title="The problem">
            <Prose paragraphs={study.problem} />
          </Section>

          <Section id="how-it-works" title="How it works">
            <Prose paragraphs={study.architecture} />
            <div className="mt-12 space-y-14">
              {study.diagrams.map((diagram) => (
                <Reveal key={diagram.title}>
                  <FlowDiagram diagram={diagram} />
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="decisions" title="Key decisions">
            <ol className="space-y-6">
              {study.decisions.map((decision, i) => (
                <li key={decision.title}>
                  <Reveal delay={i * 80}>
                    <article className="rounded-2xl border border-line bg-card/30 p-6 backdrop-blur-sm transition-colors hover:border-primary-cyan/40 md:p-8">
                      <h3 className="flex items-baseline gap-3 text-xl font-semibold text-ink">
                        <span className="text-sm font-bold tabular-nums text-primary-cyan">{i + 1}</span>
                        {decision.title}
                      </h3>
                      <dl className="mt-5 grid gap-5 md:grid-cols-3 md:gap-6">
                        <div>
                          <dt className="text-xs font-semibold text-primary-cyan">What I chose</dt>
                          <dd className="mt-1.5 text-[15px] leading-relaxed text-body">{decision.chose}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold text-subtle">Instead of</dt>
                          <dd className="mt-1.5 text-[15px] leading-relaxed text-muted">{decision.rejected}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold text-subtle">Why</dt>
                          <dd className="mt-1.5 text-[15px] leading-relaxed text-body">{decision.why}</dd>
                        </div>
                      </dl>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="results" title="Results and limits">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-primary-cyan">What it does</h3>
                <ul className="space-y-4">
                  {study.results.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-body">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-cyan" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line bg-card/30 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-sm font-semibold text-ink">Honest limits</h3>
                <ul className="space-y-4">
                  {study.limits.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-subtle" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Contact */}
      <section className="bg-page px-6 pb-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-card/40 px-6 py-12 text-center backdrop-blur-sm md:px-12 md:py-16">
            <div aria-hidden="true" className="absolute -bottom-40 left-1/2 h-[300px] w-[640px] -translate-x-1/2 rounded-full bg-primary-blue opacity-[0.16] blur-[110px]" />
            <h2 className="relative text-3xl font-bold tracking-tight text-ink md:text-4xl">Questions about this project?</h2>
            <p className="relative mx-auto mt-4 max-w-[46ch] text-lg text-muted">I’m happy to walk through the code, the trade-offs or something similar you’re building.</p>
            <Link
              to="/contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-hero px-7 py-3.5 font-semibold text-white shadow-[0_10px_34px_rgba(0,216,255,0.28)] transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Previous and next */}
      {caseStudies.length > 1 && (
        <nav aria-label="More case studies" className="border-t border-line/50 bg-background-dark px-6 py-14">
          <div className="mx-auto grid max-w-[1100px] gap-4 sm:grid-cols-2">
            <Link to={`/projects/${previous.slug}`} className="group rounded-2xl border border-line bg-card/30 p-6 backdrop-blur-sm transition-colors hover:border-primary-cyan/50">
              <span className="flex items-center gap-2 text-sm font-medium text-subtle">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Previous case study
              </span>
              <span className="mt-2 block text-lg font-semibold text-ink group-hover:text-primary-cyan">{previous.title}</span>
            </Link>
            <Link to={`/projects/${next.slug}`} className="group rounded-2xl border border-line bg-card/30 p-6 text-right backdrop-blur-sm transition-colors hover:border-primary-cyan/50">
              <span className="flex items-center justify-end gap-2 text-sm font-medium text-subtle">
                Next case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-2 block text-lg font-semibold text-ink group-hover:text-primary-cyan">{next.title}</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default CaseStudyPage;

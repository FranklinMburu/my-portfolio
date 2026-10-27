import { Trophy, ExternalLink, ArrowRight } from 'lucide-react';
import Link from './Link';

type Award = {
  title: string;
  subtitle: string;
  text: string;
  link: { label: string; href: string; internal?: boolean };
};

const awards: Award[] = [
  {
    title: 'Runner-up — Build54 Build Zero',
    subtitle: 'Team DealShield',
    text: 'Selected for venture-funding evaluation and subsequently seed funded.',
    link: { label: 'View on Build54', href: 'https://build54.com/builds/build-zero' }
  },
  {
    title: 'Finalist — Kenya AI Challenge',
    subtitle: 'Mercy Corps AgriFin Track · Team ExportPath AI',
    text: 'Selected as a finalist in the Mercy Corps AgriFin Track.',
    link: {
      label: 'Finalist announcement',
      href: 'https://www.linkedin.com/posts/kenya-ai-challenge_congratulations-to-exportpath-ai-finalists-activity-7485724237500944384-zFMW'
    }
  },
  {
    title: 'Team Lead — Kenya Reinsurance Corporation (Kenya Re) AI4Insurance Hackathon 2026',
    subtitle: 'Nairobi Flood Catastrophe Model',
    text: 'Led the team and built the backend and catastrophe-risk model.',
    link: { label: 'View the project', href: '/projects', internal: true }
  }
];

const linkClass =
  'mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-cyan transition-colors hover:text-primary-blue';

const Awards = () => {
  return (
    <section id="awards" className="py-24 bg-section/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
              Awards &amp; Recognition
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-cyan to-primary-blue mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award) => (
              <div
                key={award.title}
                className="flex flex-col p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-line hover:border-primary-cyan/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-cyan/20 to-primary-blue/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-primary-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-ink mb-1">{award.title}</h3>
                    <p className="text-primary-cyan font-medium">{award.subtitle}</p>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed">{award.text}</p>
                <div className="mt-auto">
                  {award.link.internal ? (
                    <Link to={award.link.href} className={linkClass}>
                      <span>{award.link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <a href={award.link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <span>{award.link.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;

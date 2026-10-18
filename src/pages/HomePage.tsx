import { ArrowRight, Download, Mail, Briefcase } from 'lucide-react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import Link from '../components/Link';
import { projects } from '../data/projects';
import { experiences } from '../data/experience';
import { useDocumentTitle } from '../lib/router';
import { CV_PATH, CV_FILENAME } from '../data/site';

const featured = projects.filter((project) => project.featured);
const currentRole = experiences[0];

const HomePage = () => {
  useDocumentTitle('Franklin Mburu Kamande - AI Engineer & Full-Stack Developer');

  return (
    <>
      <Hero />

      {/* Featured work */}
      <section id="featured" className="py-24 bg-section/50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
                Featured Work
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-cyan to-primary-blue mx-auto mb-6"></div>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                Projects with public code or a live deployment you can check for yourself
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="group inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-ink bg-card/50 backdrop-blur-sm border border-line hover:border-primary-cyan transition-all duration-300 hover:-translate-y-1"
              >
                <span>View all {projects.length} projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Now */}
      <section className="py-24 bg-page">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3 space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold text-ink">
                Currently building <span className="bg-gradient-hero bg-clip-text text-transparent">enterprise backends</span>
              </h2>
              <p className="text-body text-lg leading-relaxed">
                I'm a Software Engineer at <span className="text-signal font-semibold">{currentRole.company}</span>, working on
                a production multi-tenant CRM: Django REST APIs on PostgreSQL, tenant data isolation and role-based access
                control. Before that I led ICT at Stafford Schools.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center space-x-2 text-primary-cyan font-semibold"
              >
                <span>More about me and my experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="md:col-span-2 p-8 rounded-3xl bg-glass/70 border border-ink/10 shadow-card backdrop-blur-xl">
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-cyan to-primary-blue shadow-icon">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-ink font-semibold leading-tight">{currentRole.title}</p>
                  <p className="text-muted text-sm">{currentRole.period}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentRole.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-primary-cyan/10 text-primary-cyan rounded-lg border border-primary-cyan/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 bg-section/50">
        <div className="container mx-auto px-6">
          <div className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl border border-ink/10 bg-glass/70 backdrop-blur-xl shadow-card px-8 py-14 text-center">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary-cyan/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent-purple/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ink">
                Have a project in mind?
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto mb-8">
                Have a project in mind or want to collaborate? Let's build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="group px-6 py-3 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-cyan/50 transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
                >
                  <Mail className="w-5 h-5" />
                  <span>Get in touch</span>
                </Link>
                <a
                  href={CV_PATH}
                  download={CV_FILENAME}
                  className="px-6 py-3 bg-background-dark/50 backdrop-blur-sm rounded-lg font-semibold text-ink border border-line hover:border-primary-cyan transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
                >
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

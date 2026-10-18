import { ExternalLink, Github, FileText, Brain, Server, Layers, Workflow } from 'lucide-react';
import type { Project } from '../types';

const categoryIcon = { 'AI/ML': Brain, Backend: Server, 'Full-Stack': Layers, Automation: Workflow } as const;

const statusHint: Record<string, string> = {
  Live: 'A working public deployment is linked',
  'Public code': 'Source code is public on GitHub',
  Hackathon: 'Built during a hackathon; source code is public',
  Private: 'Source code and deployment are not public',
  'In Development': 'Still being built'
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Live':
      return 'bg-signal/15 text-green-700 dark:text-green-400 border-signal/30';
    case 'Public code':
      return 'bg-primary-cyan/15 text-primary-cyan border-primary-cyan/30';
    case 'Hackathon':
      return 'bg-accent-purple/15 text-violet-700 dark:text-purple-300 border-accent-purple/30';
    case 'In Development':
      return 'bg-yellow-500/15 text-amber-700 dark:text-yellow-400 border-yellow-500/30';
    case 'Private':
      return 'bg-subtle/15 text-muted border-subtle/30';
    default:
      return 'bg-primary-blue/15 text-primary-blue border-primary-blue/30';
  }
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div
    className="spotlight group relative h-full rounded-2xl bg-card/30 backdrop-blur-sm border border-line hover:border-primary-cyan/50 transition-all duration-300 overflow-hidden hover:-translate-y-1"
  >
    <div className="aspect-video overflow-hidden bg-card">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-glass via-section to-accent-purple/20">
          <div className="absolute w-40 h-40 bg-primary-cyan/20 rounded-full blur-3xl"></div>
          {(() => {
            const Icon = categoryIcon[project.category];
            return (
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-cyan to-primary-blue shadow-icon flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
            );
          })()}
        </div>
      )}
    </div>

    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-ink group-hover:text-primary-cyan transition-colors line-clamp-2">
          {project.title}
        </h3>
        <span
          title={statusHint[project.status]}
          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
            project.status
          )} whitespace-nowrap ml-2`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-muted text-sm mb-4 line-clamp-3 leading-relaxed">
        {project.description}
      </p>

      <div className="mb-4">
        <h4 className="text-xs font-semibold text-subtle mb-2">Key Achievements:</h4>
        <ul className="space-y-1">
          {project.achievements.slice(0, 2).map((achievement, index) => (
            <li key={index} className="text-xs text-muted flex items-start">
              <span className="text-primary-cyan mr-2">•</span>
              <span className="line-clamp-1">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 4).map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-primary-cyan/10 text-primary-cyan rounded border border-primary-cyan/20"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="px-2 py-1 text-xs bg-line/50 text-muted rounded">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-gradient-to-r from-primary-cyan to-primary-blue text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-primary-cyan/30 transition-all flex items-center justify-center space-x-1"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Live</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-line/50 text-body text-sm font-medium rounded-lg hover:bg-line/70 transition-all flex items-center justify-center space-x-1"
          >
            <Github className="w-3 h-3" />
            <span>Code</span>
          </a>
        )}
        {project.caseStudyUrl && (
          <a
            href={project.caseStudyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-line/50 text-body text-sm font-medium rounded-lg hover:bg-line/70 transition-all flex items-center justify-center"
          >
            <FileText className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default ProjectCard;

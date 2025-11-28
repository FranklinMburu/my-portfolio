import { useState } from 'react';
import { ExternalLink, Github, FileText, Filter } from 'lucide-react';
import { projects } from '../data/projects';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'AI/ML', 'Backend', 'Full-Stack', 'Automation'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Production':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Development':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Private':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <section id="projects" className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of intelligent systems and production-grade applications
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="text-sm text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden hover:scale-105"
              >
                <div className="aspect-video overflow-hidden bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                        project.status
                      )} whitespace-nowrap ml-2`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {project.achievements.slice(0, 2).map((achievement, index) => (
                        <li key={index} className="text-xs text-gray-400 flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span className="line-clamp-1">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-gray-700/50 text-gray-400 rounded">
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
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center space-x-1"
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
                        className="flex-1 px-3 py-2 bg-gray-700/50 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-600/50 transition-all flex items-center justify-center space-x-1"
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
                        className="px-3 py-2 bg-gray-700/50 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-600/50 transition-all flex items-center justify-center"
                      >
                        <FileText className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  title?: string;
  subtitle?: string;
}

const Projects = ({
  title = 'Projects',
  subtitle = 'Systems I have built, with an honest note on what you can see live, read in code, or what stays private'
}: ProjectsProps) => {
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

  return (
    <section id="projects" className="py-24 bg-section/50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-cyan to-primary-blue mx-auto mb-6"></div>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {subtitle}
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
                        ? 'bg-gradient-to-r from-primary-cyan to-primary-blue text-white shadow-lg shadow-primary-cyan/30'
                        : 'bg-card/50 text-muted hover:text-ink hover:bg-line/50 border border-line'
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
                  className="w-full px-4 py-2 pl-10 bg-card/50 border border-line rounded-lg text-body placeholder-subtle focus:outline-none focus:border-primary-cyan transition-colors"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-subtle" />
              </div>
            </div>

            <div className="text-sm text-muted">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { Briefcase, Calendar } from 'lucide-react';
import { experiences } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-section">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-cyan to-primary-blue mx-auto"></div>
          </div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="relative pl-8 pb-8 border-l-2 border-primary-cyan/30 last:pb-0"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary-cyan to-primary-blue border-4 border-section"></div>

                <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-line hover:border-primary-cyan/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <h3 className="text-2xl font-semibold text-ink mb-1">{experience.title}</h3>
                      <div className="flex items-center space-x-2 text-primary-cyan">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{experience.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-muted text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-muted mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-body flex items-start">
                          <span className="text-primary-cyan mr-3 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-primary-cyan/10 text-primary-cyan rounded-lg border border-primary-cyan/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

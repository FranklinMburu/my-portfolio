import { Briefcase, Calendar } from 'lucide-react';
import { experiences } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="relative pl-8 pb-8 border-l-2 border-cyan-500/30 last:pb-0"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-4 border-gray-900"></div>

                <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-1">{experience.title}</h3>
                      <div className="flex items-center space-x-2 text-cyan-400">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{experience.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-gray-300 flex items-start">
                          <span className="text-cyan-400 mr-3 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20"
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

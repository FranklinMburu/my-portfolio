import { Brain, Server, Wrench } from 'lucide-react';
import { skills } from '../data/skills';

const iconMap = {
  Brain,
  Server,
  Wrench
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive toolkit for building intelligent, scalable systems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => {
              const IconComponent = iconMap[skillGroup.icon as keyof typeof iconMap];

              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{skillGroup.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1.5 text-sm bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

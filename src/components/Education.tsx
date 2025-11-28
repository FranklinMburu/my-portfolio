import { GraduationCap, Award } from 'lucide-react';

const Education = () => {
  const education = [
    {
      institution: 'Moringa School',
      degree: 'Software Development Diploma',
      period: '2023',
      description: 'Comprehensive training in full-stack development, software engineering principles, and modern development practices.'
    },
    {
      institution: 'KCSE',
      degree: 'A in Computer Studies',
      period: '2022',
      description: 'Excelled in computer science fundamentals, programming, and digital technologies.'
    }
  ];

  return (
    <section id="education" className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Education & Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{edu.degree}</h3>
                    <p className="text-cyan-400 font-medium">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.period}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm border border-gray-700 text-center">
            <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Continuous Learning</h3>
            <p className="text-gray-400">
              Actively pursuing advanced certifications in AI/ML and cloud technologies to stay at the forefront of innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

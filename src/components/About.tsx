import { Code2, Brain, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Multi-layer AI orchestration, autonomous reasoning pipelines, and production-grade NLP systems'
    },
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Production-grade backend systems with FastAPI, Django, Flask, and modern frontend frameworks'
    },
    {
      icon: Zap,
      title: 'Real-World Impact',
      description: 'Deployed systems across schools, transport, trading, and agricultural sectors'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm an <span className="text-cyan-400 font-semibold">Applied AI Engineer</span> and{' '}
                <span className="text-blue-400 font-semibold">Full-Stack Developer</span> passionate about building
                intelligent systems that solve real-world problems.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                My expertise spans from multi-agent AI orchestration and RAG pipelines to production-grade backend
                systems. I've deployed solutions across diverse sectors including education, transport, trading,
                and agriculture.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Currently serving as <span className="text-green-400 font-semibold">Senior Head of ICT</span> at
                Stafford Schools, where I lead digital transformation initiatives and develop custom AI-powered
                educational solutions.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                    FK
                  </div>
                  <div className="text-xl font-semibold text-white">Franklin Mburu</div>
                  <div className="text-gray-400">AI Engineer & Developer</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

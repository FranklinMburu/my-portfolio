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
    <section id="about" className="py-24 bg-section/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
              About Me
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-cyan to-primary-blue mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-body text-lg leading-relaxed">
                I'm an <span className="text-primary-cyan font-semibold">Applied AI Engineer</span> and{' '}
                <span className="text-primary-blue font-semibold">Full-Stack Developer</span> passionate about building
                intelligent systems that solve real-world problems.
              </p>
              <p className="text-body text-lg leading-relaxed">
                My expertise spans from multi-agent AI orchestration and RAG pipelines to production-grade backend
                systems. I've deployed solutions across diverse sectors including education, transport, trading,
                and agriculture.
              </p>
              <p className="text-body text-lg leading-relaxed">
                Currently serving as <span className="text-signal font-semibold">Software Engineer</span> at
                <span className="text-signal font-semibold"> United Legal Group</span>, building scalable multi-tenant CRM systems with emphasis on backend engineering, security, and performance. Previously, I served as Senior Head of ICT at Stafford Schools (2022–2025), where I led backend development and digital transformation, including M-Pesa payment and reconciliation systems.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-primary-blue/20 backdrop-blur-sm border border-primary-cyan/20 overflow-hidden">
                <img
                  src="/assets/images/franklin-mburu.jpg"
                  alt="Franklin Mburu"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan to-primary-blue opacity-40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center space-y-2">
                  <div className="text-xl font-semibold text-white animate-pulse drop-shadow-[0_0_15px_rgba(6,182,212,1)]">
                    Franklin Mburu
                  </div>
                  <div className="text-gray-200 text-sm drop-shadow-[0_0_10px_rgba(59,130,246,1)]">
                    AI Engineer & Developer
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-line hover:border-primary-cyan/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-cyan/20 to-primary-blue/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-ink mb-3">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

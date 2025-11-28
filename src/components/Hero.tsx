import { ArrowRight, Download, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-cyan-900/20"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <span className="text-cyan-400 text-sm font-medium">Available for Projects</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent leading-tight">
            Franklin Mburu Kamande
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-300">
            Applied AI Engineer & Full-Stack Developer
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Building intelligent systems that think, learn, and deliver real-world impact
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
            >
              <span>View Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => window.open('#', '_blank')}
              className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm rounded-lg font-semibold text-white border border-gray-700 hover:border-cyan-500 hover:bg-gray-700/50 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm rounded-lg font-semibold text-white border border-gray-700 hover:border-green-500 hover:bg-gray-700/50 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Me</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">10+</div>
              <div className="text-sm text-gray-400">Production Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">100+</div>
              <div className="text-sm text-gray-400">GitHub Repos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">1 Year</div>
              <div className="text-sm text-gray-400">ICT Leadership</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

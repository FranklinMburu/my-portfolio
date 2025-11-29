import { ArrowRight, Download, Mail } from 'lucide-react';
import SkillsSection from './SkillsSection';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background-dark px-4 sm:px-6 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark to-accent-purple/20"></div>

      <div className="absolute inset-0 opacity-20 hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary-cyan rounded-full filter blur-[96px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary-blue rounded-full filter blur-[96px] animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-cyan rounded-full animate-twinkle hidden sm:block"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto text-center">
        <div className="inline-block px-3 py-2 mb-6 rounded-full bg-primary-cyan/10 border border-primary-cyan/20">
          <span className="text-primary-cyan text-xs sm:text-sm font-medium">Available for Projects</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent leading-tight animate-pulse-once shadow-glass">
          Franklin Mburu Kamande
        </h1>

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-text-gray">
          Applied AI Engineer & Full-Stack Developer
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-text-gray mb-8 max-w-xl mx-auto leading-relaxed">
          Building intelligent systems that think, learn, and deliver real-world impact
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('projects')}
            className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-lg font-semibold text-text-white hover:shadow-lg hover:shadow-primary-cyan/50 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => window.open('#', '_blank')}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-background-dark/50 backdrop-blur-sm rounded-lg font-semibold text-text-white border border-background-dark hover:border-primary-cyan hover:bg-background-dark/70 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Download CV</span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-background-dark/50 backdrop-blur-sm rounded-lg font-semibold text-text-white border border-background-dark hover:border-accent-purple hover:bg-background-dark/70 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Contact Me</span>
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-cyan mb-1">10+</div>
            <div className="text-xs sm:text-sm md:text-base text-text-gray">Production Projects</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-blue mb-1">100+</div>
            <div className="text-xs sm:text-sm md:text-base text-text-gray">GitHub Repos</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-purple mb-1">1 Year</div>
            <div className="text-xs sm:text-sm md:text-base text-text-gray">ICT Leadership</div>
          </div>
        </div>

        <SkillsSection />
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-text-gray rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-primary-cyan rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

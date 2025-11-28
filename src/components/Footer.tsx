import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/franklinmburu' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/franklinmburu' }
  ];

  return (
    <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Franklin Mburu
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Applied AI Engineer & Full-Stack Developer building intelligent systems that deliver real-world impact.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:franklinmburu05@gmail.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>franklinmburu05@gmail.com</span>
              </a>
              <a
                href="tel:+254733321677"
                className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+254 733 321 677</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 hover:scale-110 transition-all group"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Franklin Mburu Kamande. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

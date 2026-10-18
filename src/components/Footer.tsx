import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/franklinmburu' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/franklin-mburu' }
  ];

  return (
    <footer className="bg-section/50 backdrop-blur-lg border-t border-line/60">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent mb-4">
              Franklin Mburu
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              Applied AI Engineer & Full-Stack Developer building intelligent systems that deliver real-world impact.
            </p>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:franklinmburu05@gmail.com"
                className="flex items-center space-x-3 text-muted hover:text-primary-cyan transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>franklinmburu05@gmail.com</span>
              </a>
              <div className="flex items-center space-x-3 text-muted text-sm">
                <Phone className="w-4 h-4" />
                <span>+254 718 *** 677</span>
              </div>
              <div className="flex items-center space-x-3 text-muted text-sm">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card/50 hover:bg-line/50 hover:scale-110 transition-all group"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 text-muted group-hover:text-primary-cyan transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-line/60 text-center">
          <p className="text-subtle text-sm">
            © {currentYear} Franklin Mburu Kamande. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

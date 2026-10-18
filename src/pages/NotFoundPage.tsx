import { ArrowRight, Home } from 'lucide-react';
import Link from '../components/Link';
import { useDocumentTitle } from '../lib/router';

const NotFoundPage = () => {
  useDocumentTitle('Page not found - Franklin Mburu Kamande');
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background-dark px-6 pt-[var(--header-h)]">
      <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark to-accent-purple/20"></div>
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-primary-cyan/20 rounded-full blur-[96px]"></div>
      <div className="relative text-center max-w-lg">
        <p className="text-7xl md:text-8xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-semibold text-ink mb-3">This page doesn't exist</h1>
        <p className="text-muted mb-8">The link may be old, or the page may have moved. Everything is reachable from the home page.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-cyan/50 transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
          >
            <Home className="w-5 h-5" />
            <span>Back home</span>
          </Link>
          <Link
            to="/projects"
            className="group px-6 py-3 bg-card/50 rounded-lg font-semibold text-ink border border-line hover:border-primary-cyan transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
          >
            <span>See projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;

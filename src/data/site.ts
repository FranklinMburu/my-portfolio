export const CV_PATH = '/assets/images/Franklin_Mburu_Kamande_Backend_Developer_CV.pdf';
export const CV_FILENAME = 'Franklin_Mburu_Kamande_Backend_Developer_CV.pdf';

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

/** Old single-page anchors mapped to their new pages, so shared links keep working. */
export const legacyHashRoutes: Record<string, string> = {
  '#home': '/',
  '#about': '/about',
  '#skills': '/about#skills',
  '#experience': '/about#experience',
  '#education': '/about#education',
  '#projects': '/projects',
  '#contact': '/contact'
};

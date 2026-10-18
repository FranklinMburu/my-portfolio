export interface Project {
  id: string;
  title: string;
  description: string;
  achievements: string[];
  techStack: string[];
  category: 'AI/ML' | 'Backend' | 'Full-Stack' | 'Automation';
  /**
   * Honest evidence status:
   * - Live: a working public deployment is linked
   * - Public code: the source code is publicly linked
   * - Hackathon: built during a hackathon; public code linked
   * - Private: source and deployment are not public
   * - In Development: still being built
   */
  status: 'Live' | 'Public code' | 'Hackathon' | 'Private' | 'In Development';
  /** Shown on the Home page */
  featured?: boolean;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

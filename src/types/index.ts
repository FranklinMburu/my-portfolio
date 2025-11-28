export interface Project {
  id: string;
  title: string;
  description: string;
  achievements: string[];
  techStack: string[];
  category: 'AI/ML' | 'Backend' | 'Full-Stack' | 'Automation';
  status: 'Production' | 'In Development' | 'Private';
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

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
  /** URL segment for /projects/:slug; set when the project has a case study */
  slug?: string;
  caseStudy?: CaseStudy;
}

export type DiagramNodeKind = 'io' | 'core' | 'ai' | 'human' | 'gate' | 'stop';

export interface DiagramNode {
  id: string;
  label: string;
  /** Short second line */
  sub?: string;
  kind?: DiagramNodeKind;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  /** A failure or fallback path */
  dashed?: boolean;
}

export interface Diagram {
  title: string;
  /** One sentence under the diagram */
  caption: string;
  /** Rows from top to bottom; nodes in a row sit side by side */
  rows: DiagramNode[][];
  edges: DiagramEdge[];
}

export interface CaseStudyDecision {
  title: string;
  chose: string;
  rejected: string;
  why: string;
}

export interface CaseStudy {
  /** One line under the title */
  summary: string;
  role: string;
  context: string;
  year: string;
  problem: string[];
  architecture: string[];
  diagrams: Diagram[];
  decisions: CaseStudyDecision[];
  results: string[];
  limits: string[];
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

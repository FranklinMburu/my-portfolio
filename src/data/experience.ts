import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    title: 'Senior Head of ICT',
    company: 'Stafford Schools',
    period: 'January 2024 – 2025',
    achievements: [
      'Led digital transformation initiatives across multiple school campuses',
      'Implemented AI-powered learning management systems',
      'Managed IT infrastructure and security protocols',
      'Trained staff on modern educational technology tools',
      'Developed custom solutions for administrative automation'
    ],
    technologies: [
      'Python',
      'Django',
      'MySQL',
      'Cloud Services',
      'Network Administration'
    ]
  },
  {
    title: 'Software Engineer – Multi-Tenant Enterprise CRM',
    company: 'United Legal Group',
    period: 'October 2025 – Present',
    achievements: [
      'Backend engineer on production multi-tenant CRM serving multiple business clients',
      'Designed and maintained Django REST APIs with PostgreSQL, enforcing strict tenant data isolation and secure access boundaries',
      'Implemented and enforced role-based access control (RBAC) across tenant boundaries with permission policies and validation rules',
      'Built and maintained service-layer business logic and validation pipelines for stateful workflows',
      'Improved API reliability through consistent error-handling standards, structured logging, and defensive validation',
      'Worked in Docker-based environments and contributed to cloud-deployed production configuration practices',
      'Assisted with query optimization and performance improvements in high-usage modules',
      'Collaborated in disciplined remote workflows: PR reviews, branching strategy, code quality checks, and documentation',
      'Strengthened tenant-level security and access boundaries',
      'Improved onboarding clarity through documentation and environment standardization',
      'Reduced recurring configuration issues through structured setup guides and repeatable environments'
    ],
    technologies: [
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'Python',
      'Docker',
      'RBAC',
      'Cloud Services',
      'Git'
    ]
  }
];

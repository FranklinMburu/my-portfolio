import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    title: 'Software Engineer – Multi-Tenant Enterprise CRM',
    company: 'United Legal Group',
    period: 'October 2025 – Present · Full-time',
    achievements: [
      'Build and maintain Django REST APIs backed by PostgreSQL for a production multi-tenant CRM serving multiple business clients, with a Vue frontend.',
      'Implement tenant data isolation, JWT authentication, role-based access control (RBAC), and validation rules to protect data across tenant boundaries.',
      'Build service-layer business logic and validation pipelines for stateful business workflows, including HR document management with PDF upload and viewing.',
      'Improve API reliability through consistent error handling, structured logging, defensive validation, and contributions to query optimisation in high-usage modules.',
      'Standardise development environments and document setup procedures to reduce recurring configuration issues and support onboarding within a Docker-based, pull-request-reviewed remote workflow.'
    ],
    technologies: [
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'Python',
      'Vue',
      'Docker',
      'JWT',
      'RBAC',
      'Git'
    ]
  },
  {
    title: 'Senior Head of ICT',
    company: 'Stafford Schools',
    period: 'October 2022 – 2025',
    achievements: [
      'Led backend-heavy system development and digital transformation for school administration and business workflows using Django, FastAPI, and PHP.',
      'Designed and deployed secure REST APIs for internal school systems.',
      'Integrated M-Pesa STK Push payments with callback verification and automated reconciliation, replacing manual payment verification.',
      'Built structured reporting and validation workflows to improve financial-reporting accuracy and payment traceability.',
      'Managed PostgreSQL and MySQL databases, including schema optimisation and performance tuning.',
      'Managed IT infrastructure and security protocols',
      'Trained staff on modern educational technology tools'
    ],
    technologies: [
      'Python',
      'Django',
      'FastAPI',
      'PHP',
      'PostgreSQL',
      'MySQL',
      'M-Pesa',
      'Network Administration'
    ]
  }
];

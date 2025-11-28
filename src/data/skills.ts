import { Skill } from '../types';

export const skills: Skill[] = [
  {
    category: 'AI & Machine Learning',
    icon: 'Brain',
    items: [
      'PyTorch',
      'TensorFlow',
      'Hugging Face Transformers',
      'LangChain',
      'RAG Pipelines',
      'Vector DBs (ChromaDB)',
      'Multi-agent Systems',
      'Memory Systems'
    ]
  },
  {
    category: 'Backend & Full-Stack',
    icon: 'Server',
    items: [
      'Python (FastAPI, Django, Flask)',
      'JavaScript (React, Node.js)',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'SQLite',
      'JWT',
      'RBAC',
      'REST API Design',
      'Audit Logging'
    ]
  },
  {
    category: 'DevOps & Tools',
    icon: 'Wrench',
    items: [
      'Docker',
      'Linux',
      'Git',
      'Postman',
      'CI/CD',
      'n8n Automation',
      'Mpesa Integration'
    ]
  }
];

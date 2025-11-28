import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI Trading Agent (ICT/SMC Strategy)',
    description: 'Multi-layer AI reasoning system with GPT-5 orchestration for real-time market analysis. Implements autonomous decision-making with risk management protocols.',
    achievements: [
      'Multi-agent orchestration with adaptive reasoning',
      'Real-time market sentiment analysis',
      'Advanced risk management system'
    ],
    techStack: ['Python', 'FastAPI', 'GPT-5', 'Multi-agent Systems', 'WebSocket'],
    category: 'AI/ML',
    status: 'In Development',
    image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Full-Stack Supplier Inventory System',
    description: 'Enterprise inventory management with AI-powered stock prediction and automated reordering. Features JWT authentication and role-based access control.',
    achievements: [
      'AI reasoning for stock optimization',
      'Real-time inventory tracking',
      'Multi-role permission system'
    ],
    techStack: ['Flask', 'React', 'PostgreSQL', 'JWT', 'RBAC', 'AI'],
    category: 'Full-Stack',
    status: 'Production',
    image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: '#'
  },
  {
    id: '3',
    title: 'AI Reasoning & Memory Pipeline',
    description: 'Advanced RAG pipeline with state tracking and adaptive execution. Integrates ChromaDB for persistent memory and LangChain for orchestration.',
    achievements: [
      'Semantic search with vector embeddings',
      'Contextual memory management',
      'Multi-turn conversation handling'
    ],
    techStack: ['Python', 'ChromaDB', 'LangChain', 'RAG', 'Transformers'],
    category: 'AI/ML',
    status: 'Production',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    title: 'Movers Transport System',
    description: 'End-to-end transport management with Mpesa STK Push integration. Automated driver assignment and real-time tracking capabilities.',
    achievements: [
      'Seamless Mpesa payment integration',
      'Intelligent driver-vehicle matching',
      'Real-time booking management'
    ],
    techStack: ['FastAPI', 'React', 'Mpesa API', 'SQLite', 'JWT'],
    category: 'Full-Stack',
    status: 'Production',
    image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#'
  },
  {
    id: '5',
    title: 'SmartFarm Dairy Tracker',
    description: 'Comprehensive dairy farm management with role-based CRUD operations and analytics dashboard for production insights.',
    achievements: [
      'Multi-user role management',
      'Production analytics dashboard',
      'Automated report generation'
    ],
    techStack: ['Django', 'MySQL', 'Bootstrap', 'Chart.js'],
    category: 'Backend',
    status: 'Production',
    image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    title: 'School Result Management System',
    description: 'Multi-user academic management system with automated grading, report generation, and parent portal access.',
    achievements: [
      'Automated grade calculations',
      'Parent-teacher communication portal',
      'Performance analytics'
    ],
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    category: 'Full-Stack',
    status: 'Production',
    image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '7',
    title: 'Advanced NLP Pipeline',
    description: 'Production-grade natural language processing system with custom transformers and fine-tuned models for domain-specific tasks.',
    achievements: [
      'Custom model fine-tuning',
      'Multi-language support',
      'Real-time inference optimization'
    ],
    techStack: ['PyTorch', 'Transformers', 'FastAPI', 'Docker'],
    category: 'AI/ML',
    status: 'Private',
    image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '8',
    title: 'Automated Workflow System',
    description: 'N8n-powered automation platform integrating multiple services for seamless business process automation.',
    achievements: [
      'Multi-service integration',
      'Custom workflow templates',
      'Error handling & retry logic'
    ],
    techStack: ['n8n', 'Node.js', 'PostgreSQL', 'REST API'],
    category: 'Automation',
    status: 'Production',
    image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

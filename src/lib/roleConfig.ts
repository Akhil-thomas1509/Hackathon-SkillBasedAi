export interface RoleConfig {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  requiredSkills: string[];
  criticalSkills: string[];
  bonusSkills: string[];
  categories: {
    name: string;
    skills: string[];
  }[];
  recommendationTemplates: {
    learn: string[];
    build: string[];
    improve: string[];
  };
}

export const ROLE_CONFIGS: Record<string, RoleConfig> = {
  'software-engineer': {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Build and maintain software systems and applications. Work on scalable backend services, APIs, and cloud infrastructure.',
    category: 'Engineering',
    difficulty: 'Entry-Mid',
    requiredSkills: ['Python', 'Git', 'Data Structures', 'Docker', 'AWS', 'System Design'],
    criticalSkills: ['Python', 'Git', 'Data Structures'],
    bonusSkills: ['CI/CD', 'REST APIs', 'Testing', 'Microservices', 'TypeScript', 'Node.js'],
    categories: [
      {
        name: 'Programming',
        skills: ['Python']
      },
      {
        name: 'CS Fundamentals',
        skills: ['Data Structures', 'System Design']
      },
      {
        name: 'Cloud & DevOps',
        skills: ['Docker', 'AWS', 'Git']
      }
    ],
    recommendationTemplates: {
      learn: [
        'Master Docker containerization and learn to orchestrate multi-container applications',
        'Study AWS cloud fundamentals and earn the Cloud Practitioner certification',
        'Deepen your understanding of system design patterns and scalability principles',
        'Learn advanced Git workflows and branching strategies for team collaboration'
      ],
      build: [
        'Build a full-stack portfolio project with Docker deployment on AWS',
        'Create a microservices architecture with containerized services',
        'Develop a RESTful API with proper authentication and database integration',
        'Build a CI/CD pipeline that automatically deploys your applications'
      ],
      improve: [
        'Practice data structures and algorithms on LeetCode or HackerRank',
        'Contribute to open-source projects to gain real-world collaboration experience',
        'Write comprehensive unit and integration tests for your projects',
        'Document your code and projects professionally on GitHub'
      ]
    }
  },
  'data-scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze data and build predictive models. Transform complex datasets into actionable business insights.',
    category: 'Data',
    difficulty: 'Mid',
    requiredSkills: ['Python', 'SQL', 'Statistics', 'Pandas', 'Machine Learning', 'Data Visualization'],
    criticalSkills: ['Python', 'SQL', 'Statistics'],
    bonusSkills: ['TensorFlow', 'PyTorch', 'Tableau', 'R', 'Scikit-learn', 'Deep Learning'],
    categories: [
      {
        name: 'Programming',
        skills: ['Python', 'SQL']
      },
      {
        name: 'Data Analysis',
        skills: ['Pandas', 'Statistics', 'Data Visualization']
      },
      {
        name: 'Machine Learning',
        skills: ['Machine Learning']
      }
    ],
    recommendationTemplates: {
      learn: [
        'Strengthen your SQL skills with complex queries and database optimization',
        'Study statistical concepts including hypothesis testing and regression analysis',
        'Learn machine learning fundamentals and model evaluation techniques',
        'Master data visualization principles using Matplotlib, Seaborn, or Tableau'
      ],
      build: [
        'Build an end-to-end machine learning project from data collection to deployment',
        'Create a data analysis portfolio with Jupyter notebooks and visualizations',
        'Develop a predictive model for a real-world problem with proper validation',
        'Build an interactive dashboard to showcase data insights'
      ],
      improve: [
        'Practice feature engineering and data preprocessing techniques',
        'Learn to communicate technical findings to non-technical stakeholders',
        'Improve your understanding of model interpretability and bias detection',
        'Participate in Kaggle competitions to apply your skills'
      ]
    }
  },
  'cybersecurity-analyst': {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect systems and networks from cyber threats. Monitor security events and respond to incidents.',
    category: 'Security',
    difficulty: 'Entry-Mid',
    requiredSkills: ['Networking', 'Linux', 'Python', 'Security Fundamentals', 'Incident Response', 'Threat Analysis'],
    criticalSkills: ['Linux', 'Networking', 'Security Fundamentals'],
    bonusSkills: ['SIEM', 'Penetration Testing', 'Cryptography', 'Firewall', 'OWASP'],
    categories: [
      {
        name: 'Security Fundamentals',
        skills: ['Security Fundamentals', 'Threat Analysis', 'Incident Response']
      },
      {
        name: 'Technical Skills',
        skills: ['Linux', 'Networking', 'Python']
      }
    ],
    recommendationTemplates: {
      learn: [
        'Master Linux command line, file permissions, and system administration',
        'Study networking fundamentals including TCP/IP, DNS, and HTTP protocols',
        'Learn security fundamentals and the OWASP Top 10 vulnerabilities',
        'Understand incident response frameworks and procedures'
      ],
      build: [
        'Set up a home security lab with vulnerable VMs for practice',
        'Build a log analysis tool to detect security threats',
        'Create a network monitoring dashboard using open-source tools',
        'Document a complete incident response plan for a hypothetical breach'
      ],
      improve: [
        'Practice with Capture The Flag (CTF) challenges',
        'Learn scripting for security automation with Python',
        'Study threat intelligence and malware analysis basics',
        'Get hands-on with security tools like Wireshark and Nmap'
      ]
    }
  },
  'frontend-developer': {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Build responsive user interfaces and web experiences. Create elegant, accessible, and performant applications.',
    category: 'Engineering',
    difficulty: 'Entry',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'UI/UX Fundamentals'],
    criticalSkills: ['HTML', 'CSS', 'JavaScript'],
    bonusSkills: ['Next.js', 'Tailwind', 'Redux', 'Testing', 'Git'],
    categories: [
      {
        name: 'Core Web',
        skills: ['HTML', 'CSS', 'JavaScript']
      },
      {
        name: 'Modern Frameworks',
        skills: ['TypeScript', 'React']
      },
      {
        name: 'Design',
        skills: ['UI/UX Fundamentals']
      }
    ],
    recommendationTemplates: {
      learn: [
        'Master TypeScript to write more maintainable and type-safe code',
        'Study UI/UX fundamentals and accessibility best practices',
        'Learn modern CSS including Flexbox, Grid, and responsive design',
        'Understand React hooks, state management, and component composition'
      ],
      build: [
        'Create a fully responsive portfolio website with modern design',
        'Build a complex React application with routing and state management',
        'Develop an accessible web app following WCAG guidelines',
        'Create reusable component libraries with Storybook documentation'
      ],
      improve: [
        'Optimize your applications for performance and SEO',
        'Practice with design systems and component-driven development',
        'Learn animation and micro-interactions for better UX',
        'Write end-to-end tests for your frontend applications'
      ]
    }
  },
  'cloud-engineer': {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Build and manage scalable cloud infrastructure. Deploy and maintain production systems on cloud platforms.',
    category: 'Cloud & DevOps',
    difficulty: 'Mid',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Networking', 'CI/CD'],
    criticalSkills: ['AWS', 'Docker', 'Linux'],
    bonusSkills: ['Terraform', 'Python', 'Ansible', 'Jenkins', 'Monitoring'],
    categories: [
      {
        name: 'Cloud Platforms',
        skills: ['AWS']
      },
      {
        name: 'Containerization',
        skills: ['Docker', 'Kubernetes']
      },
      {
        name: 'Infrastructure',
        skills: ['Linux', 'Networking', 'CI/CD']
      }
    ],
    recommendationTemplates: {
      learn: [
        'Master AWS core services including EC2, S3, RDS, and Lambda',
        'Learn Kubernetes for container orchestration and management',
        'Study infrastructure as code with Terraform or CloudFormation',
        'Understand CI/CD pipelines and deployment automation'
      ],
      build: [
        'Deploy a multi-tier application on AWS with auto-scaling',
        'Create a complete CI/CD pipeline for automated deployments',
        'Build a Kubernetes cluster and deploy containerized applications',
        'Implement infrastructure as code for a full application stack'
      ],
      improve: [
        'Learn monitoring and logging with CloudWatch or Prometheus',
        'Practice disaster recovery and backup strategies',
        'Study security best practices for cloud infrastructure',
        'Automate infrastructure tasks with scripts and tools'
      ]
    }
  },
  'ai-ml-engineer': {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    description: 'Design and deploy machine learning systems. Build intelligent applications using modern AI frameworks.',
    category: 'AI & ML',
    difficulty: 'Mid-Senior',
    requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Structures', 'Statistics', 'MLOps'],
    criticalSkills: ['Python', 'Machine Learning', 'Statistics'],
    bonusSkills: ['Deep Learning', 'NLP', 'Computer Vision', 'Docker', 'AWS'],
    categories: [
      {
        name: 'Programming & CS',
        skills: ['Python', 'Data Structures']
      },
      {
        name: 'Machine Learning',
        skills: ['Machine Learning', 'TensorFlow', 'PyTorch', 'Statistics']
      },
      {
        name: 'Production',
        skills: ['MLOps']
      }
    ],
    recommendationTemplates: {
      learn: [
        'Master deep learning architectures and training techniques',
        'Study MLOps practices for model deployment and monitoring',
        'Learn advanced statistics and probability for ML',
        'Understand model optimization and hyperparameter tuning'
      ],
      build: [
        'Build and deploy an end-to-end ML pipeline in production',
        'Create a deep learning project in computer vision or NLP',
        'Develop an ML model with proper versioning and monitoring',
        'Build a real-time ML inference API with scalability'
      ],
      improve: [
        'Practice with large-scale datasets and distributed training',
        'Learn about model interpretability and fairness',
        'Study cutting-edge ML research papers and implement them',
        'Contribute to open-source ML projects and frameworks'
      ]
    }
  }
};

export function getRoleConfigByTitle(title: string): RoleConfig | undefined {
  return Object.values(ROLE_CONFIGS).find(config => config.title === title);
}

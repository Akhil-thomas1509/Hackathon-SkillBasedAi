const SKILL_DICTIONARY: Record<string, string[]> = {
  'Programming': [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Rust',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'C'
  ],
  'Web Development': [
    'HTML', 'CSS', 'React', 'Vue', 'Angular', 'Node.js', 'Next.js', 'Express',
    'Django', 'Flask', 'Spring', 'ASP.NET', 'jQuery', 'Redux', 'Webpack', 'Tailwind'
  ],
  'Data & Analytics': [
    'SQL', 'Pandas', 'NumPy', 'Data Visualization', 'Statistics', 'Tableau',
    'Power BI', 'Excel', 'Matplotlib', 'Seaborn', 'D3.js'
  ],
  'AI & Machine Learning': [
    'Machine Learning', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP',
    'MLOps', 'Scikit-learn', 'Keras', 'Computer Vision', 'Neural Networks'
  ],
  'Cloud & DevOps': [
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform',
    'Jenkins', 'GitHub Actions', 'GitLab CI', 'Ansible', 'Linux', 'Bash'
  ],
  'Core CS': [
    'Data Structures', 'Algorithms', 'System Design', 'Operating Systems',
    'Computer Networks', 'OOP', 'Design Patterns', 'Distributed Systems'
  ],
  'Security': [
    'Security Fundamentals', 'Networking', 'Incident Response', 'Threat Analysis',
    'Penetration Testing', 'Cryptography', 'OWASP', 'Firewall', 'VPN', 'SIEM'
  ],
  'Tools & Practices': [
    'Git', 'Agile', 'Scrum', 'Testing', 'Unit Testing', 'Integration Testing',
    'UI/UX Fundamentals', 'REST APIs', 'GraphQL', 'Microservices', 'MongoDB',
    'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'
  ],
};

const SKILL_ALIASES: Record<string, string> = {
  'reactjs': 'React',
  'react.js': 'React',
  'nodejs': 'Node.js',
  'node': 'Node.js',
  'nextjs': 'Next.js',
  'next': 'Next.js',
  'vuejs': 'Vue',
  'vue.js': 'Vue',
  'angularjs': 'Angular',
  'amazon web services': 'AWS',
  'google cloud': 'GCP',
  'google cloud platform': 'GCP',
  'microsoft azure': 'Azure',
  'object oriented programming': 'OOP',
  'object-oriented programming': 'OOP',
  'containerization': 'Docker',
  'containerisation': 'Docker',
  'dockerized': 'Docker',
  'git version control': 'Git',
  'github': 'Git',
  'gitlab': 'Git',
  'sql server': 'SQL',
  'mysql': 'SQL',
  'postgresql': 'SQL',
  'postgres': 'SQL',
  'js': 'JavaScript',
  'ts': 'TypeScript',
  'k8s': 'Kubernetes',
  'tf': 'TensorFlow',
  'ml': 'Machine Learning',
  'dl': 'Deep Learning',
  'ai': 'Machine Learning',
  'artificial intelligence': 'Machine Learning',
  'cicd': 'CI/CD',
  'ci cd': 'CI/CD',
  'continuous integration': 'CI/CD',
  'continuous deployment': 'CI/CD',
  'natural language processing': 'NLP',
  'network security': 'Security Fundamentals',
  'cyber security': 'Security Fundamentals',
  'cybersecurity': 'Security Fundamentals',
  'restful apis': 'REST APIs',
  'rest api': 'REST APIs',
  'api development': 'REST APIs',
  'data structure': 'Data Structures',
  'algorithm': 'Algorithms',
  'full stack': 'Full Stack Development',
  'fullstack': 'Full Stack Development',
  'agile methodologies': 'Agile',
  'scrum master': 'Scrum',
};

const EVIDENCE_KEYWORDS = [
  'built', 'developed', 'deployed', 'implemented', 'designed', 'created',
  'architected', 'engineered', 'programmed', 'coded', 'maintained',
  'optimized', 'automated', 'integrated', 'migrated', 'refactored',
  'internship', 'intern', 'project', 'certification', 'certified',
  'experience', 'worked on', 'contributed'
];

const ALL_SKILLS = Object.values(SKILL_DICTIONARY).flat();

export function extractSkillsFromResume(resumeText: string): string[] {
  if (!resumeText || resumeText.trim().length === 0) {
    return [];
  }

  const normalizedText = normalizeText(resumeText);
  const detectedSkills: Map<string, number> = new Map();

  const sections = extractSections(resumeText);

  ALL_SKILLS.forEach((skill) => {
    const confidence = detectSkill(skill, normalizedText, sections);
    if (confidence > 0) {
      detectedSkills.set(skill, confidence);
    }
  });

  Object.entries(SKILL_ALIASES).forEach(([alias, canonicalSkill]) => {
    const pattern = new RegExp(`\\b${escapeRegex(alias)}\\b`, 'i');
    if (pattern.test(normalizedText) && ALL_SKILLS.includes(canonicalSkill)) {
      const currentConf = detectedSkills.get(canonicalSkill) || 0;
      detectedSkills.set(canonicalSkill, Math.max(currentConf, 1));
    }
  });

  const sortedSkills = Array.from(detectedSkills.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([skill]) => skill);

  return sortedSkills;
}

function normalizeText(text: string): string {
  return text
    .replace(/[•·○●]/g, ' ')
    .replace(/[|\/]/g, ' ')
    .replace(/,/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function extractSections(text: string): Map<string, string> {
  const sections = new Map<string, string>();
  const sectionHeaders = [
    'technical skills',
    'skills',
    'technologies',
    'tools',
    'programming languages',
    'languages',
    'frameworks',
    'projects',
    'experience',
    'work experience',
    'certifications',
    'education'
  ];

  const lines = text.split('\n');
  let currentSection = '';
  let sectionContent: string[] = [];

  lines.forEach((line) => {
    const lowerLine = line.toLowerCase().trim();

    const matchedHeader = sectionHeaders.find(header =>
      lowerLine.includes(header) && line.length < 50
    );

    if (matchedHeader) {
      if (currentSection && sectionContent.length > 0) {
        sections.set(currentSection, sectionContent.join(' '));
      }
      currentSection = matchedHeader;
      sectionContent = [];
    } else if (currentSection) {
      sectionContent.push(line);
    }
  });

  if (currentSection && sectionContent.length > 0) {
    sections.set(currentSection, sectionContent.join(' '));
  }

  return sections;
}

function detectSkill(skill: string, normalizedText: string, sections: Map<string, string>): number {
  const normalizedSkill = skill.toLowerCase();

  const patterns = [
    new RegExp(`\\b${escapeRegex(normalizedSkill)}\\b`, 'i'),
    new RegExp(`\\b${escapeRegex(normalizedSkill.replace(/\s+/g, '-'))}\\b`, 'i'),
    new RegExp(`\\b${escapeRegex(normalizedSkill.replace(/\s+/g, ''))}\\b`, 'i'),
    new RegExp(`\\b${escapeRegex(normalizedSkill.replace(/\./g, ''))}\\b`, 'i'),
  ];

  let confidence = 0;

  const skillsSection = sections.get('technical skills') || sections.get('skills') || '';
  const projectsSection = sections.get('projects') || '';
  const experienceSection = sections.get('experience') || sections.get('work experience') || '';

  patterns.forEach(pattern => {
    if (pattern.test(skillsSection)) {
      confidence = Math.max(confidence, 3);
    }
    if (pattern.test(projectsSection) || pattern.test(experienceSection)) {
      confidence = Math.max(confidence, 2);
    }
    if (pattern.test(normalizedText)) {
      confidence = Math.max(confidence, 1);
    }
  });

  if (confidence > 0) {
    const hasEvidence = EVIDENCE_KEYWORDS.some(keyword =>
      new RegExp(`${keyword}.*${escapeRegex(normalizedSkill)}|${escapeRegex(normalizedSkill)}.*${keyword}`, 'i').test(normalizedText)
    );
    if (hasEvidence) {
      confidence += 1;
    }
  }

  return confidence;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function generateSampleResume(): string {
  return `SARAH CHEN
Computer Science Student | University of California, Berkeley
Email: sarah.chen@berkeley.edu | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/sarahchen | GitHub: github.com/sarahchen

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | Expected Graduation: May 2025
GPA: 3.8/4.0
Relevant Coursework: Data Structures, Algorithms, Machine Learning, Operating Systems, Computer Networks

TECHNICAL SKILLS
Languages: Python, Java, JavaScript, TypeScript, SQL, C++
Frameworks & Libraries: React, Node.js, Express, Flask, Pandas, NumPy, TensorFlow
Tools & Technologies: Git, Docker, AWS, PostgreSQL, MongoDB, REST APIs, Agile
Data & Analytics: Data Visualization, Statistics, Machine Learning

PROJECTS
E-Commerce Platform | React, Node.js, PostgreSQL, Docker
• Built a full-stack e-commerce web application with user authentication and payment integration
• Implemented RESTful APIs using Express and PostgreSQL for data persistence
• Deployed the application using Docker containers on AWS EC2
• Technologies: React, Node.js, PostgreSQL, Docker, AWS

Machine Learning Image Classifier | Python, TensorFlow, Flask
• Developed a convolutional neural network to classify images with 92% accuracy
• Created a Flask API to serve predictions and integrated with a React frontend
• Processed and augmented dataset of 50,000+ images using NumPy and Pandas
• Technologies: Python, TensorFlow, Flask, NumPy, Pandas

EXPERIENCE
Software Engineering Intern | TechStart Inc. | June 2024 - August 2024
• Developed new features for a web application using React and TypeScript
• Collaborated with senior engineers using Git and Agile methodologies
• Wrote unit tests and integration tests to ensure code quality
• Participated in code reviews and contributed to system design discussions

Teaching Assistant - Introduction to Programming | UC Berkeley | January 2024 - Present
• Assist students in learning Python fundamentals and data structures
• Hold office hours and grade assignments for a class of 200+ students
• Create supplementary learning materials and coding exercises

CERTIFICATIONS & ACHIEVEMENTS
• AWS Certified Cloud Practitioner (2024)
• Dean's List (Fall 2023, Spring 2024)
• Hackathon Winner - Berkeley AI Hackathon (2024)`;
}

const SKILL_DICTIONARY: Record<string, string[]> = {
  'Programming': [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Rust',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB'
  ],
  'Web Development': [
    'HTML', 'CSS', 'React', 'Vue', 'Angular', 'Node.js', 'Next.js', 'Express',
    'Django', 'Flask', 'Spring', 'ASP.NET', 'jQuery', 'Redux', 'Webpack'
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
    'Penetration Testing', 'Cryptography', 'OWASP', 'Firewall', 'VPN'
  ],
  'Tools & Practices': [
    'Git', 'Agile', 'Scrum', 'Testing', 'Unit Testing', 'Integration Testing',
    'UI/UX Fundamentals', 'REST APIs', 'GraphQL', 'Microservices', 'MongoDB',
    'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'
  ],
};

const ALL_SKILLS = Object.values(SKILL_DICTIONARY).flat();

export function extractSkillsFromResume(resumeText: string): string[] {
  if (!resumeText || resumeText.trim().length === 0) {
    return [];
  }

  const normalizedText = resumeText.toLowerCase();
  const detectedSkills: Set<string> = new Set();

  ALL_SKILLS.forEach((skill) => {
    const normalizedSkill = skill.toLowerCase();

    const patterns = [
      new RegExp(`\\b${normalizedSkill}\\b`, 'i'),
      new RegExp(`\\b${normalizedSkill.replace(/\s+/g, '-')}\\b`, 'i'),
      new RegExp(`\\b${normalizedSkill.replace(/\s+/g, '')}\\b`, 'i'),
    ];

    const found = patterns.some(pattern => pattern.test(normalizedText));

    if (found) {
      detectedSkills.add(skill);
    }
  });

  const commonAbbreviations: Record<string, string> = {
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'k8s': 'Kubernetes',
    'tf': 'TensorFlow',
    'ml': 'Machine Learning',
    'dl': 'Deep Learning',
    'ai': 'Machine Learning',
    'db': 'SQL',
    'rdbms': 'SQL',
    'nosql': 'MongoDB',
    'cicd': 'CI/CD',
    'oop': 'OOP',
  };

  Object.entries(commonAbbreviations).forEach(([abbr, fullSkill]) => {
    const pattern = new RegExp(`\\b${abbr}\\b`, 'i');
    if (pattern.test(normalizedText) && ALL_SKILLS.includes(fullSkill)) {
      detectedSkills.add(fullSkill);
    }
  });

  return Array.from(detectedSkills).sort();
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

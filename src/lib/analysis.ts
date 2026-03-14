import { Job, UserProfile, AnalysisResult } from '../types';
import { calculateEnhancedScore, ScoreBreakdown } from './scoring';
import { getRoleConfigByTitle } from './roleConfig';

export async function analyzeProfile(
  job: Job,
  profile: UserProfile
): Promise<AnalysisResult> {
  const manualSkills = profile.selectedSkills || [];
  const extractedSkills = profile.extractedSkills || [];

  const allSkills = Array.from(new Set([...manualSkills, ...extractedSkills]));

  const matchedSkills = allSkills.filter((skill) =>
    job.required_skills.includes(skill)
  );

  const missingSkills = job.required_skills.filter(
    (skill) => !allSkills.includes(skill)
  );

  const scoreBreakdown = calculateEnhancedScore(job, allSkills, profile);

  const recommendations = await generateRecommendations(
    job,
    matchedSkills,
    missingSkills,
    profile,
    allSkills,
    scoreBreakdown
  );

  const insights = generateInsights(
    scoreBreakdown.totalScore,
    matchedSkills.length,
    missingSkills.length,
    extractedSkills.length,
    manualSkills.length
  );

  return {
    targetJob: job,
    matchScore: scoreBreakdown.totalScore,
    matchedSkills,
    missingSkills,
    recommendations,
    insights,
    extractedSkills,
    manualSkills,
    allSkills,
    scoreBreakdown,
  };
}

function generateInsights(
  score: number,
  matched: number,
  missing: number,
  extracted: number,
  manual: number
): string {
  const sourceInfo = extracted > 0
    ? ` (${extracted} from resume, ${manual} manually selected)`
    : '';

  if (score >= 80) {
    return `Excellent fit! You possess the majority of required skills${sourceInfo}. Focus on refining the ${missing} missing skill${missing !== 1 ? 's' : ''} to become a top candidate.`;
  } else if (score >= 60) {
    return `Strong foundation. You have ${matched} core skill${matched !== 1 ? 's' : ''}${sourceInfo} in place. Addressing the ${missing} missing skill${missing !== 1 ? 's' : ''} would significantly boost your candidacy.`;
  } else if (score >= 40) {
    return `Developing fit. You've built a decent base with ${matched} skill${matched !== 1 ? 's' : ''}${sourceInfo}. Strategic learning in the ${missing} gap area${missing !== 1 ? 's' : ''} will position you competitively.`;
  } else if (score >= 20) {
    return `Early stage. You have ${matched} relevant skill${matched !== 1 ? 's' : ''}${sourceInfo}. Focus on building proficiency in the ${missing} missing skill${missing !== 1 ? 's' : ''} through structured learning and projects.`;
  } else {
    return `Foundation building needed. This role requires significant skill development. Consider starting with the ${missing} fundamental skill${missing !== 1 ? 's' : ''} and building practical projects.`;
  }
}

async function generateRecommendations(
  job: Job,
  matchedSkills: string[],
  missingSkills: string[],
  profile: UserProfile,
  allSkills: string[],
  scoreBreakdown: ScoreBreakdown
): Promise<string[]> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-recommendations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          jobTitle: job.title,
          jobDescription: job.description,
          matchedSkills,
          missingSkills,
          resumeSummary: profile.resumeSummary,
          strengths: profile.strengths,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.recommendations && data.recommendations.length >= 3) {
        return data.recommendations;
      }
    }
  } catch (error) {
    console.log('AI recommendations unavailable, using enhanced fallback');
  }

  return getEnhancedFallbackRecommendations(job, missingSkills, allSkills, scoreBreakdown);
}

function getEnhancedFallbackRecommendations(
  job: Job,
  missingSkills: string[],
  _allSkills: string[],
  scoreBreakdown: ScoreBreakdown
): string[] {
  const roleConfig = getRoleConfigByTitle(job.title);

  if (roleConfig) {
    return buildRoleBasedRecommendations(roleConfig, missingSkills, scoreBreakdown.totalScore);
  }

  return getLegacyFallbackRecommendations(job, missingSkills);
}

function buildRoleBasedRecommendations(
  roleConfig: any,
  missingSkills: string[],
  score: number
): string[] {
  const recommendations: string[] = [];

  const templates = roleConfig.recommendationTemplates;

  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 2);
    topMissing.forEach(skill => {
      const skillRec = getSkillRecommendation(skill);
      if (skillRec) recommendations.push(skillRec);
    });
  }

  if (score >= 75) {
    if (templates.improve && templates.improve.length > 0) {
      recommendations.push(templates.improve[0]);
    }
    if (templates.build && templates.build.length > 0) {
      recommendations.push(templates.build[0]);
    }
  } else if (score >= 50) {
    if (templates.learn && templates.learn.length > 0) {
      recommendations.push(templates.learn[0]);
    }
    if (templates.build && templates.build.length > 0) {
      recommendations.push(templates.build[1] || templates.build[0]);
    }
  } else {
    if (templates.learn && templates.learn.length > 0) {
      recommendations.push(templates.learn[0]);
      if (templates.learn.length > 1) {
        recommendations.push(templates.learn[1]);
      }
    }
  }

  if (templates.improve && templates.improve.length > 1 && recommendations.length < 5) {
    recommendations.push(templates.improve[1]);
  }

  while (recommendations.length < 3 && templates.build && templates.build.length > 0) {
    const index = recommendations.length % templates.build.length;
    const rec = templates.build[index];
    if (!recommendations.includes(rec)) {
      recommendations.push(rec);
    } else {
      break;
    }
  }

  return recommendations.slice(0, 5);
}

function getLegacyFallbackRecommendations(job: Job, missingSkills: string[]): string[] {
  const recommendations: string[] = [];

  const skillMap: Record<string, string> = {
    'Python': 'Complete a Python fundamentals course and build 2-3 small projects like a web scraper or data analysis tool',
    'Java': 'Learn Java through object-oriented programming courses and build a backend REST API project',
    'JavaScript': 'Master JavaScript fundamentals and build interactive web applications to demonstrate proficiency',
    'TypeScript': 'Learn TypeScript by converting an existing JavaScript project and practice strong typing patterns',
    'React': 'Build 3-4 modern React applications with hooks, state management, and component composition',
    'Docker': 'Learn containerization basics and Dockerize your existing projects for deployment readiness',
    'Kubernetes': 'Study Kubernetes fundamentals and deploy a multi-container application to a local cluster',
    'AWS': 'Earn AWS Cloud Practitioner certification and deploy projects using EC2, S3, and Lambda',
    'Azure': 'Complete Azure Fundamentals training and deploy applications using Azure App Service',
    'GCP': 'Learn Google Cloud Platform basics and deploy projects using Cloud Run and Cloud Functions',
    'Git': 'Master Git workflows, branching strategies, and contribute to open-source projects on GitHub',
    'SQL': 'Practice SQL queries on real datasets and build a database-backed application',
    'Data Structures': 'Study common data structures and solve 50+ algorithmic problems on LeetCode or HackerRank',
    'Algorithms': 'Practice algorithmic thinking by solving problems and implementing classic algorithms from scratch',
    'System Design': 'Study scalability patterns and design 3-5 systems like a URL shortener, messaging app, or social feed',
    'Machine Learning': 'Complete an ML course and build 2-3 end-to-end ML projects with real datasets',
    'TensorFlow': 'Build deep learning projects using TensorFlow and deploy a trained model as a web service',
    'PyTorch': 'Learn PyTorch through hands-on projects in computer vision or natural language processing',
    'Pandas': 'Practice data manipulation with Pandas by analyzing multiple real-world datasets',
    'Statistics': 'Study statistical concepts and apply them to data analysis projects',
    'Data Visualization': 'Create compelling visualizations using tools like Matplotlib, Seaborn, or D3.js',
    'Networking': 'Study TCP/IP, DNS, and HTTP protocols, then set up and configure network infrastructure',
    'Linux': 'Become comfortable with Linux command line, shell scripting, and system administration tasks',
    'Security Fundamentals': 'Learn cybersecurity basics through OWASP Top 10 and secure coding practices',
    'Incident Response': 'Study incident response frameworks and practice with CTF challenges or security labs',
    'Threat Analysis': 'Learn threat modeling and practice analyzing security vulnerabilities in applications',
    'CI/CD': 'Set up automated deployment pipelines using GitHub Actions, Jenkins, or GitLab CI',
    'UI/UX Fundamentals': 'Study design principles and create user-friendly interfaces for your projects',
    'Testing': 'Write unit and integration tests for your projects using modern testing frameworks',
    'REST APIs': 'Build and document RESTful APIs following best practices and OpenAPI specifications',
    'GraphQL': 'Learn GraphQL by building an API and client application with efficient data fetching',
    'Node.js': 'Build backend services with Node.js and Express, focusing on asynchronous programming',
    'HTML': 'Master semantic HTML5 and accessibility best practices in web development',
    'CSS': 'Build responsive layouts using modern CSS including Flexbox, Grid, and animations',
    'MLOps': 'Learn ML deployment practices and build a complete ML pipeline from training to production',
  };

  missingSkills.slice(0, 5).forEach((skill) => {
    if (skillMap[skill]) {
      recommendations.push(skillMap[skill]);
    }
  });

  if (recommendations.length === 0) {
    recommendations.push(
      `Build practical projects that demonstrate proficiency in ${missingSkills.slice(0, 3).join(', ')}`,
      `Create a portfolio showcasing your work in ${job.category.toLowerCase()} to stand out to recruiters`,
      'Practice technical interviews and system design questions relevant to this role'
    );
  }

  if (job.title.toLowerCase().includes('engineer') || job.title.toLowerCase().includes('developer')) {
    if (recommendations.length < 5) {
      recommendations.push('Build a comprehensive portfolio project that showcases your end-to-end development skills');
    }
  }

  if (recommendations.length < 3) {
    recommendations.push(
      `Network with professionals in ${job.category} through LinkedIn and industry events`,
      'Consider contributing to open-source projects to gain real-world collaboration experience',
      'Create detailed project documentation to demonstrate your technical communication skills'
    );
  }

  return recommendations.slice(0, 5);
}

function getSkillRecommendation(skill: string): string | null {
  const skillMap: Record<string, string> = {
    'Python': 'Complete a Python fundamentals course and build 2-3 small projects like a web scraper or data analysis tool',
    'Java': 'Learn Java through object-oriented programming courses and build a backend REST API project',
    'JavaScript': 'Master JavaScript fundamentals and build interactive web applications to demonstrate proficiency',
    'TypeScript': 'Learn TypeScript by converting an existing JavaScript project and practice strong typing patterns',
    'React': 'Build 3-4 modern React applications with hooks, state management, and component composition',
    'Docker': 'Learn containerization basics and Dockerize your existing projects for deployment readiness',
    'Kubernetes': 'Study Kubernetes fundamentals and deploy a multi-container application to a local cluster',
    'AWS': 'Earn AWS Cloud Practitioner certification and deploy projects using EC2, S3, and Lambda',
    'Azure': 'Complete Azure Fundamentals training and deploy applications using Azure App Service',
    'GCP': 'Learn Google Cloud Platform basics and deploy projects using Cloud Run and Cloud Functions',
    'Git': 'Master Git workflows, branching strategies, and contribute to open-source projects on GitHub',
    'SQL': 'Practice SQL queries on real datasets and build a database-backed application',
    'Data Structures': 'Study common data structures and solve 50+ algorithmic problems on LeetCode or HackerRank',
    'Algorithms': 'Practice algorithmic thinking by solving problems and implementing classic algorithms from scratch',
    'System Design': 'Study scalability patterns and design 3-5 systems like a URL shortener, messaging app, or social feed',
    'Machine Learning': 'Complete an ML course and build 2-3 end-to-end ML projects with real datasets',
    'TensorFlow': 'Build deep learning projects using TensorFlow and deploy a trained model as a web service',
    'PyTorch': 'Learn PyTorch through hands-on projects in computer vision or natural language processing',
    'Pandas': 'Practice data manipulation with Pandas by analyzing multiple real-world datasets',
    'Statistics': 'Study statistical concepts and apply them to data analysis projects',
    'Data Visualization': 'Create compelling visualizations using tools like Matplotlib, Seaborn, or D3.js',
    'Networking': 'Study TCP/IP, DNS, and HTTP protocols, then set up and configure network infrastructure',
    'Linux': 'Become comfortable with Linux command line, shell scripting, and system administration tasks',
    'Security Fundamentals': 'Learn cybersecurity basics through OWASP Top 10 and secure coding practices',
    'Incident Response': 'Study incident response frameworks and practice with CTF challenges or security labs',
    'Threat Analysis': 'Learn threat modeling and practice analyzing security vulnerabilities in applications',
    'CI/CD': 'Set up automated deployment pipelines using GitHub Actions, Jenkins, or GitLab CI',
    'UI/UX Fundamentals': 'Study design principles and create user-friendly interfaces for your projects',
    'Testing': 'Write unit and integration tests for your projects using modern testing frameworks',
    'REST APIs': 'Build and document RESTful APIs following best practices and OpenAPI specifications',
    'GraphQL': 'Learn GraphQL by building an API and client application with efficient data fetching',
    'Node.js': 'Build backend services with Node.js and Express, focusing on asynchronous programming',
    'HTML': 'Master semantic HTML5 and accessibility best practices in web development',
    'CSS': 'Build responsive layouts using modern CSS including Flexbox, Grid, and animations',
    'MLOps': 'Learn ML deployment practices and build a complete ML pipeline from training to production',
  };

  return skillMap[skill] || null;
}

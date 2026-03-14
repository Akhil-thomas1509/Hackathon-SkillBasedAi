/*
  # Create Jobs Table for SkillBridge AI

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key) - Unique identifier for each job
      - `title` (text) - Job title (e.g., "Software Engineer")
      - `description` (text) - Brief job description
      - `category` (text) - Job category (e.g., "Engineering", "Data", "Security")
      - `difficulty` (text) - Difficulty level (e.g., "Entry", "Mid", "Senior")
      - `required_skills` (jsonb) - Array of required skills
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `jobs` table
    - Add policy for public read access (jobs are publicly viewable)

  3. Data
    - Seed initial job listings for hackathon demo
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  required_skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Jobs are publicly readable"
  ON jobs
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed job data
INSERT INTO jobs (title, description, category, difficulty, required_skills) VALUES
(
  'Software Engineer',
  'Build and maintain software systems and applications. Work on scalable backend services, APIs, and cloud infrastructure.',
  'Engineering',
  'Entry-Mid',
  '["Python", "Git", "Data Structures", "Docker", "AWS", "System Design"]'::jsonb
),
(
  'Data Scientist',
  'Analyze data and build predictive models. Transform complex datasets into actionable business insights.',
  'Data',
  'Mid',
  '["Python", "SQL", "Statistics", "Pandas", "Machine Learning", "Data Visualization"]'::jsonb
),
(
  'Cybersecurity Analyst',
  'Protect systems and networks from cyber threats. Monitor security events and respond to incidents.',
  'Security',
  'Entry-Mid',
  '["Networking", "Linux", "Python", "Security Fundamentals", "Incident Response", "Threat Analysis"]'::jsonb
),
(
  'Frontend Developer',
  'Build responsive user interfaces and web experiences. Create elegant, accessible, and performant applications.',
  'Engineering',
  'Entry',
  '["HTML", "CSS", "JavaScript", "TypeScript", "React", "UI/UX Fundamentals"]'::jsonb
),
(
  'Cloud Engineer',
  'Build and manage scalable cloud infrastructure. Deploy and maintain production systems on cloud platforms.',
  'Cloud & DevOps',
  'Mid',
  '["AWS", "Docker", "Kubernetes", "Linux", "Networking", "CI/CD"]'::jsonb
),
(
  'AI/ML Engineer',
  'Design and deploy machine learning systems. Build intelligent applications using modern AI frameworks.',
  'AI & ML',
  'Mid-Senior',
  '["Python", "Machine Learning", "TensorFlow", "PyTorch", "Data Structures", "Statistics", "MLOps"]'::jsonb
)
ON CONFLICT DO NOTHING;
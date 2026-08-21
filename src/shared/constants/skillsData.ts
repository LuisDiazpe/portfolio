import type { SkillGroup } from '@/domain/skill/Skill';

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: 'frontend',
    label: 'Frontend',
    skills: [
      { id: 'react',       name: 'React',        category: 'frontend', level: 'expert',       color: '#61dafb', years: 2 },
      { id: 'typescript',  name: 'TypeScript',   category: 'frontend', level: 'advanced',     color: '#3178c6', years: 2 },
      { id: 'javascript',  name: 'JavaScript',   category: 'frontend', level: 'expert',       color: '#f7df1e', years: 3 },
      { id: 'angular',     name: 'Angular',      category: 'frontend', level: 'advanced',     color: '#dd0031', years: 1 },
      { id: 'vuejs',       name: 'Vue.js',       category: 'frontend', level: 'advanced',     color: '#42b883', years: 1 },
      { id: 'tailwind',    name: 'Tailwind CSS', category: 'frontend', level: 'expert',       color: '#06b6d4', years: 2 },
      { id: 'css3',        name: 'CSS3',         category: 'frontend', level: 'expert',       color: '#1572b6', years: 3 },
      { id: 'html5',       name: 'HTML5',        category: 'frontend', level: 'expert',       color: '#e34f26', years: 3 },
    ],
  },
  {
    category: 'backend',
    label: 'Backend',
    skills: [
      { id: 'java',        name: 'Java',         category: 'backend', level: 'advanced',     color: '#f89820', years: 2 },
      { id: 'spring',      name: 'Spring Boot',  category: 'backend', level: 'advanced',     color: '#6db33f', years: 1 },
      { id: 'csharp',      name: 'C#',           category: 'backend', level: 'advanced',     color: '#9b4f96', years: 2 },
      { id: 'dotnet',      name: '.NET',         category: 'backend', level: 'advanced',     color: '#512bd4', years: 2 },
      { id: 'nodejs',      name: 'Node.js',      category: 'backend', level: 'advanced',     color: '#339933', years: 2 },
      { id: 'python',      name: 'Python',       category: 'backend', level: 'advanced',     color: '#3776ab', years: 2 },
      { id: 'rest-api',    name: 'REST APIs',    category: 'backend', level: 'expert',       color: '#00b4ff', years: 2 },
      { id: 'jwt',         name: 'JWT / Auth',   category: 'backend', level: 'advanced',     color: '#d63aff', years: 2 },
      { id: 'ddd',         name: 'DDD',          category: 'backend', level: 'advanced',     color: '#7c3aed', years: 2 },
    ],
  },
  {
    category: 'mobile',
    label: 'Mobile',
    skills: [
      { id: 'flutter',     name: 'Flutter',      category: 'mobile', level: 'advanced',     color: '#54c5f8', years: 1 },
      { id: 'dart',        name: 'Dart',         category: 'mobile', level: 'advanced',     color: '#0175c2', years: 1 },
      { id: 'kotlin',      name: 'Kotlin',       category: 'mobile', level: 'intermediate', color: '#7f52ff', years: 1 },
    ],
  },
  {
    category: 'database',
    label: 'Bases de datos',
    skills: [
      { id: 'mysql',       name: 'MySQL',        category: 'database', level: 'advanced',     color: '#4479a1', years: 3 },
      { id: 'sqlserver',   name: 'SQL Server',   category: 'database', level: 'intermediate', color: '#cc2927', years: 2 },
      { id: 'postgresql',  name: 'PostgreSQL',   category: 'database', level: 'intermediate', color: '#336791', years: 2 },
      { id: 'mongodb',     name: 'MongoDB',      category: 'database', level: 'intermediate', color: '#47a248', years: 2 },
      { id: 'sqlite',      name: 'SQLite',       category: 'database', level: 'intermediate', color: '#003b57', years: 2 },
      { id: 'firebase',    name: 'Firebase',     category: 'database', level: 'intermediate', color: '#ffca28', years: 2 },
    ],
  },
  {
    category: 'automation',
    label: 'Automatización',
    skills: [
      { id: 'n8n',         name: 'N8N',          category: 'automation', level: 'advanced',     color: '#ea4b71', years: 1 },
      { id: 'webhooks',    name: 'Webhooks',     category: 'automation', level: 'advanced',     color: '#00ffcc', years: 1 },
    ],
  },
  {
    category: 'iot',
    label: 'IoT & Embebidos',
    skills: [
      { id: 'arduino',     name: 'Arduino',      category: 'iot', level: 'advanced',     color: '#00979d', years: 3 },
      { id: 'cplusplus',   name: 'C++',          category: 'iot', level: 'intermediate', color: '#00599c', years: 2 },
    ],
  },
  {
    category: 'cloud',
    label: 'Cloud & Deploy',
    skills: [
      { id: 'vercel',      name: 'Vercel',       category: 'cloud', level: 'advanced',     color: '#ffffff', years: 2 },
      { id: 'cloudflare',  name: 'Cloudflare',   category: 'cloud', level: 'advanced',     color: '#f38020', years: 1 },
      { id: 'railway',     name: 'Railway',      category: 'cloud', level: 'advanced',     color: '#a78bfa', years: 1 },
      { id: 'render',      name: 'Render',       category: 'cloud', level: 'advanced',     color: '#46e3b7', years: 1 },
      { id: 'netlify',     name: 'Netlify',      category: 'cloud', level: 'advanced',     color: '#00c7b7', years: 2 },
      { id: 'aws',         name: 'AWS',          category: 'cloud', level: 'intermediate', color: '#ff9900', years: 1 },
      { id: 'azure',       name: 'Azure',        category: 'cloud', level: 'intermediate', color: '#0078d4', years: 1 },
    ],
  },
  {
    category: 'tools',
    label: 'Herramientas & DevOps',
    skills: [
      { id: 'git',         name: 'Git',          category: 'tools', level: 'expert',       color: '#f05032', years: 3 },
      { id: 'github',      name: 'GitHub',       category: 'tools', level: 'expert',       color: '#e2f4ff', years: 3 },
      { id: 'gitlab',      name: 'GitLab',       category: 'tools', level: 'advanced',     color: '#fc6d26', years: 2 },
      { id: 'cicd',        name: 'CI/CD',        category: 'tools', level: 'intermediate', color: '#00b4ff', years: 2 },
      { id: 'docker',      name: 'Docker',       category: 'tools', level: 'intermediate', color: '#2496ed', years: 1 },
      { id: 'jira',        name: 'Jira',         category: 'tools', level: 'intermediate', color: '#0052cc', years: 2 },
      { id: 'figma',       name: 'Figma',        category: 'tools', level: 'advanced',     color: '#f24e1e', years: 2 },
      { id: 'postman',     name: 'Postman',      category: 'tools', level: 'advanced',     color: '#ff6c37', years: 2 },
      { id: 'swagger',     name: 'Swagger',      category: 'tools', level: 'advanced',     color: '#85ea2d', years: 2 },
      { id: 'linux',       name: 'Linux',        category: 'tools', level: 'intermediate', color: '#fcc624', years: 2 },
      { id: 'scrum',       name: 'Scrum',        category: 'tools', level: 'advanced',     color: '#7c3aed', years: 3 },
    ],
  },
  {
    category: 'testing',
    label: 'Testing & QA',
    skills: [
      { id: 'junit',       name: 'JUnit',        category: 'testing', level: 'intermediate', color: '#25a162', years: 2 },
      { id: 'nunit',       name: 'NUnit',        category: 'testing', level: 'intermediate', color: '#17a0d6', years: 1 },
      { id: 'xunit',       name: 'xUnit',        category: 'testing', level: 'intermediate', color: '#9b59b6', years: 1 },
      { id: 'jest',        name: 'Jest',         category: 'testing', level: 'intermediate', color: '#c63d14', years: 2 },
      { id: 'tsjest',      name: 'ts-jest',      category: 'testing', level: 'intermediate', color: '#3178c6', years: 1 },
    ],
  },
];
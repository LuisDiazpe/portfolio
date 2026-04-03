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
      { id: 'html-css',    name: 'HTML5 / CSS3', category: 'frontend', level: 'expert',       color: '#e34f26', years: 3 },
    ],
  },
  {
    category: 'backend',
    label: 'Backend',
    skills: [
      { id: 'java',        name: 'Java',         category: 'backend', level: 'advanced',     color: '#f89820', years: 2 },
      { id: 'spring',      name: 'Spring Boot',  category: 'backend', level: 'advanced',     color: '#6db33f', years: 1 },
      { id: 'csharp',      name: 'C#',           category: 'backend', level: 'advanced',     color: '#9b4f96', years: 1 },
      { id: 'dotnet',      name: '.NET',         category: 'backend', level: 'intermediate', color: '#512bd4', years: 1 },
      { id: 'python',      name: 'Python',       category: 'backend', level: 'advanced',     color: '#3776ab', years: 2 },
      { id: 'cplusplus',   name: 'C++',          category: 'backend', level: 'intermediate', color: '#00599c', years: 2 },
      { id: 'rest-api',    name: 'REST APIs',    category: 'backend', level: 'expert',       color: '#00b4ff', years: 2 },
      { id: 'ddd',         name: 'DDD',          category: 'backend', level: 'advanced',     color: '#7c3aed', years: 1 },
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
      { id: 'mysql',       name: 'MySQL',        category: 'database', level: 'advanced',     color: '#4479a1', years: 2 },
      { id: 'sqlserver',   name: 'SQL Server',   category: 'database', level: 'intermediate', color: '#cc2927', years: 1 },
      { id: 'mongodb',     name: 'MongoDB',      category: 'database', level: 'intermediate', color: '#47a248', years: 1 },
      { id: 'sqlite',      name: 'SQLite',       category: 'database', level: 'intermediate', color: '#003b57', years: 2 },
      { id: 'firebase',    name: 'Firebase',     category: 'database', level: 'intermediate', color: '#ffca28', years: 1 },
    ],
  },
  {
    category: 'automation',
    label: 'Automatización',
    skills: [
      { id: 'n8n',         name: 'N8N',          category: 'automation', level: 'advanced',     color: '#ea4b71', years: 1 },
      { id: 'webhooks',    name: 'Webhooks',     category: 'automation', level: 'advanced',     color: '#00ffcc', years: 1 },
      { id: 'arduino',     name: 'Arduino',      category: 'automation', level: 'advanced',     color: '#00979d', years: 2 },
    ],
  },
  {
    category: 'tools',
    label: 'Herramientas',
    skills: [
      { id: 'git',         name: 'Git',          category: 'tools', level: 'expert',       color: '#f05032', years: 3 },
      { id: 'github',      name: 'GitHub',       category: 'tools', level: 'expert',       color: '#ffffff', years: 3 },
      { id: 'gitlab',      name: 'GitLab',       category: 'tools', level: 'advanced',     color: '#fc6d26', years: 1 },
      { id: 'figma',       name: 'Figma',        category: 'tools', level: 'intermediate', color: '#f24e1e', years: 2 },
      { id: 'postman',     name: 'Postman',      category: 'tools', level: 'advanced',     color: '#ff6c37', years: 2 },
      { id: 'swagger',     name: 'Swagger',      category: 'tools', level: 'advanced',     color: '#85ea2d', years: 1 },
      { id: 'linux',       name: 'Linux',        category: 'tools', level: 'intermediate', color: '#fcc624', years: 2 },
      { id: 'matlab',      name: 'MATLAB',       category: 'tools', level: 'intermediate', color: '#e16737', years: 1 },
    ],
  },
];

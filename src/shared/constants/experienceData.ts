export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current: boolean;
  type: 'job' | 'academic' | 'freelance' | 'personal' | 'certification';
  description: string;
  highlights: string[];
  techs: string[];
  sortYear: number;
  sortMonth: number;
}

export const EXPERIENCE_DATA: Experience[] = [

  //2025
  {
    id: 'meproind-dev',
    role: 'Fullstack Developer & Backend N8N',
    company: 'Meproind',
    period: '2025 — Actualidad',
    current: true,
    type: 'job',
    sortYear: 2025, sortMonth: 1,
    description:
        'Desarrollo fullstack para empresa de servicios mineros, idea de negocio del ecosistema Arkabia. Frontend en React y backend construido íntegramente con N8N. Sistema de cálculo de costos operativos mineros en producción.',
    highlights: [
      'Líder técnico del proyecto — arquitectura y decisiones de sistema',
      'Frontend en React con diseño y modelado desde Figma',
      'Backend 100% N8N: cálculo de costos de mesas gravimétricas',
      'Estimados de consumo eléctrico, agua y precios por mineral',
      'Diseño y modelado de bases de datos relacionales',
    ],
    techs: ['React', 'TypeScript', 'N8N', 'Figma', 'SQL', 'Webhooks'],
  },

  //2024
  {
    id: 'arkabia-dev',
    role: 'Junior Fullstack Developer',
    company: 'Arkabia',
    companyUrl: 'https://arkabia.com',
    period: 'Sep 2024 — Actualidad',
    current: true,
    type: 'job',
    sortYear: 2024, sortMonth: 9,
    description:
        'Desarrollo fullstack en la plataforma SaaS de comercio exterior más importante del Perú. Trabajo en equipo ágil con Scrum, construyendo módulos críticos con React + TypeScript y arquitectura orientada al dominio.',
    highlights: [
      'Desarrollo de frontend usando React, Figma, CSS y Tailwind',
      'Desarrollo de backend usando JavaScript, TypeScript y C#',
      'Diseño y modelado de bases de datos relacionales y no relacionales',
      'Definición de arquitectura, flujos de negocio y estructura del sistema',
      'Coordinación del equipo bajo metodología Scrum',
      'Uso de Git, GitHub, Postman y herramientas colaborativas',
    ],
    techs: ['React', 'TypeScript', 'C#', 'Tailwind CSS', 'Git', 'Scrum', 'Figma'],
  },
  {
    id: 'darkfunnels-dev',
    role: 'Fullstack Developer & Automation',
    company: 'DarkFunnels.ai',
    companyUrl: 'https://darkfunnels.ai',
    period: '2025 — Actualidad',
    current: true,
    type: 'job',
    sortYear: 2025, sortMonth: 1,
    description:
        'Desarrollo fullstack para plataforma de automatización de marketing en WhatsApp con IA. Idea de negocio del ecosistema Arkabia. Frontend Angular y backend N8N con integración de voz IA y videos personalizados.',
    highlights: [
      'Frontend Angular completo para gestión de campañas',
      'Backend N8N con flujos complejos de conversación',
      'Integración de voz IA para mensajes de audio automáticos',
      'Videos personalizados generados con IA por cada lead',
      'Integración con WhatsApp Business API en producción',
    ],
    techs: ['Angular', 'TypeScript', 'N8N', 'AI/LLMs', 'WhatsApp API', 'Voice AI'],
  },
  {
    id: 'lexcoim-dev',
    role: 'Backend Developer',
    company: 'Lexcoim.ai',
    period: '2024',
    current: false,
    type: 'freelance',
    sortYear: 2024, sortMonth: 3,
    description:
        'Backend en C# y Python para plataforma de predicción de éxito de productos importados desde China al mercado peruano. Análisis con IA y estimados de rentabilidad automatizados.',
    highlights: [
      'Motor de análisis en C# y Python',
      'Predicción de éxito para importaciones desde China a Perú',
      'Estimados de rentabilidad y demanda automatizados',
      'Plataforma en producción (actualmente inactiva)',
    ],
    techs: ['C#', '.NET', 'Python', 'APIs', 'AI/LLMs'],
  },
  {
    id: 'preventys',
    role: 'Asistente de Informática y Sistemas',
    company: 'PREVENTYS S.A.C. — Higiene y Salud Ocupacional',
    period: '2024',
    current: false,
    type: 'job',
    sortYear: 2024, sortMonth: 1,
    description:
        'Soporte técnico de informática y sistemas para empresa de salud ocupacional con presencia en Lima y Cajamarca. Creación de interfaces web y apoyo en herramientas Microsoft.',
    highlights: [
      'Creación y mantenimiento de interfaces web (HTML, CSS, JavaScript)',
      'Apoyo en herramientas Microsoft para informes de gestión y proyectos',
      'Soporte a proyectos del sector minero',
      'Trabajo colaborativo con equipos técnicos y administrativos',
    ],
    techs: ['HTML', 'CSS', 'JavaScript', 'Microsoft Office'],
  },
  {
    id: 'usp-course',
    role: 'Curso — Human-Data Interaction',
    company: 'Universidad de São Paulo (EACH/USP)',
    period: 'Jul — Sep 2024',
    current: false,
    type: 'certification',
    sortYear: 2024, sortMonth: 7,
    description:
        'Minicurso de Human-Data Interaction impartido por el PhD. Marcelo Morandini (EACH/USP) como parte de la International Winter School organizada por la UPC. Certificado oficial de la Universidad de São Paulo.',
    highlights: [
      'Human-Data Interaction — diseño centrado en datos y usuarios',
      'International Winter School — UPC × EACH/USP',
      'Impartido por PhD. Marcelo Morandini',
      'Certificado oficial EACH/USP · Jul–Sep 2024',
    ],
    techs: ['UX/UI', 'Data Interaction', 'Human-Computer Interaction'],
  },
  {
    id: 'n8n-specialist',
    role: 'N8N Automation & AI Specialist',
    company: 'Freelance',
    period: '2024 — Actualidad',
    current: true,
    type: 'freelance',
    sortYear: 2024, sortMonth: 8,
    description:
        'Diseño y construcción de flujos automatizados con N8N para distintos clientes. Scraping ético, automatizaciones con IA, llamadas automáticas y pipelines de datos multi-plataforma.',
    highlights: [
      'Scraping ético y procesamiento de datos estructurados',
      'Automatizaciones con LLMs — clasificación, resumen y respuestas',
      'Automatización de llamadas y mensajes de WhatsApp',
      'Pipelines ETL: sincronización entre Notion, Gmail, SQL y más',
      'Bots de notificación y seguimiento automático para clientes',
    ],
    techs: ['N8N', 'Webhooks', 'REST APIs', 'JavaScript', 'SQL', 'Python'],
  },

  //2023
  {
    id: 'upc-degree',
    role: 'Ingeniería de Software — 7° Semestre',
    company: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
    period: '2023 — Actualidad',
    current: true,
    type: 'academic',
    sortYear: 2023, sortMonth: 3,
    description:
        'Formación en ingeniería de software con proyectos fullstack reales en equipo. Arquitecturas DDD, APIs RESTful, frontends modernos y metodologías ágiles. Actualmente en 7° semestre.',
    highlights: [
      'SplitEasy: Spring Boot + Angular con DDD completo y JWT',
      'WorkStation: C# .NET + Vue.js con arquitectura limpia y Swagger',
      'Smart Parking Barrier: Arduino + C++ con sensores de gas y ultrasonido',
      'Synera App: Kotlin (managers) + Flutter (workers) con REST APIs',
      'Gestión Scrum, Figma, Postman y herramientas profesionales',
    ],
    techs: ['Java', 'Spring Boot', 'C#', '.NET', 'Angular', 'Vue.js', 'Flutter', 'Kotlin', 'MySQL', 'DDD'],
  },
  {
    id: 'coursera-sdn',
    role: 'Curso — Software Defined Networking',
    company: 'The University of Chicago · Coursera',
    companyUrl: 'https://coursera.org/verify/L7CT923TLCPP',
    period: 'Oct 2023',
    current: false,
    type: 'certification',
    sortYear: 2023, sortMonth: 10,
    description:
        'Curso de Software Defined Networking impartido por el Prof. Nick Feamster de la Universidad de Chicago. Cubre arquitectura de redes, SDN, análisis de red y modelos de networking moderno.',
    highlights: [
      'Software-Defined Networking y arquitecturas modernas',
      'Network Analysis y Network Model',
      'Computer Networking y Network Architecture',
      'Certificado verificable: coursera.org/verify/L7CT923TLCPP',
    ],
    techs: ['SDN', 'Networking', 'Network Architecture', 'Computer Networks'],
  },
  {
    id: 'coursera-neuroscience',
    role: 'Curso — Computational Neuroscience',
    company: 'University of Washington · Coursera',
    companyUrl: 'https://coursera.org/verify/FBRJQ5NFZE8Z',
    period: 'Sep 2023',
    current: false,
    type: 'certification',
    sortYear: 2023, sortMonth: 9,
    description:
        'MOOC de Computational Neuroscience de la Universidad de Washington impartido por los Dr. Rajesh P.N. Rao y Dr. Adrienne Fairhall. Abarca neurociencia computacional, análisis de datos, álgebra lineal y estadística.',
    highlights: [
      'Computational Neuroscience — fundamentos y modelos',
      'Data Analysis, Linear Algebra y General Statistics aplicados',
      'Impartido por profesores de Computer Science & Physiology UW',
      'Certificado verificable: coursera.org/verify/FBRJQ5NFZE8Z',
    ],
    techs: ['Python', 'Data Analysis', 'Linear Algebra', 'Statistics', 'Neuroscience'],
  },
  {
    id: 'coursera-arduino',
    role: 'Curso — Arduino y algunas aplicaciones',
    company: 'Universidad Nacional Autónoma de México · Coursera',
    companyUrl: 'https://coursera.org/verify/4SWRALKZMDDK',
    period: 'Sep 2023',
    current: false,
    type: 'certification',
    sortYear: 2023, sortMonth: 9,
    description:
        'Curso de Arduino y aplicaciones de la UNAM impartido por el Mtro. Yukihiro Minami Koyama. Cubre programación, arquitectura de software embebido y aplicaciones prácticas con Arduino.',
    highlights: [
      'Programación y arquitectura de sistemas embebidos',
      'Aplicaciones prácticas con Arduino',
      'Computer Architecture y Software Architecture',
      'Certificado verificable: coursera.org/verify/4SWRALKZMDDK',
    ],
    techs: ['Arduino', 'C++', 'Embedded Systems', 'IoT'],
  },
];
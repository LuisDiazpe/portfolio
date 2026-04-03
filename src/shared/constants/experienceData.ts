export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current: boolean;
  type: 'job' | 'academic' | 'freelance' | 'personal';
  description: string;
  highlights: string[];
  techs: string[];
}

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'arkabia-dev',
    role: 'Frontend Developer',
    company: 'Arkabia',
    companyUrl: 'https://arkabia.com',
    period: '2024 — Actualidad',
    current: true,
    type: 'job',
    description:
        'Desarrollo y mantenimiento de la plataforma SaaS de comercio exterior más importante del Perú. Trabajo en equipo ágil construyendo módulos críticos con React + TypeScript, implementando arquitectura orientada al dominio.',
    highlights: [
      'Módulos de gestión documental en producción con usuarios reales',
      'Componentes reutilizables con TypeScript strict y arquitectura DDD',
      'Integración con múltiples APIs de terceros para comercio exterior',
      'Code reviews y pair programming con equipo senior',
      'CI/CD con GitLab — deploy continuo',
    ],
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'GitLab', 'REST APIs', 'DDD'],
  },
  {
    id: 'meproind-dev',
    role: 'Backend Developer (N8N)',
    company: 'Meproind',
    period: '2025 — Actualidad',
    current: true,
    type: 'freelance',
    description:
        'Desarrollando el backend completo con N8N para empresa de servicios mineros. Sistema de cálculo de costos operativos: separación de minerales en mesas gravimétricas, consumo de agua y electricidad, estimado de precios por mineral.',
    highlights: [
      'Backend 100% construido con N8N — sin código backend tradicional',
      'Cálculo de costos de mesas gravimétricas con parámetros variables',
      'Estimados de consumo eléctrico y agua por proceso',
      'Precios y costos diferenciados por tipo de mineral',
      'Sistema crítico para toma de decisiones operativas de la empresa',
    ],
    techs: ['N8N', 'REST APIs', 'Webhooks', 'SQL', 'JavaScript'],
  },
  {
    id: 'darkfunnels-dev',
    role: 'Automation Developer',
    company: 'DarkFunnels.ai',
    companyUrl: 'https://darkfunnels.ai',
    period: '2024',
    current: false,
    type: 'freelance',
    description:
        'Desarrollo de automatizaciones con IA para plataforma de marketing en WhatsApp. Integración de voz para mensajes de audio automáticos, videos personalizados generados con IA y flujos complejos de N8N para gestión de conversaciones y leads.',
    highlights: [
      'Integración de voz IA para audios automáticos en WhatsApp',
      'Videos personalizados generados con IA por cliente',
      'Flujos N8N complejos para gestión de leads y seguimientos',
      'Plataforma en producción con clientes reales',
      'Integración con WhatsApp Business API',
    ],
    techs: ['N8N', 'AI/LLMs', 'WhatsApp API', 'Voice AI', 'Video AI', 'Webhooks'],
  },
  {
    id: 'lexcoim-dev',
    role: 'AI Automation Developer',
    company: 'Lexcoim.ai',
    period: '2024',
    current: false,
    type: 'freelance',
    description:
        'Desarrollé la plataforma de análisis predictivo con IA para importadores. El sistema evaluaba productos candidatos a importar desde China y calculaba estimados de éxito en el mercado peruano usando modelos de lenguaje y análisis de datos.',
    highlights: [
      'Análisis de mercado peruano con modelos de IA',
      'Predicción de éxito para importaciones desde China',
      'Estimados de rentabilidad y demanda automatizados',
      'Plataforma en producción (actualmente inactiva)',
    ],
    techs: ['N8N', 'AI/LLMs', 'Python', 'APIs', 'Automatización'],
  },
  {
    id: 'n8n-freelance',
    role: 'N8N Automation & AI Specialist',
    company: 'Freelance',
    period: '2023 — Actualidad',
    current: true,
    type: 'freelance',
    description:
        'Diseño y construcción de flujos automatizados con N8N para distintos clientes. Scraping ético, automatizaciones con IA, automatización de llamadas y pipelines de datos multi-plataforma.',
    highlights: [
      'Flujos de scraping ético y procesamiento de datos',
      'Automatizaciones con LLMs — clasificación, resumen, respuestas',
      'Automatización de llamadas de WhatsApp',
      'Pipelines ETL: sincronización entre plataformas (Notion, Gmail, SQL)',
      'Bots de notificación y seguimiento automático',
    ],
    techs: ['N8N', 'Webhooks', 'REST APIs', 'JavaScript', 'SQL', 'Python'],
  },
  {
    id: 'upc-projects',
    role: 'Proyectos Académicos Fullstack',
    company: 'Universidad Peruana de Ciencias Aplicadas',
    period: '2023 — 2025',
    current: true,
    type: 'academic',
    description:
        'Desarrollo de múltiples proyectos fullstack en equipos usando Scrum. Arquitecturas DDD, APIs RESTful y frontends modernos en distintos stacks: Java/Spring Boot, C#/.NET, Angular, Vue.js.',
    highlights: [
      'SplitEasy: Spring Boot + Angular con DDD completo y JWT',
      'WorkStation: C# .NET + Vue.js con arquitectura limpia',
      'Smart Parking: Arduino + C++ con sensores y detección de gases',
      'Documentación Swagger, testing en Postman, diseño en Figma',
      'Gestión de proyectos Scrum con GitLab y Trello',
    ],
    techs: ['Java', 'Spring Boot', 'C#', '.NET', 'Angular', 'Vue.js', 'MySQL', 'DDD', 'Arduino'],
  },
  {
    id: 'hardware-personal',
    role: 'Hardware & Embedded Systems',
    company: 'Proyectos Personales',
    companyUrl: 'https://github.com/LuisDiazpe',
    period: '2023 — Actualidad',
    current: true,
    type: 'personal',
    description:
        'Construcción de proyectos de hardware avanzados: emulador de Windows 7 en browser, consola 3D en OLED, consola retro y sistemas IoT. Todo desde cero en C++ y TypeScript.',
    highlights: [
      'Windows 7 Emulator: Angular puro, sin backend, Visual Studio integrado',
      '3D Console: motor 3D en C++ desde cero sobre pantalla OLED',
      'RetroConsole: juegos retro sobre hardware embebido — MIT License',
      'Pastillero inteligente: Arduino + C++ para salud',
      'Más de 15 repositorios públicos en GitHub',
    ],
    techs: ['C++', 'Arduino', 'Angular', 'TypeScript', 'IoT', 'Hardware'],
  },
];
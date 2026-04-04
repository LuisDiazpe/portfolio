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
  sortYear: number;
  sortMonth: number;
}

export const EXPERIENCE_DATA: Experience[] = [
  //ACTUALES
  {
    id: 'arkabia-dev',
    role: 'Frontend Developer',
    company: 'Arkabia',
    companyUrl: 'https://arkabia.com',
    period: 'Ene 2024 — Actualidad',
    current: true,
    type: 'job',
    sortYear: 2024,
    sortMonth: 1,
    description:
        'Desarrollo y mantenimiento de la plataforma SaaS de comercio exterior más importante del Perú. Equipo ágil, módulos críticos con React + TypeScript y arquitectura DDD.',
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
    sortYear: 2025,
    sortMonth: 1,
    description:
        'Desarrollando el backend completo con N8N para empresa de servicios mineros. Sistema de cálculo de costos: mesas gravimétricas, consumo de agua y electricidad, estimado de precios por mineral.',
    highlights: [
      'Backend 100% construido con N8N — sin código backend tradicional',
      'Cálculo de costos de mesas gravimétricas con parámetros variables',
      'Estimados de consumo eléctrico y agua por proceso',
      'Precios y costos diferenciados por tipo de mineral',
      'Sistema crítico para toma de decisiones operativas',
    ],
    techs: ['N8N', 'REST APIs', 'Webhooks', 'SQL', 'JavaScript'],
  },
  {
    id: 'n8n-specialist',
    role: 'N8N Automation & AI Specialist',
    company: 'Freelance',
    period: '2023 — Actualidad',
    current: true,
    type: 'freelance',
    sortYear: 2023,
    sortMonth: 6,
    description:
        'Diseño y construcción de flujos automatizados con N8N para distintos clientes. Scraping ético, automatizaciones con IA, llamadas automáticas y pipelines de datos multi-plataforma.',
    highlights: [
      'Scraping ético y procesamiento de datos estructurados',
      'Automatizaciones con LLMs — clasificación, resumen, respuestas automáticas',
      'Automatización de llamadas y mensajes de WhatsApp',
      'Pipelines ETL: sincronización entre plataformas (Notion, Gmail, SQL)',
      'Bots de notificación y seguimiento automático para clientes',
    ],
    techs: ['N8N', 'Webhooks', 'REST APIs', 'JavaScript', 'SQL', 'Python'],
  },
  {
    id: 'upc-projects',
    role: 'Ingeniería de Software',
    company: 'UPC — Universidad Peruana de Ciencias Aplicadas',
    period: '2023 — Actualidad',
    current: true,
    type: 'academic',
    sortYear: 2023,
    sortMonth: 3,
    description:
        'Formación en ingeniería de software con proyectos fullstack reales en equipo. Arquitecturas DDD, APIs RESTful y frontends modernos en distintos stacks. Actualmente en 7° semestre.',
    highlights: [
      'SplitEasy: Spring Boot + Angular con DDD completo y autenticación JWT',
      'WorkStation: C# .NET + Vue.js con arquitectura limpia y Swagger',
      'Smart Parking Barrier: Arduino + C++ con sensores de gas y ultrasonido',
      'Gestión de proyectos Scrum, diseño en Figma, testing en Postman',
    ],
    techs: ['Java', 'Spring Boot', 'C#', '.NET', 'Angular', 'Vue.js', 'MySQL', 'DDD', 'Arduino', 'Scrum'],
  },
  {
    id: 'hardware-personal',
    role: 'Hardware & Embedded Systems',
    company: 'Proyectos Personales',
    companyUrl: 'https://github.com/LuisDiazpe',
    period: '2022 — Actualidad',
    current: true,
    type: 'personal',
    sortYear: 2022,
    sortMonth: 1,
    description:
        'Proyectos de hardware avanzados construidos desde cero: emulador de Windows 7 en browser, consola 3D en OLED, consola retro y sistemas IoT con Arduino.',
    highlights: [
      'Windows 7 Emulator: Angular puro en el browser, Visual Studio integrado',
      '3D Console: motor 3D en C++ desde cero sobre pantalla OLED',
      'RetroConsole: juegos retro sobre hardware embebido — MIT License',
      'Smart Parking: control vehicular con detección de gases peligrosos',
      'Pastillero inteligente: IoT para salud con Arduino',
    ],
    techs: ['C++', 'Arduino', 'Angular', 'TypeScript', 'IoT', 'Hardware'],
  },

  //Anteriores
  {
    id: 'darkfunnels-dev',
    role: 'Automation Developer',
    company: 'DarkFunnels.ai',
    companyUrl: 'https://darkfunnels.ai',
    period: '2024',
    current: false,
    type: 'freelance',
    sortYear: 2024,
    sortMonth: 6,
    description:
        'Automatizaciones con IA para plataforma de marketing en WhatsApp. Integración de voz, videos personalizados generados con IA y flujos N8N complejos para gestión de conversaciones y leads.',
    highlights: [
      'Integración de voz IA para mensajes de audio automáticos',
      'Videos personalizados generados con IA por cada cliente/lead',
      'Flujos N8N complejos: gestión de leads, seguimientos y respuestas',
      'Integración con WhatsApp Business API en producción',
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
    sortYear: 2024,
    sortMonth: 3,
    description:
        'Plataforma de análisis predictivo con IA para importadores peruanos. El sistema evaluaba productos candidatos a importar desde China y estimaba probabilidad de éxito en el mercado peruano.',
    highlights: [
      'Análisis de mercado peruano con modelos de IA',
      'Predicción de éxito para importaciones desde China',
      'Estimados de rentabilidad y demanda automatizados',
      'Plataforma en producción (actualmente inactiva)',
    ],
    techs: ['N8N', 'AI/LLMs', 'Python', 'APIs'],
  },
];
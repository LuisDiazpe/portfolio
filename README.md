<div align="center">

# Jorge Luis Díaz Fiestas
### Fullstack Developer · N8N Automation · UPC Lima, Perú 🏔️

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-00ffcc?style=for-the-badge&logo=vercel&logoColor=black)](https://portfolio-omega-peach-65.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luis-d%C3%ADaz-b2b537293/)
[![GitHub](https://img.shields.io/badge/GitHub-LuisDiazpe-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LuisDiazpe)

</div>

---

## Sobre este proyecto

Portafolio personal fullstack construido desde cero con **arquitectura DDD (Domain Driven Design)** en frontend y backend. Diseñado con identidad visual propia inspirada en las auroras boreales y las montañas de Cajamarca.

Incluye una alpaca 3D animada con animaciones reales (walk, idle, eating, hit react) que reacciona al mouse y al click. El fondo es un canvas WebGL con auroras procedurales y silueta de montañas en capas.

Disponible en **3 idiomas**: Español 🇵🇪 · English 🇺🇸 · Português 🇧🇷

---

## Stack

### Frontend
| Tech | Uso |
|---|---|
| React 18 + Vite | Framework + bundler |
| TypeScript strict | Tipado completo en toda la app |
| Tailwind CSS v3 | Sistema de diseño con tema aurora |
| Framer Motion | Animaciones y transiciones |
| Three.js + @react-three/fiber | Modelo 3D de la alpaca |
| @react-three/drei | Helpers y animaciones GLB |
| react-i18next | Internacionalización ES/EN/PT |
| React Hook Form | Formulario de contacto |
| Zod | Validación de esquemas |
| Lucide React | Íconos |

### Backend
| Tech | Uso |
|---|---|
| Node.js + Express | Servidor HTTP |
| TypeScript strict | Tipado completo |
| Nodemailer | Envío de emails vía Gmail |
| Zod | Validación de inputs |
| Helmet | Headers de seguridad |
| express-rate-limit | Anti-spam (5 req / 15 min) |
| CORS configurado | Solo dominio frontend permitido |

---

## Arquitectura DDD

```
portfolio/
├── src/
│   ├── domain/                   # Entidades puras — sin dependencias de framework
│   │   ├── project/              # Project entity, ProjectRepository interface
│   │   ├── contact/              # ContactMessage entity, validación de dominio
│   │   └── skill/                # Skill entity
│   ├── application/              # Casos de uso
│   │   ├── project/              # GetProjectsByCategory, GetFeaturedProjects
│   │   └── contact/              # SendContactMessage
│   ├── infrastructure/           # Implementaciones concretas
│   │   └── repositories/         # InMemoryProjectRepository, ApiContactRepository
│   ├── presentation/             # React — UI pura, sin lógica de negocio
│   │   ├── components/
│   │   │   ├── ui/               # Átomos: FadeIn, SectionHeader, LanguageSwitcher
│   │   │   ├── sections/         # Hero, About, Skills, Experience, Projects, Contact
│   │   │   └── layout/           # Navbar, Footer, AuroraBackground
│   │   ├── hooks/                # useProjects, useContact, useScrollSpy
│   │   └── pages/
│   └── shared/
│       ├── constants/            # skillsData, experienceData
│       └── i18n/                 # Traducciones ES / EN / PT
│
└── backend/
    └── src/
        ├── domain/contact/       # ContactMessage entity + IEmailService interface
        ├── application/          # SendContactUseCase + validación Zod
        ├── infrastructure/email/ # NodemailerEmailService (Gmail)
        └── interfaces/http/      # ContactController + ContactRouter
```

La **inyección de dependencias** se resuelve en `App.tsx` — los repositorios e infraestructura se instancian ahí y se pasan a los casos de uso. Los componentes React no conocen la implementación concreta.

---

## Setup local

### Frontend

```bash
npm install
npm run dev        # → http://localhost:5173
```

### Backend

```bash
cd backend
npm install
cp .env.example .env   # completar con credenciales Gmail
npm run dev            # → http://localhost:3001
```

---

## Scripts

```bash
# Frontend
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run type-check   # TypeScript sin compilar

# Backend
npm run dev          # Hot-reload con ts-node-dev
npm run build        # Compilar a dist/
npm run start        # Ejecutar build (producción)
```

---

## Deploy

- **Frontend** → [Vercel](https://vercel.com) — build automático desde `main`
- **Backend** → [Render](https://render.com) — free tier con keep-alive externo

Variable de entorno requerida en Vercel:
```
VITE_API_URL = https://tu-backend.onrender.com
```

---

## Personalización rápida

| Qué cambiar | Archivo |
|---|---|
| Proyectos | `src/infrastructure/repositories/projectsData.ts` |
| Skills | `src/shared/constants/skillsData.ts` |
| Experiencia | `src/shared/constants/experienceData.ts` |
| Traducciones | `src/shared/i18n/locales/es.json` · `en.json` · `pt.json` |
| Colores aurora | `tailwind.config.js` + `src/index.css` |
| Modelo 3D | `public/Llama.glb` |

---

## Licencia

MIT © 2025 Jorge Luis Díaz Fiestas 
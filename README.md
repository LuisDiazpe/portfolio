# Jorge Luis Díaz Fiestas — Portfolio

Portafolio personal fullstack construido con React + Vite + TypeScript (frontend) y Node.js + Express + TypeScript (backend), siguiendo arquitectura **Domain Driven Design (DDD)** en ambos lados.

---

## Arquitectura

```
portfolio/
├── src/                          # Frontend React
│   ├── domain/                   # Entidades puras, interfaces, validaciones
│   │   ├── project/
│   │   ├── contact/
│   │   └── skill/
│   ├── application/              # Casos de uso
│   │   ├── project/
│   │   └── contact/
│   ├── infrastructure/           # Implementaciones concretas
│   │   └── repositories/
│   ├── presentation/             # React — componentes, hooks, páginas
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── sections/
│   │   │   └── layout/
│   │   ├── hooks/
│   │   └── pages/
│   └── shared/                   # Constantes, tipos globales
│
└── backend/                      # Backend Node.js
    └── src/
        ├── domain/contact/       # Entidad + interfaz EmailService
        ├── application/          # SendContactUseCase + validación Zod
        ├── infrastructure/email/ # NodemailerEmailService
        └── interfaces/http/      # Controller + Router Express
```

---

## Stack

### Frontend
| Tech | Uso |
|------|-----|
| React 18 + Vite | Framework + bundler |
| TypeScript strict | Tipado completo |
| Tailwind CSS v3 | Estilos con tema aurora |
| Framer Motion | Animaciones y transiciones |
| React Hook Form | Formulario de contacto |
| Zod | Validación de esquemas |
| Lucide React | Íconos |

### Backend
| Tech | Uso |
|------|-----|
| Node.js + Express | Servidor HTTP |
| TypeScript strict | Tipado completo |
| Nodemailer | Envío de emails vía Gmail |
| Zod | Validación de inputs |
| Helmet | Headers de seguridad |
| express-rate-limit | Protección anti-spam (5 req/15min) |
| CORS configurado | Solo tu dominio frontend |

---

## Setup local

### 1. Frontend

```bash
# En la raíz del proyecto
npm install
npm run dev
# → http://localhost:5173
```

### 2. Backend

```bash
cd backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Gmail (ver instrucciones abajo)

npm run dev
# → http://localhost:3001
```

### 3. Variables de entorno (.env)

```env
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
GMAIL_USER=tu-correo@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
CONTACT_RECEIVER=tu-correo@gmail.com
```

### 4. Configurar Gmail App Password

1. Activa **Verificación en 2 pasos** en tu cuenta Google
2. Ve a: **Cuenta Google → Seguridad → Contraseñas de aplicación**
3. Crea una nueva → selecciona "Correo" + "Otro (nombre personalizado)" → escribe "Portfolio"
4. Copia la contraseña de **16 caracteres** que aparece
5. Pégala en `GMAIL_APP_PASSWORD` (sin espacios o con espacios, ambos funcionan)

---

## Deploy

### Frontend → Vercel (gratis)

```bash
# Instala Vercel CLI
npm i -g vercel

# Desde la raíz del proyecto
vercel

# Variables de entorno en Vercel:
# VITE_API_URL = https://tu-backend.railway.app
```

### Backend → Railway (gratis tier)

1. Crea cuenta en [railway.app](https://railway.app)
2. **New Project → Deploy from GitHub repo**
3. Selecciona la carpeta `backend/` como root
4. Agrega las variables de entorno en el panel de Railway:
   - `NODE_ENV=production`
   - `GMAIL_USER=tu-correo@gmail.com`
   - `GMAIL_APP_PASSWORD=...`
   - `CONTACT_RECEIVER=tu-correo@gmail.com`
   - `ALLOWED_ORIGINS=https://tu-portfolio.vercel.app`
5. Railway detecta automáticamente el `package.json` y hace el build

### Una vez deployado

Actualiza `VITE_API_URL` en Vercel con la URL de Railway y redeploy el frontend.

---

## Agregar imágenes de proyectos

Cuando tengas capturas de tus proyectos:

1. Colócalas en `public/projects/` (ej: `arkabia.webp`)
2. En `src/infrastructure/repositories/projectsData.ts`, agrega `imageUrl`:

```ts
{
  id: 'arkabia-platform',
  imageUrl: '/projects/arkabia.webp',
  // ...
}
```

Formatos recomendados: **WebP** (mejor compresión), 800×500px mínimo.

---

## Personalización

- **Proyectos** → `src/infrastructure/repositories/projectsData.ts`
- **Skills** → `src/shared/constants/skillsData.ts`
- **Experiencia** → `src/shared/constants/experienceData.ts`
- **Colores aurora** → `tailwind.config.js` y `src/index.css`
- **Contacto anti-scraping** → `src/presentation/components/sections/ContactSection.tsx` (función `getContactLinks`)

---

## Scripts disponibles

### Frontend
```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run preview    # Preview del build
npm run type-check # Verificar TypeScript sin compilar
```

### Backend
```bash
npm run dev        # Servidor con hot-reload (ts-node-dev)
npm run build      # Compilar TypeScript a dist/
npm run start      # Ejecutar build compilado (producción)
npm run type-check # Verificar TypeScript sin compilar
```

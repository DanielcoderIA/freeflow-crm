<div align="center">

<img src="https://img.shields.io/badge/Next.js-16.1.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Supabase-2.90.1-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
<img src="https://img.shields.io/badge/Stripe-20.2.0-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

<br /><br />

# FreeFlow CRM
### The Freelance Operating System

**Una infraestructura unificada que elimina la fragmentación operativa del freelancer profesional.**  
Gestiona el ciclo de vida completo del negocio en un solo lugar.

<br />

```
Prospección → Propuesta → Ejecución → Facturación
```

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Ver_Demo_en_Vivo-FF6B6B?style=for-the-badge)](https://freeflow-crm-smvr.vercel.app/login?demo=true)

</div>

---

## 📋 Tabla de Contenidos

- [Acceso Demo](#-acceso-demo)
- [Por Qué FreeFlow](#-por-qué-freeflow)
- [Funcionalidades](#-funcionalidades)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Inicio Rápido](#-inicio-rápido)
- [Variables de Entorno](#-variables-de-entorno)
- [Comandos Disponibles](#-comandos-disponibles)

---

## 🎯 Acceso Demo

> Experiencia optimizada para reclutadores técnicos — **sin registro, acceso inmediato.**

**[→ https://freeflow-crm-smvr.vercel.app/login?demo=true](https://freeflow-crm-smvr.vercel.app/login?demo=true)**

> [!NOTE]
> El parámetro `?demo=true` activa un flujo de autenticación asíncrona: el componente `LoginPage` detecta el query param, dispara `signInWithPassword` con credenciales de entorno seguras y muestra un estado de carga dedicado mientras Supabase Auth establece la sesión.

---

## 💡 Por Qué FreeFlow

Los freelancers profesionales operan con herramientas dispersas: una hoja de cálculo para clientes, otra para proyectos, una app separada para facturas, y sin visibilidad unificada del negocio. FreeFlow CRM consolida ese stack en una sola plataforma.

| Problema | Solución FreeFlow |
|---|---|
| Clientes dispersos en distintas herramientas | CRM centralizado con historial completo |
| Propuestas gestionadas fuera del flujo | Módulo de propuestas integrado al pipeline |
| Proyectos sin visibilidad de avance | Gestión de proyectos con estados |
| Facturación manual y propensa a errores | Motor de invoicing estructurado |
| Sin KPIs de negocio consolidados | Dashboard con métricas calculadas en servidor |
| Gestión de suscripción compleja | Billing delegado a Stripe con portal nativo |

---

## ✨ Funcionalidades

### 📊 Sistema de Control Operativo

- **Gestión Multi-Entidad** — Clientes, Proyectos, Propuestas e Invoices con integridad referencial en Postgres.
- **KPI Dashboard** — Métricas del negocio calculadas en el servidor (Server Components) y entregadas listas al cliente.
- **Módulo de Propuestas** — Flujo integrado para crear y gestionar propuestas comerciales dentro del mismo pipeline operativo.
- **Configuración de Cuenta** — Módulo de settings para gestión del perfil y preferencias.

### 💳 Motor de Monetización (Freemium-Led Growth)

Integración nativa con **Stripe Billing**:

- **Modelo PLG (Product-Led Growth)** — Límite estratégico en el plan Free que incentiva la conversión orgánica a Pro.
- **Stripe Checkout & Customer Portal** — Gestión delegada de suscripciones y métodos de pago sin desarrollo adicional.
- **Sincronización vía Webhooks** — El handler en `src/app/api/webhooks/stripe/` verifica la firma HMAC de cada evento entrante para sincronizar el estado de suscripción en tiempo real.

### 🔐 Seguridad de Datos

- **Aislamiento Multi-Tenant** — Row Level Security (RLS) en Postgres garantiza que cada usuario acceda únicamente a sus propios datos.
- **Clientes Supabase Separados por Contexto** — `supabase.ts` (browser, `createBrowserClient` de `@supabase/ssr`) y `server-supabase.ts` (servidor) mantienen sesiones aisladas según el entorno de ejecución.
- **Service Role Acotado** — `supabase-admin.ts` con service role se usa exclusivamente en operaciones de servidor que requieren bypass de RLS (ej: actualización de tier post-webhook de Stripe).

### 🎨 Sistema de UI

- **Radix UI** — Primitivos accesibles para todos los componentes interactivos: Dialog, DropdownMenu, Select, Tabs, Avatar, Switch, Label y Slot.
- **Tailwind CSS v4** — Sistema de estilos utility-first con `tw-animate-css` para animaciones declarativas.
- **Tema Claro/Oscuro** — `theme-provider.tsx` con `next-themes` para persistencia del tema seleccionado.
- **Sonner** — Notificaciones toast no intrusivas para feedback de acciones del usuario.
- **Lucide React** — Sistema de iconos coherente en toda la interfaz.

---

## 🏗️ Arquitectura del Sistema

FreeFlow CRM implementa una arquitectura **Full-Stack Monolítica Moderna** sobre Next.js 16 App Router, desplazando la lógica crítica al servidor.

```
┌──────────────────────────────────────────────────────────────────┐
│                       CLIENTE (Browser)                           │
│                                                                  │
│  src/components/                                                 │
│  ├── auth/       billing/     clients/     dashboard/            │
│  ├── invoices/   layout/      projects/    proposals/            │
│  ├── settings/   ui/          theme-provider.tsx                 │
│                                                                  │
│  Interactividad: modales, formularios, toasts (Sonner)           │
└──────────────────────────┬───────────────────────────────────────┘
                           │ HTTP / Server Actions
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│               SERVIDOR NEXT.JS 16 (App Router)                    │
│                                                                  │
│  src/app/                                                        │
│  ├── page.tsx               → Landing page                       │
│  ├── layout.tsx             → Root layout                        │
│  ├── login/                 → Auth + auto-login demo             │
│  ├── auth/callback/         → Callback OAuth Supabase            │
│  ├── dashboard/             → Dashboard principal (RSC)          │
│  └── api/webhooks/stripe/   → Handler de eventos Stripe         │
│                                                                  │
│  src/lib/                                                        │
│  ├── supabase.ts            → createBrowserClient (@supabase/ssr)│
│  ├── server-supabase.ts     → Cliente Supabase para servidor     │
│  ├── supabase-admin.ts      → Service role (bypass RLS)          │
│  ├── stripe.ts              → Instancia Stripe SDK               │
│  ├── format.ts              → Formateo de datos (moneda, fechas) │
│  └── utils.ts               → cn() con clsx + tailwind-merge     │
└──────────────┬─────────────────────────────┬─────────────────────┘
               │                             │
               ▼                             ▼
┌─────────────────────────┐    ┌──────────────────────────────────┐
│   SUPABASE (Postgres)   │    │           STRIPE API             │
│   • Auth SSR (PKCE)     │    │   • Checkout Sessions            │
│   • RLS por user_id     │    │   • Customer Portal              │
│   • supabase/migrations/│    │   • Webhooks (firma HMAC-SHA256) │
│   • estructura.sql      │    └──────────────────────────────────┘
└─────────────────────────┘
```

### Estrategia de Renderizado

| Patrón | Uso en el Proyecto |
|---|---|
| **Server Components (RSC)** | Dashboard, listados de clientes, proyectos, facturas y propuestas |
| **Client Components** | Modales de formulario, dropdowns, toggles de tema, toasts |
| **Route Handlers** | `api/webhooks/stripe/` para procesar y verificar eventos de Stripe |
| **Auth Callback** | `auth/callback/` para completar el flujo de autenticación OAuth de Supabase |

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| **Framework** | Next.js | 16.1.2 |
| **UI Library** | React | 19.2.3 |
| **Lenguaje** | TypeScript | ^5 |
| **Base de Datos / Auth** | @supabase/supabase-js | ^2.90.1 |
| **Supabase SSR** | @supabase/ssr | ^0.8.0 |
| **Auth Helpers** | @supabase/auth-helpers-nextjs | ^0.15.0 |
| **Pagos** | Stripe Node SDK | ^20.2.0 |
| **Estilos** | Tailwind CSS | ^4 |
| **Animaciones** | tw-animate-css | ^1.4.0 |
| **Componentes Base** | Radix UI (8 primitivos) | ^1.4.3 |
| **Variantes CSS** | class-variance-authority | ^0.7.1 |
| **Merge de clases** | tailwind-merge + clsx | ^3.4.0 / ^2.1.1 |
| **Tema** | next-themes | ^0.4.6 |
| **Notificaciones** | Sonner | ^2.0.7 |
| **Iconos** | Lucide React | ^0.562.0 |
| **Linting** | ESLint | ^9 |

---

## 🗂️ Estructura del Proyecto

```
freeflow-crm/
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── webhooks/
│   │   │       └── stripe/       # Handler de webhooks Stripe
│   │   ├── auth/
│   │   │   └── callback/         # Callback OAuth Supabase
│   │   ├── dashboard/            # Dashboard principal (RSC)
│   │   ├── login/                # Login + auto-login demo
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Landing page
│   ├── components/
│   │   ├── auth/
│   │   ├── billing/
│   │   ├── clients/
│   │   ├── dashboard/
│   │   ├── invoices/
│   │   ├── layout/
│   │   ├── projects/
│   │   ├── proposals/
│   │   ├── settings/
│   │   ├── ui/                   # Componentes base (Radix UI)
│   │   └── theme-provider.tsx
│   ├── lib/
│   │   ├── format.ts             # Formateo de moneda y fechas
│   │   ├── server-supabase.ts    # Cliente Supabase para servidor
│   │   ├── stripe.ts             # Instancia Stripe SDK
│   │   ├── supabase-admin.ts     # Cliente service role (bypass RLS)
│   │   ├── supabase.ts           # Cliente browser (createBrowserClient)
│   │   └── utils.ts              # cn() — clsx + tailwind-merge
│   └── proxy.ts
├── supabase/
│   └── migrations/
├── .gitignore
├── ARCHITECTURE.md
├── components.json               # Configuración shadcn/ui
├── eslint.config.mjs
├── estructura.sql                # Schema de la base de datos
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## ⚡ Inicio Rápido

### Prerrequisitos

- Node.js 18+
- Cuenta en [Supabase](https://supabase.com) — Base de datos + Auth
- Cuenta en [Stripe](https://stripe.com) — Modo Test

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/DanielcoderIA/freeflow-crm.git
cd freeflow-crm

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Completar .env.local con tus credenciales (ver sección siguiente)

# 4. Inicializar el schema en Supabase
# Ejecutar el contenido de estructura.sql en el SQL Editor de tu proyecto Supabase

# 5. Levantar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

> [!TIP]
> Para probar el flujo completo de Stripe en local, instala la [Stripe CLI](https://stripe.com/docs/stripe-cli) y ejecuta en una terminal separada:
> ```bash
> stripe listen --forward-to localhost:3000/api/webhooks/stripe
> ```
> Esto redirige los eventos de Stripe a tu servidor local y genera el `STRIPE_WEBHOOK_SECRET` necesario para la verificación de firma.

---

## 🔑 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# ─── Supabase ──────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# ─── Stripe ────────────────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ─── URL de la aplicación ──────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ─── Demo de Reclutadores ──────────────────────────────────────
NEXT_PUBLIC_DEMO_EMAIL=demo@freeflow.app
NEXT_PUBLIC_DEMO_PASSWORD=Demo1234
```

> [!WARNING]
> `SUPABASE_SERVICE_ROLE_KEY` bypasea RLS completamente. Se usa **únicamente** en `src/lib/supabase-admin.ts` para operaciones administrativas de servidor que lo requieran (ej: actualizar el tier de suscripción tras recibir un webhook de Stripe). Nunca debe exponerse al cliente.

---

## 📦 Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo en localhost:3000
npm run build    # Compilación optimizada para producción
npm run start    # Inicia el servidor tras el build de producción
npm run lint     # Auditoría de código con ESLint 9
```

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Ver [`LICENSE`](LICENSE) para más información.

---

<div align="center">

Construido con Next.js 16, React 19, Supabase y Stripe

[Ver Demo](https://freeflow-crm-smvr.vercel.app/login?demo=true) · [Reportar un Bug](https://github.com/DanielcoderIA/freeflow-crm/issues) · [Solicitar Feature](https://github.com/DanielcoderIA/freeflow-crm/issues)

</div>


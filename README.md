# FreeFlow CRM: Enterprise-Grade Freelance Operating System

> **Business Solution** — Una solución integral para la automatización de flujos de trabajo en el ecosistema freelance. Centraliza la gestión de clientes, ciclo de vida de proyectos, inteligencia de propuestas y facturación automatizada bajo una arquitectura SaaS escalable.

---

## 🚀 Demo de Producto

**Acceso Directo:** [https://freeflow-crm-smvr.vercel.app/login?demo=true] | **Usuario Demo:** demo@test.com | **Password:** Demo1234

---

## Estrategia de Negocio

La plataforma resuelve la fragmentación operativa del freelancer moderno mediante una infraestructura unificada que orquesta el ciclo de ingresos de extremo a extremo: **Prospecto → Pipeline → Entrega → Revenue Generation**. 

Implementa un modelo de monetización **Product-Led Growth (PLG)** mediante un sistema freemium con barreras de conversión estratégicas (límite de 5 clientes), optimizado para maximizar el ARPU a través de una suscripción Pro de alto valor.

---

## Stack Tecnológico (Production Ready)

El stack ha sido seleccionado para garantizar baja latencia, seguridad de grado financiero y escalabilidad horizontal.

| Categoría | Tecnología | Rol Estratégico |
|---|---|---|
| **Inteligencia Artificial** | **Gemini 1.5 / Groq / RAG** | Motor de procesamiento de lenguaje natural para categorización de proyectos y análisis predictivo de facturación. |
| **Framework** | Next.js 16 (App Router) | Renderizado híbrido para máxima optimización SEO y performance. |
| **Infraestructura de Pagos** | **Stripe Billing** | Gestión de suscripciones recurrentes, reconciliación automática de webhooks y portal de cliente. |
| **BaaS / Realtime** | Supabase (Postgres + Auth) | Persistencia de datos con integridad referencial y autenticación segura (PKCE). |
| **Diseño Sistémico** | Tailwind CSS 4 + Shadcn UI | Sistema de diseño atómico para una experiencia de usuario consistente y profesional. |
| **Tipografía** | Inter (Google Fonts) | Optimización para lectura de datos técnicos y financieros. |

---

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto para conectar los servicios críticos:

```env
# Supabase Core
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<tu-service-role-key>

# Stripe Production
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI Infrastructure
GROQ_API_KEY=gsk_...
GEMINI_API_KEY=...

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Despliegue y Configuración

El proyecto está diseñado para un flujo de CI/CD continuo.

```bash
# Instalación de dependencias de producción
npm install

# Inicialización del entorno de desarrollo
npm run dev
```

### Arquitectura de Base de Datos (Supabase)

Definición de esquemas con enfoque en integridad y escalabilidad:

```sql
-- Gestión de Perfiles y Suscripciones
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Infraestructura de Clientes y Proyectos
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  company TEXT,
  status TEXT DEFAULT 'active'
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  value NUMERIC DEFAULT 0,
  deadline DATE
);

-- Capa de Facturación e Ingresos
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled'))
);
```

### Integración de Stripe

Sincronización bidireccional mediante Webhooks para garantizar la consistencia del estado de suscripción:
- `checkout.session.completed` → Escalado automático a nivel Pro.
- `customer.subscription.deleted` → Gestión de churn y degradación de servicios.

---

## Comandos de Ingeniería

| Script | Acción |
|---|---|
| `npm run dev` | Instancia de desarrollo local |
| `npm run build` | Compilación optimizada para producción |
| `npm run start` | Despliegue en servidor de runtime |
| `npm run lint` | Auditoría de calidad de código y estandares |


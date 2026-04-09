# FreeFlow CRM

> **CRM SaaS para freelancers** — gestiona clientes, proyectos, propuestas y facturación con un modelo de suscripción integrado.

---

## Problem Statement

Los freelancers carecen de una herramienta ligera y asequible que centralice su operación comercial: desde el primer contacto con un cliente hasta el cobro de la factura. FreeFlow CRM resuelve esto con un panel unificado que conecta el ciclo completo: **Cliente → Propuesta → Proyecto → Factura → Cobro**, respaldado por un modelo freemium que limita clientes a 5 en el plan gratuito e incentiva la conversión al plan Pro ($19/mes).

---

## Tech Stack

| Categoría | Tecnología | Versión |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.1.2 |
| **Runtime UI** | React | 19.2.3 |
| **Lenguaje** | TypeScript | ^5 |
| **Estilos** | Tailwind CSS | ^4 |
| **Base de datos / Auth** | Supabase (PostgreSQL + Auth) | `supabase-js` ^2.90 |
| **SSR Auth** | `@supabase/ssr` | ^0.8.0 |
| **Pagos** | Stripe (Checkout + Billing Portal) | ^20.2.0 |
| **UI Components** | Radix UI (Primitives) | varios |
| **Iconos** | Lucide React | ^0.562.0 |
| **Notificaciones** | Sonner (Toast) | ^2.0.7 |
| **Tema** | next-themes | ^0.4.6 |
| **Tipografía** | Inter (Google Fonts) | — |

---

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<tu-service-role-key>

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **⚠ Importante:** `SUPABASE_SERVICE_ROLE_KEY` solo se usa en el servidor (webhook handler). Nunca debe exponerse al cliente.

---

## Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales reales

# 3. Levantar el servidor de desarrollo
npm run dev

# La app estará disponible en http://localhost:3000
```

### Configuración de Supabase

En tu proyecto de Supabase, crea las siguientes tablas:

```sql
-- Perfiles de usuario (linked a auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clientes
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Proyectos
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'in-progress',
  value NUMERIC DEFAULT 0,
  deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Facturas
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Propuestas
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  value NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Configuración de Stripe

```bash
# Escuchar webhooks en local (requiere Stripe CLI)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Los eventos manejados son:
- `checkout.session.completed` → activa plan Pro
- `customer.subscription.deleted` → degrada a plan Free

---

## Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Inicia el servidor producción |
| `npm run lint` | Análisis estático de código |

---

## Roadmap Actual (TODOs detectados en código)

- `customer.subscription.updated` está manejado parcialmente — la lógica de degradación por `past_due` no está implementada.
- El middleware de autenticación (`middleware.ts`) actualmente **no protege rutas** — cualquier usuario puede acceder al dashboard sin sesión activa.
- No existe una página de error `auth/auth-code-error` definida (referenciada pero no encontrada en el árbol).
- Los campos de la tabla `clients` no tienen datos de eliminación/edición — solo se permite agregar.
- Ausencia de Row Level Security (RLS) documentada — se asume que debe configurarse en Supabase.

# FreeFlow CRM: The Freelance Operating System

> **Business Solution** — Una infraestructura unificada diseñada para eliminar la fragmentación operativa del freelancer profesional. Gestiona el ciclo de vida completo del negocio: **Prospección de Clientes → Cierre de Propuestas → Ejecución de Proyectos → Facturación Automatizada.**

---

## 🚀 Demo de Producto (Recruiter UX)

He diseñado una experiencia optimizada para reclutadores técnicos. Haz clic en el enlace de abajo para acceder instantáneamente a un panel con datos reales sin necesidad de registro:

**Acceso Directo:** [https://freeflow-crm-smvr.vercel.app/login?demo=true]

> [!NOTE]
> Al entrar vía este enlace, la plataforma detecta el parámetro asíncronamente y autentica una sesión demo contra Supabase Auth, mostrando un estado de carga dedicado.

---

## Arquitectura de Producto

FreeFlow CRM no es solo una base de datos; es un sistema de orquestación financiera y operativa construido sobre un stack moderno y escalable.

### 1. Sistema de Control Operativo
- **Gestión Multi-Entidad**: Orquestación integral de Clientes, Proyectos, Facturas e Invoices con integridad referencial a nivel de Postgres.
- **KPI Dashboard**: Agregación de métricas críticas en el servidor (Revenue, Pipeline, ARPU) para una toma de decisiones informada.

### 2. Motor de Monetización (Freemium-Led Growth)
Integración nativa con **Stripe Billing** para gestionar el flujo de ingresos:
- **Modelo PLG**: Limitación estratégica a 5 clientes en el plan Free, forzando la conversión a Pro para negocios en crecimiento.
- **Stripe Checkout & Customer Portal**: Gestión delegada de suscripciones, métodos de pago y facturas históricas.
- **Sincronización Transaccional**: Manejo de webhooks firmados para sincronizar el estado de la suscripción (active, past_due, canceled) en tiempo real con la base de datos.

### 3. Seguridad de Datos Proactiva
- **Aislamiento de Inquilinos (Multi-tenancy)**: Implementación estricta de **Row Level Security (RLS)** en Postgres, garantizando que un usuario jamás acceda a los datos de otro.
- **Protección de Rutas**: Middleware configurado a nivel de Edge para validar la sesión antes de renderizar cualquier segmento crítico del dashboard.

---

## Stack Tecnológico

| Categoría | Tecnología | Justificación Técnica |
|---|---|---|
| **Framework** | Next.js 15+ (App Router) | Optimización de LCP mediante Server Components y mutaciones atómicas con Server Actions. |
| **BaaS / Infra** | Supabase (Postgres + Auth) | Backend serverless con persistencia robusta, autenticación PKCE y almacenamiento de cookies seguro. |
| **Pagos** | Stripe | Infraestructura financiera escalable con SDK nativa de Node.js. |
| **UI System** | Tailwind CSS 4 + Shadcn UI | Sistema de diseño atómico basado en variables CSS para facilitar el mantenimiento. |
| **UX / Feedback** | Sonner & Lucide | Comunicación visual de estados mediante micro-interacciones y notificaciones no intrusivas. |

---

## Despliegue y Desarrollo Local

### Requisitos Previos
- Cuenta en Supabase (DB + Auth).
- Cuenta en Stripe (Modo Test).

### Instalación
1. Clonar el repositorio.
2. Instalar dependencias: `npm install`.
3. Configurar `.env.local`:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   
   # Stripe
   STRIPE_SECRET_KEY=...
   STRIPE_WEBHOOK_SECRET=...
   
   # Recruiter Demo
   NEXT_PUBLIC_DEMO_EMAIL=demo@test.com
   NEXT_PUBLIC_DEMO_PASSWORD=Demo1234
   ```
4. Levantar servidor: `npm run dev`.

---

## Comandos de Ingeniería

- `npm run dev`: Instancia de desarrollo local.
- `npm run build`: Compilación optimizada para producción.
- `npm run lint`: Auditoría de calidad de código bajo estándares modernos.


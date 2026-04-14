-- SQL Migration: 20260414_schema_and_rls.sql
-- Objetivo: Endurecer la seguridad mediante RLS (Row Level Security)

-- 1. Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- 2. Políticas para PROFILES
-- Los usuarios pueden leer su propio perfil
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil (solo ciertos campos en realidad, pero aquí simplificado)
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- 3. Políticas para CLIENTS
CREATE POLICY "Users can manage own clients" 
ON clients FOR ALL 
USING (auth.uid() = user_id);

-- 4. Políticas para PROJECTS
CREATE POLICY "Users can manage own projects" 
ON projects FOR ALL 
USING (auth.uid() = user_id);

-- 5. Políticas para INVOICES
CREATE POLICY "Users can manage own invoices" 
ON invoices FOR ALL 
USING (auth.uid() = user_id);

-- 6. Políticas para PROPOSALS
CREATE POLICY "Users can manage own proposals" 
ON proposals FOR ALL 
USING (auth.uid() = user_id);

-- 7. IMPORTANTE: Bypass para el Service Role (Webhooks de Stripe)
-- Por defecto el Service Role de Supabase bypasea RLS, lo cual es correcto
-- para la lógica del adminClient en src/lib/supabase-admin.ts

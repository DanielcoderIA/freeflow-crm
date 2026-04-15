"use client";
import React, { useState, useEffect } from "react";
import {
  Terminal,
  ArrowRight,
  LayoutDashboard,
  Wallet,
  Users,
  Clock,
  CheckCircle2,
  BarChart3,
  Moon,
  Zap,
  ShieldCheck,
  Globe,
  Play
} from "lucide-react";

/**
 * FreeFlow CRM - Landing Page
 * Tipografía: Inter (Importada para coincidir con el dashboard de la imagen)
 */

const App = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Inyectar Google Fonts: Inter
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#F3F4F6]" />;

  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] text-[#1E293B] font-['Inter',sans-serif] selection:bg-blue-100 selection:text-blue-900">

      {/* Fondo Sutil con Blur */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-50/50 blur-[100px]" />
      </div>

      {/* Navbar Minimalista Centralizado */}
      <nav className="relative z-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-center items-center">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold tracking-tight text-xl text-slate-900">
              FreeFlow <span className="text-blue-600">CRM</span>
            </span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-32">

        {/* Hero Section - Enfoque tipográfico */}
        <div className="text-center space-y-8 mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
            </span>
            Versión Actualizada 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-[800] tracking-[-0.04em] text-slate-900 leading-[1.05]">
            Gestiona proyectos <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">sin fricciones.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
            La claridad de un dashboard profesional diseñada para freelancers. Todo bajo control en una sola interfaz limpia y rápida.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/login"
              className="w-full sm:w-auto h-14 px-10 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200 tracking-tight"
            >
              Empezar ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/login?demo=true"
              className="w-full sm:w-auto h-14 px-10 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group tracking-tight"
            >
              Ver demo
              <Play className="w-4 h-4 fill-current text-slate-400 group-hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>

        {/* Visual Mockup - Stats Cards (Estilo imagen del usuario) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {/* Card Ingresos */}
          <div className="bg-white p-7 rounded-[24px] border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-5">
              <div className="p-2.5 bg-emerald-50 rounded-xl">
                <Wallet className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded tracking-wider">TOTAL</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">$25,400.00</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Cobrado este mes</div>
          </div>

          {/* Card Clientes */}
          <div className="bg-white p-7 rounded-[24px] border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-5">
              <div className="p-2.5 bg-violet-50 rounded-xl">
                <Users className="w-5 h-5 text-violet-600" />
              </div>
              <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded tracking-wider">ACTIVOS</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">12 Clientes</div>
            <div className="text-xs font-medium text-slate-400 mt-1">2 nuevos hoy</div>
          </div>

          {/* Card Pipeline */}
          <div className="bg-white p-7 rounded-[24px] border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-5">
              <div className="p-2.5 bg-blue-50 rounded-xl">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded tracking-wider">PIPELINE</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">$415,188.00</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Proyectos activos</div>
          </div>

          {/* Card Pendiente */}
          <div className="bg-white p-7 rounded-[24px] border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-5">
              <div className="p-2.5 bg-orange-50 rounded-xl">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded tracking-wider">PENDIENTE</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">$401,000.00</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Esperando pago</div>
          </div>
        </div>

        {/* Feature Section: Bento Grid Refinado */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white rounded-[40px] border border-slate-100 p-10 md:p-14 shadow-sm">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold mb-5 text-slate-900 tracking-tight">Claridad en tu flujo</h3>
              <p className="text-slate-500 mb-10 text-lg leading-relaxed font-normal">
                Sin distracciones innecesarias. Una vista unificada para tus finanzas y clientes basada en la simplicidad.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { text: 'Pipeline visualizado', icon: BarChart3 },
                  { text: 'Estado en tiempo real', icon: Zap },
                  { text: 'Seguridad avanzada', icon: ShieldCheck },
                  { text: 'Acceso global', icon: Globe }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-100 text-[15px] font-semibold text-slate-700">
                    <item.icon className="w-5 h-5 text-blue-600" /> {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>

            <div className="relative z-10 text-center space-y-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                <LayoutDashboard className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Modo Noche</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed px-4">
                Interfaz adaptativa diseñada para proteger tu vista durante sesiones nocturnas.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="py-20 bg-transparent border-t border-slate-100/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block p-2 bg-slate-50 rounded-lg mb-6">
            <Terminal className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase">
            FreeFlow CRM © 2026 • Productividad Pura
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
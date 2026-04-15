"use client"; // <--- ESTA ES LA LÍNEA QUE FALTABA

import React, { useState, useEffect } from "react";
import {
  Terminal,
  ArrowRight,
  Layers,
  ShieldCheck,
  Activity,
  LayoutDashboard,
  Wallet,
  Clock,
  Database
} from "lucide-react";

/**
 * Landing Page Ultra-Professional - FreeFlow CRM
 * Corregida con directiva "use client" para evitar errores de Build.
 */

const App = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#F8FAFC]" />;

  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">

      {/* 1. Fondo de Ingeniería */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#F8FAFC]/50 to-[#F8FAFC]" />
      </div>

      {/* 2. Header Minimalista */}
      <nav className="relative z-20 flex justify-center items-center max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="w-11 h-11 bg-[#1E293B] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/10 border border-slate-700 transition-transform duration-500 group-hover:scale-105">
            <Terminal className="w-5 h-5 text-blue-100" />
          </div>
          <span className="font-[900] tracking-tighter text-2xl uppercase text-[#0F172A]">FreeFlow <span className="text-blue-600">CRM</span></span>
        </div>
      </nav>

      {/* 3. Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-32 flex flex-col items-center">

        {/* Status Chip */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            V1.0 High-Performance Build
          </div>
        </div>

        {/* Headline Monumental */}
        <div className="text-center space-y-8 mb-24 max-w-5xl">
          <h1 className="text-7xl md:text-8xl lg:text-[120px] font-[1000] tracking-[-0.06em] leading-[0.8] text-[#0F172A]">
            Entiende tu flujo. <br />
            <span className="text-blue-600">Sin ruido.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed">
            La infraestructura operativa diseñada para freelancers que exigen <span className="text-slate-900 font-bold underline decoration-blue-500/10 underline-offset-8">integridad técnica</span> y control absoluto.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-6xl">
          <div className="md:col-span-8 bg-white rounded-[40px] border border-slate-200/60 p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:border-blue-200 transition-all duration-500">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 transition-colors group-hover:bg-blue-50">
                <LayoutDashboard className="w-7 h-7 text-blue-600" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black tracking-tighter text-[#0F172A]">Core Engine</h3>
                <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                  Orquestación de clientes, proyectos y facturación unificada. Un sistema de una sola fuente de verdad para tu negocio independiente.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-12">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <Database className="w-3.5 h-3.5 text-blue-500" /> RLS Verified
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <Activity className="w-3.5 h-3.5 text-blue-500" /> Real-time Sync
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 bg-white rounded-[40px] border border-slate-200/60 p-10 shadow-sm flex flex-col justify-center items-center text-center group hover:border-blue-200 transition-all">
              <Wallet className="w-7 h-7 text-blue-600 mb-6" />
              <div className="text-4xl font-black tracking-tighter text-[#0F172A]">$0.00</div>
              <div className="text-[11px] uppercase font-bold tracking-[0.2em] text-slate-400 mt-2">Revenue Node</div>
            </div>
            <div className="flex-1 bg-[#1E293B] rounded-[40px] p-10 shadow-2xl shadow-blue-900/20 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-black text-white tracking-tighter italic">Active</div>
              <div className="text-[11px] uppercase font-bold tracking-[0.2em] text-blue-300/40 mt-2">Pipeline Status</div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-8 mt-24 w-full sm:w-auto">
          <a
            href="/login?register=true"
            className="group relative flex items-center justify-center h-20 px-16 text-xl font-black bg-[#1E293B] text-white rounded-[2rem] transition-all hover:bg-black hover:-translate-y-1 shadow-[0_25px_50px_-12px_rgba(30,41,59,0.4)] active:scale-95 no-underline w-full sm:w-auto"
          >
            <span className="relative flex items-center gap-3">
              Comenzar Protocolo
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </span>
          </a>

          <a
            href="/login"
            className="flex items-center justify-center h-20 px-14 text-lg font-bold text-[#1E293B] bg-transparent rounded-[2rem] border-2 border-slate-200 transition-all hover:bg-white hover:border-slate-300 active:scale-95 no-underline w-full sm:w-auto text-center"
          >
            Acceder
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="h-[1px] w-24 bg-slate-200" />
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 opacity-30">
              <Terminal className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#0F172A]">FreeFlow OS</span>
            </div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
              No UI clutter. Just pure infrastructure. 2026.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
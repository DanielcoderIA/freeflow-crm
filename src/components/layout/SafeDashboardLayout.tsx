"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function SafeDashboardLayout({ children, }: { children: React.ReactNode; }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* SIDEBAR WRAPPER: 
          - Fixed position.
          - Mobile: Hidden by default (-translate-x-full), slides in when open.
          - Desktop (lg): Always visible (translate-x-0).
      */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
                <Sidebar />
            </div>
            {/* MAIN CONTENT WRAPPER:
          - Pushed 64 (16rem/256px) to the right on Desktop ONLY.
          - Flex column to hold Header and Page Content.
      */}
            <div className="flex flex-col min-h-screen transition-all duration-300 lg:pl-64 w-full">

                {/* Header receives the toggle function */}
                <Header />
                {/* PAGE CONTENT: The 'children' inject here */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

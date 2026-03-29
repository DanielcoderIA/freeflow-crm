import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function SafeDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar: Visible solo en escritorio (lg) */}
            <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 border-r bg-white dark:bg-gray-950">
                <Sidebar />
            </aside>

            {/* Contenido Principal */}
            <div className="flex flex-1 flex-col lg:pl-64 w-full">
                <Header /> 
                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
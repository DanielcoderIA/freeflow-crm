
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DollarSign, Users, TrendingUp, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface SafeDashboardProps {
    monthlyRevenue: number;
    activeClientsCount: number;
    outstandingInvoices: number;
    pipelineValue: number;
    recentProjects: any[];
}

export function SafeDashboard({
    monthlyRevenue,
    activeClientsCount,
    outstandingInvoices,
    pipelineValue,
    recentProjects,
}: SafeDashboardProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="p-8 text-muted-foreground animate-pulse">Summoning your financial insights...</div>;
    }

    return (
        <main className="flex flex-1 flex-col gap-6" suppressHydrationWarning>
            {/* KPI GRID */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

                {/* 1. INGRESOS TOTALES */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <span className="text-sm font-medium">Ingresos Totales</span>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold" suppressHydrationWarning>
                        {formatCurrency(monthlyRevenue)}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                        Cobrado de facturas
                    </p>
                </div>

                {/* 2. VALOR DEL PIPELINE */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <span className="text-sm font-medium">Valor del Pipeline</span>
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold" suppressHydrationWarning>
                        {formatCurrency(pipelineValue)}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                        Proyectos activos
                    </p>
                </div>

                {/* 3. CLIENTES ACTIVOS */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <span className="text-sm font-medium">Clientes Activos</span>
                        <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold" suppressHydrationWarning>
                        {activeClientsCount || 0}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                        Contratos actuales
                    </p>
                </div>

                {/* 4. PENDIENTE */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <span className="text-sm font-medium">Pendiente</span>
                        <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold" suppressHydrationWarning>
                        {formatCurrency(outstandingInvoices)}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                        Esperando pago
                    </p>
                </div>
            </div>

            {/* RECENT PROJECTS SECTION */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Proyectos Recientes</h3>
                    <p className="text-sm text-gray-500">Últimas actualizaciones de tus proyectos activos.</p>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead className="hidden md:table-cell">Project</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Deadline</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentProjects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No projects found. Time to close some deals!
                                </TableCell>
                            </TableRow>
                        ) : (
                            recentProjects.map((project: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {(project.clients as any)?.name || "Unknown Client"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {project.name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <span className={`
                                            inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase
                                            ${project.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                                            ${project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : ''}
                                            ${project.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                            ${!['completed', 'in-progress', 'cancelled'].includes(project.status) ? 'bg-gray-100 text-gray-800' : ''}
                                        `}>
                                            {project.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell" suppressHydrationWarning>
                                        {project.deadline
                                            ? new Date(project.deadline).toLocaleDateString()
                                            : "No deadline"}
                                    </TableCell>
                                    <TableCell className="text-right font-medium" suppressHydrationWarning>
                                        {formatCurrency(project.value)}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </main>
    );
}

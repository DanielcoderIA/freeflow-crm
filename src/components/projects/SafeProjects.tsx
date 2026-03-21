"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/format";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ProjectFormDialog } from "@/components/projects/ProjectFormDialog";
import { ProjectActionsMenu } from "@/components/projects/ProjectActionsMenu";

interface SafeProjectsProps {
    projects: any[] | null;
    clients: { id: string; name: string }[] | null;
}

export function SafeProjects({ projects, clients }: SafeProjectsProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="p-8 text-muted-foreground animate-pulse">Initializing projects workbench...</div>;
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8" suppressHydrationWarning>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
                <ProjectFormDialog clients={clients || []} />
            </div>

            {/* Mobile Card View */}
            <div className="grid gap-4 md:hidden">
                {projects?.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            No projects found.
                        </CardContent>
                    </Card>
                ) : (
                    projects?.map((project) => (
                        <Card key={project.id}>
                            <CardHeader className="p-4 pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base">{project.name}</CardTitle>
                                        <CardDescription>{(project.clients as any)?.name || "Unknown"}</CardDescription>
                                    </div>
                                    <ProjectActionsMenu projectId={project.id} />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 uppercase">
                                        {project.status}
                                    </span>
                                    <span className="font-semibold" suppressHydrationWarning>{formatCurrency(project.value)}</span>
                                </div>
                                <div className="text-xs text-muted-foreground" suppressHydrationWarning>
                                    Due: {project.deadline ? new Date(project.deadline).toLocaleDateString() : "-"}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Desktop Table View */}
            <Card className="hidden md:block">
                <CardHeader>
                    <CardTitle>Project List</CardTitle>
                    <CardDescription>
                        Track status and deadlines for all client work.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center h-24 text-muted-foreground"
                                    >
                                        No projects found. Start a new one!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects?.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">
                                            {project.name}
                                        </TableCell>
                                        <TableCell>
                                            {(project.clients as any)?.name || "Unknown"}
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 uppercase">
                                                {project.status}
                                            </span>
                                        </TableCell>
                                        <TableCell suppressHydrationWarning>
                                            {project.deadline
                                                ? new Date(project.deadline).toLocaleDateString()
                                                : "-"}
                                        </TableCell>
                                        <TableCell className="text-right font-semibold" suppressHydrationWarning>
                                            {formatCurrency(project.value)}
                                        </TableCell>
                                        <TableCell>
                                            <ProjectActionsMenu projectId={project.id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}

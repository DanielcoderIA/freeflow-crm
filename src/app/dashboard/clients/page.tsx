'use client';
import { createClient } from "@/lib/server-supabase";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
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
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";

export default async function ClientsPage() {
    const supabase = await createClient();
    const { data: clients } = await supabase.from("clients").select("*").order('created_at', { ascending: false });

    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
            <Sidebar className="hidden w-64 border-r lg:block" />
            <div className="flex flex-1 flex-col">
                <Header onMenuClick={() => {}} />
                                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold md:text-2xl">Clients</h1>
                        <ClientFormDialog />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Client List</CardTitle>
                            <CardDescription>
                                Manage your relationships and contacts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clients?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                                No clients found. Add your first one!
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        clients?.map((client) => (
                                            <TableRow key={client.id}>
                                                <TableCell className="font-medium">{client.name}</TableCell>
                                                <TableCell>{client.company || '-'}</TableCell>
                                                <TableCell>{client.email || '-'}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 capitalize">
                                                        {client.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}

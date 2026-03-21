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
import { Badge } from "@/components/ui/badge";
import { InvoiceFormDialog } from "@/components/invoices/InvoiceFormDialog";
import { InvoiceActionsMenu } from "@/components/invoices/InvoiceActionsMenu";
import { Receipt, Clock, CheckCircle } from "lucide-react";

interface SafeInvoicesProps {
    invoices: any[] | null;
    clients: { id: string; name: string }[] | null;
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
}

export function SafeInvoices({
    invoices,
    clients,
    totalAmount,
    paidAmount,
    pendingAmount,
}: SafeInvoicesProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="p-8 text-muted-foreground italic">Readying your financial dashboard...</div>;
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8" suppressHydrationWarning>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl">Invoices</h1>
                    <p className="text-sm text-muted-foreground">
                        Track and manage your billings and collections.
                    </p>
                </div>
                <InvoiceFormDialog clients={clients || []} />
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 md:gap-8">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Gross volume generated</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-600">Paid</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(paidAmount)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Successfully collected funds</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-600">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingAmount)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Awaiting customer payment</p>
                    </CardContent>
                </Card>
            </div>

            {/* Mobile Card View */}
            <div className="grid gap-4 md:hidden">
                {invoices?.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            No invoices found.
                        </CardContent>
                    </Card>
                ) : (
                    invoices?.map((invoice) => (
                        <Card key={invoice.id}>
                            <CardHeader className="p-4 pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base text-mono">#{invoice.id.slice(0, 8)}</CardTitle>
                                        <CardDescription>{(invoice.clients as any)?.name || "Unknown"}</CardDescription>
                                    </div>
                                    <InvoiceActionsMenu invoiceId={invoice.id} />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                                <div className="flex justify-between items-center mb-2">
                                    <Badge
                                        variant={
                                            invoice.status === "paid"
                                                ? "success"
                                                : invoice.status === "overdue"
                                                    ? "destructive"
                                                    : "warning"
                                        }
                                        className="uppercase"
                                    >
                                        {invoice.status}
                                    </Badge>
                                    <span className="font-semibold" suppressHydrationWarning>{formatCurrency(invoice.amount)}</span>
                                </div>
                                <div className="text-xs text-muted-foreground" suppressHydrationWarning>
                                    Due: {new Date(invoice.due_date).toLocaleDateString()}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Desktop Table View */}
            <Card className="hidden md:block">
                <CardHeader>
                    <CardTitle>Invoice List</CardTitle>
                    <CardDescription>
                        A comprehensive log of all invoices sent to clients.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center h-24 text-muted-foreground"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <span>No invoices yet.</span>
                                            <InvoiceFormDialog clients={clients || []} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                invoices?.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            #{invoice.id.slice(0, 8)}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {(invoice.clients as any)?.name || "Unknown"}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    invoice.status === "paid"
                                                        ? "success"
                                                        : invoice.status === "overdue"
                                                            ? "destructive"
                                                            : "warning"
                                                }
                                                className="uppercase"
                                            >
                                                {invoice.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell suppressHydrationWarning>
                                            {new Date(invoice.due_date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right font-semibold" suppressHydrationWarning>
                                            {formatCurrency(invoice.amount)}
                                        </TableCell>
                                        <TableCell>
                                            <InvoiceActionsMenu invoiceId={invoice.id} />
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

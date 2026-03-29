
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
import { ProposalFormDialog } from "@/components/proposals/ProposalFormDialog";
import { ProposalActionsMenu } from "@/components/proposals/ProposalActionsMenu";
import { FileText, CheckCircle, Clock } from "lucide-react";

interface SafeProposalsProps {
    proposals: any[] | null;
    clients: { id: string; name: string }[] | null;
    totalSent: number;
    acceptedCount: number;
    pendingCount: number;
}

export function SafeProposals({
    proposals,
    clients,
    totalSent,
    acceptedCount,
    pendingCount,
}: SafeProposalsProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="p-8">Loading proposals...</div>;
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8" suppressHydrationWarning>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl">Proposals</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage and track your project proposals.
                    </p>
                </div>
                <ProposalFormDialog clients={clients || []} />
            </div>

            <div className="grid gap-4 md:grid-cols-3 md:gap-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSent}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-600">
                            Accepted
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {acceptedCount}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-600">
                            Pending
                        </CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {pendingCount}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Proposal Pipeline</CardTitle>
                    <CardDescription>
                        A list of all proposals sent to clients and their current status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Proposal Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {proposals?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center h-24 text-muted-foreground"
                                    >
                                        No proposals found. Create your first winning proposal!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                proposals?.map((proposal) => (
                                    <TableRow key={proposal.id}>
                                        <TableCell className="font-medium">
                                            {(proposal.clients as any)?.name || "Unknown"}
                                        </TableCell>
                                        <TableCell>{proposal.title}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    proposal.status === "accepted"
                                                        ? "success"
                                                        : proposal.status === "declined"
                                                            ? "destructive"
                                                            : "warning"
                                                }
                                                className="uppercase"
                                            >
                                                {proposal.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(proposal.value)}
                                        </TableCell>
                                        <TableCell>
                                            <ProposalActionsMenu proposalId={proposal.id} />
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

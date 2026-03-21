"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, X, Trash } from "lucide-react";
import { updateProposalStatus, deleteProposal } from "@/app/dashboard/proposals/actions";
import { toast } from "sonner";

interface ProposalActionsMenuProps {
    proposalId: string;
}

export function ProposalActionsMenu({ proposalId }: ProposalActionsMenuProps) {
    async function handleStatusUpdate(status: string) {
        try {
            await updateProposalStatus(proposalId, status);
            toast.success(`Proposal marked as ${status}`);
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        }
    }

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this proposal?")) {
            try {
                await deleteProposal(proposalId);
                toast.success("Proposal deleted");
            } catch (error: any) {
                toast.error(error.message || "Failed to delete proposal");
            }
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleStatusUpdate("accepted")} className="text-green-600">
                    <Check className="mr-2 h-4 w-4" />
                    Mark Accepted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusUpdate("declined")} className="text-red-600">
                    <X className="mr-2 h-4 w-4" />
                    Mark Declined
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Proposal
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle, Clock, Trash } from "lucide-react";
import { updateInvoiceStatus, deleteInvoice } from "@/app/dashboard/invoices/actions";
import { toast } from "sonner";

interface InvoiceActionsMenuProps {
    invoiceId: string;
}

export function InvoiceActionsMenu({ invoiceId }: InvoiceActionsMenuProps) {
    async function handleStatusUpdate(status: string) {
        try {
            await updateInvoiceStatus(invoiceId, status);
            toast.success(`Invoice marked as ${status}`);
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        }
    }

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this invoice?")) {
            try {
                await deleteInvoice(invoiceId);
                toast.success("Invoice deleted");
            } catch (error: any) {
                toast.error(error.message || "Failed to delete invoice");
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
                <DropdownMenuItem onClick={() => handleStatusUpdate("paid")} className="text-green-600">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Paid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusUpdate("pending")} className="text-yellow-600">
                    <Clock className="mr-2 h-4 w-4" />
                    Mark Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusUpdate("overdue")} className="text-red-600">
                    <Clock className="mr-2 h-4 w-4" />
                    Mark Overdue
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Invoice
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Receipt, ExternalLink } from "lucide-react";
import { createInvoiceFromProject } from "@/app/dashboard/projects/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProjectActionsMenuProps {
    projectId: string;
}

export function ProjectActionsMenu({ projectId }: ProjectActionsMenuProps) {
    const router = useRouter();

    async function handleGenerateInvoice() {
        try {
            const invoice = await createInvoiceFromProject(projectId);
            toast.success("Invoice generated successfully!");
            router.push("/dashboard/invoices");
        } catch (error: any) {
            toast.error(error.message || "Failed to generate invoice");
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
                <DropdownMenuItem onClick={handleGenerateInvoice}>
                    <Receipt className="mr-2 h-4 w-4" />
                    Generate Invoice
                </DropdownMenuItem>
                {/* Future actions like Edit or View Details could go here */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

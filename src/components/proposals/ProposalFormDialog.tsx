"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { addProposal } from "@/app/dashboard/proposals/actions";
import { toast } from "sonner";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create Proposal"}
        </Button>
    );
}

interface ProposalFormDialogProps {
    clients: { id: string; name: string }[];
}

export function ProposalFormDialog({ clients }: ProposalFormDialogProps) {
    const [open, setOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        try {
            await addProposal(formData);
            toast.success("Proposal created successfully!");
            setOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to create proposal");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Proposal
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95%] sm:max-w-lg">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Proposal</DialogTitle>
                        <DialogDescription>
                            Draft a new proposal for a client.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="clientId">Client</Label>
                            <Select name="clientId" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map((client) => (
                                        <SelectItem key={client.id} value={client.id}>
                                            {client.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Proposal Title</Label>
                            <Input id="title" name="title" placeholder="Project Alpha" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="value">Value ($)</Label>
                            <Input
                                id="value"
                                name="value"
                                type="number"
                                step="0.01"
                                placeholder="5000.00"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Briefly describe the proposal details..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

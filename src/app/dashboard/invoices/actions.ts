"use server";

import { createClient } from "@/lib/server-supabase";
import { revalidatePath } from "next/cache";

export async function addInvoice(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const clientId = formData.get("clientId") as string;
    const amount = formData.get("amount") as string;
    const dueDate = formData.get("dueDate") as string;
    const notes = formData.get("notes") as string;

    const { error } = await supabase
        .from("invoices")
        .insert({
            user_id: user.id,
            client_id: clientId,
            amount: parseFloat(amount),
            due_date: new Date(dueDate).toISOString(),
            notes,
            status: 'pending'
        });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/invoices");
}

export async function updateInvoiceStatus(invoiceId: string, status: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase
        .from("invoices")
        .update({ status })
        .eq("id", invoiceId)
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/invoices");
}

export async function deleteInvoice(invoiceId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", invoiceId)
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/invoices");
}

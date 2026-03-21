"use server";

import { createClient } from "@/lib/server-supabase";
import { revalidatePath } from "next/cache";

export async function addProposal(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const clientId = formData.get("clientId") as string;
    const title = formData.get("title") as string;
    const value = formData.get("value") as string;
    const description = formData.get("description") as string;

    const { error } = await supabase
        .from("proposals")
        .insert({
            user_id: user.id,
            client_id: clientId,
            title,
            value: parseFloat(value),
            description,
            status: 'pending'
        });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/proposals");
}

export async function updateProposalStatus(proposalId: string, status: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase
        .from("proposals")
        .update({ status })
        .eq("id", proposalId)
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/proposals");
}

export async function deleteProposal(proposalId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase
        .from("proposals")
        .delete()
        .eq("id", proposalId)
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/proposals");
}

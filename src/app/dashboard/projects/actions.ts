
import { createClient } from "@/lib/server-supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProject(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const name = formData.get("name") as string;
    const clientId = formData.get("clientId") as string;
    const status = formData.get("status") as string;
    const value = parseFloat(formData.get("value") as string);
    const deadline = formData.get("deadline") as string; // Optional

    const { error } = await supabase.from("projects").insert({
        user_id: user.id,
        client_id: clientId,
        name,
        status,
        value,
        deadline: deadline || null,
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard"); // Refresh dashboard widgets
    revalidatePath("/dashboard/projects"); // Refresh projects list
    return { success: true };
}

export async function createInvoiceFromProject(projectId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Fetch project details
    const { data: project, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

    if (fetchError || !project) {
        throw new Error("Project not found");
    }

    // Create a draft invoice (7 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const { data: invoice, error: insertError } = await supabase
        .from("invoices")
        .insert({
            user_id: user.id,
            client_id: project.client_id,
            project_id: project.id,
            amount: project.value,
            due_date: dueDate.toISOString(),
            status: "pending",
            notes: `Invoice generated from project: ${project.name}`
        })
        .select()
        .single();

    if (insertError) {
        throw new Error(insertError.message);
    }

    revalidatePath("/dashboard/invoices");
    return invoice;
}

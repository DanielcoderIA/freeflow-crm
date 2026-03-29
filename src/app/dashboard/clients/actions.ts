
import { createClient } from "@/lib/server-supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addClient(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;

    // [PHASE 3] Check Subscription Tier and Client Limit
    const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("id", user.id)
        .single();

    if (profile?.subscription_tier !== "pro") {
        const { count } = await supabase
            .from("clients")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id);

        if (count !== null && count >= 5) {
            throw new Error("Free plan limit reached (5 clients). Please upgrade to Pro.");
        }
    }

    const { error } = await supabase.from("clients").insert({
        user_id: user.id,
        name,
        email,
        phone,
        company,
        status: "active",
    });

    if (error) {
        throw new Error(error.message);
    }


    revalidatePath("/dashboard/clients");
    return { success: true };
}

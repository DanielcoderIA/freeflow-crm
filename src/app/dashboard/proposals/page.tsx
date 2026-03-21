import { createClient } from "@/lib/server-supabase";
import SafeDashboardLayout from "@/components/layout/SafeDashboardLayout";
import { SafeProposals } from "@/components/proposals/SafeProposals";

export default async function ProposalsPage() {
    const supabase = await createClient();

    // Fetch proposals with client details
    const { data: proposals } = await supabase
        .from("proposals")
        .select("*, clients(name)")
        .order("created_at", { ascending: false });

    // Fetch clients for the dropdown
    const { data: clients } = await supabase
        .from("clients")
        .select("id, name")
        .order("name");

    // Calculate Stats
    const totalSent = proposals?.length || 0;
    const acceptedCount = proposals?.filter((p) => p.status === "accepted").length || 0;
    const pendingCount = proposals?.filter((p) => p.status === "pending").length || 0;

    return (
        <SafeDashboardLayout>
            <SafeProposals
                proposals={proposals}
                clients={clients}
                totalSent={totalSent}
                acceptedCount={acceptedCount}
                pendingCount={pendingCount}
            />
        </SafeDashboardLayout>
    );
}

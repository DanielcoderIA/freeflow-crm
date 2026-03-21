import { createClient } from "@/lib/server-supabase";
import SafeDashboardLayout from "@/components/layout/SafeDashboardLayout";
import { SafeProjects } from "@/components/projects/SafeProjects";

export default async function ProjectsPage() {
    const supabase = await createClient();

    // Fetch projects with client details
    const { data: projects } = await supabase
        .from("projects")
        .select("*, clients(name)")
        .order("created_at", { ascending: false });

    // Fetch clients for the dropdown
    const { data: clients } = await supabase
        .from("clients")
        .select("id, name")
        .order("name");

    return (
        <SafeDashboardLayout>
            <SafeProjects projects={projects} clients={clients} />
        </SafeDashboardLayout>
    );
}

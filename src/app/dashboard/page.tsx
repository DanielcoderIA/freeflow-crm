import { createClient } from "@/lib/server-supabase";
import SafeDashboardLayout from "@/components/layout/SafeDashboardLayout";
import { SafeDashboard } from "@/components/dashboard/SafeDashboard";

export default async function Dashboard() {
  const supabase = await createClient();

  // Fetch Active Clients Count
  const { count: activeClientsCount } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  // Fetch Projects for Pipeline Value (summing all non-cancelled)
  const { data: projects } = await supabase
    .from("projects")
    .select("value, status, name, deadline, clients(name)");

  const pipelineValue = projects
    ?.filter((p) => p.status !== "cancelled")
    .reduce((acc, curr) => acc + (Number(curr.value) || 0), 0) || 0;

  // Fetch Paid Invoices for Revenue
  const { data: paidInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("status", "paid");

  const totalRevenue = paidInvoices?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;

  // Fetch Outstanding Invoices
  const { data: outstandingInvoicesData } = await supabase
    .from("invoices")
    .select("amount")
    .eq("status", "pending");

  const outstandingRevenue = outstandingInvoicesData?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;

  const recentProjects = projects?.slice(0, 5) || [];

  return (
    <SafeDashboardLayout>
      <SafeDashboard
        monthlyRevenue={totalRevenue}
        activeClientsCount={activeClientsCount || 0}
        outstandingInvoices={outstandingRevenue}
        pipelineValue={pipelineValue}
        recentProjects={recentProjects}
      />
    </SafeDashboardLayout>
  );
}

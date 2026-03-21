import { createClient } from "@/lib/server-supabase";
import SafeDashboardLayout from "@/components/layout/SafeDashboardLayout";
import { SafeInvoices } from "@/components/invoices/SafeInvoices";

export default async function InvoicesPage() {
    const supabase = await createClient();

    // Fetch invoices with client details
    const { data: invoices } = await supabase
        .from("invoices")
        .select("*, clients(name)")
        .order("created_at", { ascending: false });

    // Fetch clients for the dropdown
    const { data: clients } = await supabase
        .from("clients")
        .select("id, name")
        .order("name");

    // Calculate Financial Stats
    const totalAmount = invoices?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;
    const paidAmount = invoices
        ?.filter((inv) => inv.status === "paid")
        .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;
    const pendingAmount = invoices
        ?.filter((inv) => inv.status === "pending")
        .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;

    return (
        <SafeDashboardLayout>
            <SafeInvoices
                invoices={invoices}
                clients={clients}
                totalAmount={totalAmount}
                paidAmount={paidAmount}
                pendingAmount={pendingAmount}
            />
        </SafeDashboardLayout>
    );
}

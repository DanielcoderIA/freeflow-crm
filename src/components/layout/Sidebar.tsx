'use client';
import { useEffect, useState } from "react";
import { LayoutDashboard, Users, FolderKanban, Settings, DollarSign, FileText, CreditCard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
import { LogoutButton } from "@/components/auth/LogoutButton";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const [isPro, setIsPro] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        async function getProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("subscription_tier")
                    .eq("id", user.id)
                    .single();

                setIsPro(profile?.subscription_tier === "pro");
            }
        }
        getProfile();
    }, [supabase]);

    return (
        <div className={cn("pb-12 bg-gray-900 text-white min-h-screen", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="flex items-center justify-between mb-2 px-4">
                        <h2 className="text-lg font-semibold tracking-tight">
                            FreeFlow CRM
                        </h2>
                        {isPro && (
                            <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
                                PRO
                            </span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Link
                            href="/dashboard"
                            className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800"
                        >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/clients"
                            className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800"
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Clients
                        </Link>
                        <Link
                            href="/dashboard/projects"
                            className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800"
                        >
                            <FolderKanban className="mr-2 h-4 w-4" />
                            Projects
                        </Link>
                        <Link
                            href="/dashboard/invoices"
                            className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800"
                        >
                            <DollarSign className="mr-2 h-4 w-4" />
                            Invoices
                        </Link>
                        <Link
                            href="/dashboard/proposals"
                            className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Proposals
                        </Link>
                        <Link
                            href="/dashboard/settings"
                            className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800"
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Link>
                        <Link
                            href="/dashboard/billing"
                            className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800"
                        >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Billing
                        </Link>
                    </div>
                </div>
                <div className="px-3 py-2 mt-auto">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}

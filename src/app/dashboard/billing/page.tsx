// src/app/dashboard/billing/page.tsx
import { createClient } from "@/lib/server-supabase";
import SafeDashboardLayout from "@/components/layout/SafeDashboardLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// SOLO IMPORTAMOS EL COMPONENTE, NO LA ACCIÓN
import { UpgradeButton } from "@/components/billing/UpgradeButton";

export default async function BillingPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("id", user?.id)
        .single();

    const isPro = profile?.subscription_tier === "pro";

    return (
        <SafeDashboardLayout>
            <div className="flex flex-col gap-4 md:gap-8">
                <h1 className="text-2xl font-bold">Billing & Plans</h1>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Tarjeta Free */}
                    <Card className={!isPro ? "border-2 border-primary" : ""}>
                        <CardHeader>
                            <CardTitle>Free Plan</CardTitle>
                            <CardDescription>Perfect for getting started.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2 text-2xl font-bold">$0/mo</CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" disabled>
                                {!isPro ? "Current Plan" : "Basic Access"}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Tarjeta Pro */}
                    <Card className={isPro ? "border-2 border-primary" : ""}>
                        <CardHeader>
                            <CardTitle>Pro Plan</CardTitle>
                            <CardDescription>For serious freelancers scaling business.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2 text-2xl font-bold">$19/mo</CardContent>
                        <CardFooter>
                            {isPro ? (
                                <Button className="w-full" disabled>Active</Button>
                            ) : (
                                <UpgradeButton /> // <--- ESTO ES LO ÚNICO QUE DEBE HABER AQUÍ
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </SafeDashboardLayout>
    );
}
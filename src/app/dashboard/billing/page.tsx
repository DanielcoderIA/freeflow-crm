import { createClient } from "@/lib/server-supabase";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import { createCheckoutSession } from "./actions";

export default async function BillingPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Fetch profile to check subscription status
    const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("id", user?.id)
        .single();

    const isPro = profile?.subscription_tier === "pro";

    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
            <Sidebar className="hidden w-64 border-r lg:block" />
            <div className="flex flex-1 flex-col">
                <Header onMenuClick={() => {}} />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <h1 className="text-lg font-semibold md:text-2xl">Billing & Plans</h1>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Free Plan Card */}
                        <Card className={!isPro ? "border-2 border-primary" : ""}>
                            <CardHeader>
                                <CardTitle>Free Plan</CardTitle>
                                <CardDescription>Perfect for getting started.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="text-2xl font-bold">$0/mo</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-primary" />
                                    Up to 5 Clients
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-primary" />
                                    Basic Project Management
                                </div>
                            </CardContent>
                            <CardFooter>
                                {isPro ? (
                                    <Button variant="outline" className="w-full" disabled>Downgrade</Button>
                                ) : (
                                    <Button className="w-full" variant="outline" disabled>Current Plan</Button>
                                )}
                            </CardFooter>
                        </Card>

                        {/* Pro Plan Card */}
                        <Card className={isPro ? "border-2 border-primary" : ""}>
                            <CardHeader>
                                <CardTitle>Pro Plan</CardTitle>
                                <CardDescription>
                                    For serious freelancers scaling their business.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="text-2xl font-bold">$19/mo</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-primary" />
                                    Unlimited Clients
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-primary" />
                                    Advanced Analytics
                                </div>
                            </CardContent>
                            <CardFooter>
                                {isPro ? (
                                    <Button className="w-full" disabled>
                                        Active
                                    </Button>
                                ) : (
                                    <form action={createCheckoutSession} className="w-full">
                                        <Button type="submit" className="w-full">
                                            <CreditCard className="mr-2 h-4 w-4" /> Upgrade to Pro
                                        </Button>
                                    </form>
                                )}
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}

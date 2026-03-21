import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/server-supabase";
import { ThemeToggle } from "@/components/settings/ThemeToggle";
import { updateProfile, createPortalSession } from "./actions";
import { User, CreditCard, Paintbrush } from "lucide-react";

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return <div>Not authenticated</div>;
    }

    // Fetch profile data
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    const isPro = profile?.subscription_tier === "pro";

    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
            <Sidebar className="hidden w-64 border-r lg:block" />
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-4 md:p-8">
                    <div className="mx-auto max-w-4xl space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                            <p className="text-muted-foreground">
                                Manage your account settings and preferences.
                            </p>
                        </div>

                        <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
                            <TabsList className="flex md:flex-col items-start justify-start h-auto bg-transparent border-b md:border-b-0 md:border-r rounded-none p-0 md:w-48">
                                <TabsTrigger
                                    value="profile"
                                    className="w-full justify-start px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-none rounded-none"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="subscription"
                                    className="w-full justify-start px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-none rounded-none"
                                >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Subscription
                                </TabsTrigger>
                                <TabsTrigger
                                    value="appearance"
                                    className="w-full justify-start px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-none rounded-none"
                                >
                                    <Paintbrush className="mr-2 h-4 w-4" />
                                    Appearance
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex-1">
                                <TabsContent value="profile" className="m-0 space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Profile Information</CardTitle>
                                            <CardDescription>
                                                Update your personal details.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form action={updateProfile} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input
                                                        id="email"
                                                        value={user.email}
                                                        disabled
                                                        className="bg-slate-50 dark:bg-slate-900"
                                                    />
                                                    <p className="text-xs text-muted-foreground">
                                                        Email cannot be changed after registration.
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="fullName">Full Name</Label>
                                                    <Input
                                                        id="fullName"
                                                        name="fullName"
                                                        defaultValue={profile?.full_name || ""}
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <Button type="submit">Save Changes</Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="subscription" className="m-0 space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Subscription Plan</CardTitle>
                                            <CardDescription>
                                                Manage your current plan and billing details.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Plan</p>
                                                    <p className="text-xl font-bold uppercase">
                                                        {isPro ? "Pro Plan" : "Free Plan"}
                                                    </p>
                                                </div>
                                                <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                    {isPro ? "ACTIVE" : "LIMITED"}
                                                </div>
                                            </div>

                                            {isPro ? (
                                                <div className="space-y-4">
                                                    <p className="text-sm text-muted-foreground">
                                                        You are currently on the Pro Plan. You have access to unlimited clients and advanced features.
                                                    </p>
                                                    <form action={createPortalSession}>
                                                        <Button variant="outline" type="submit">
                                                            Manage Billing & Card
                                                        </Button>
                                                    </form>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <p className="text-sm text-muted-foreground">
                                                        You are currently on the Free Plan. Upgrade to Pro for unlimited clients and more tools.
                                                    </p>
                                                    <Button asChild>
                                                        <a href="/dashboard/billing">Upgrade to Pro</a>
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="appearance" className="m-0 space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Appearance Settings</CardTitle>
                                            <CardDescription>
                                                Customize how FreeFlow CRM looks for you.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-medium">Dark Mode</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Switch between light and dark themes.
                                                    </p>
                                                </div>
                                                <ThemeToggle />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    );
}

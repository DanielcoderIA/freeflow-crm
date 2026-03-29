'use client'; // Marcamos este como cliente

import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { createCheckoutSession } from "@/app/dashboard/billing/actions";

export function UpgradeButton() {
    return (
        <form action={createCheckoutSession} className="w-full">
            <Button type="submit" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" /> Upgrade to Pro
            </Button>
        </form>
    );
}
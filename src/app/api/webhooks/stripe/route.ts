import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const supabase = createAdminClient();

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Retrieve the subscription details to get the Stripe Subscription ID
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if (session.metadata?.userId) {
            await supabase
                .from("profiles")
                .update({
                    subscription_tier: "pro",
                    stripe_customer_id: session.customer as string,
                    stripe_subscription_id: subscription.id,
                })
                .eq("id", session.metadata.userId);
        }
    }

    if (event.type === "customer.subscription.updated") {
        const subscription = event.data.object as Stripe.Subscription;

        // Si la suscripción ya no está activa (past_due, unpaid, canceled)
        // se degrada al usuario al plan free.
        const isActive = subscription.status === 'active';
        const tier = isActive ? 'pro' : 'free';

        await supabase
            .from("profiles")
            .update({ subscription_tier: tier })
            .eq("stripe_subscription_id", subscription.id);
    }

    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;

        await supabase
            .from("profiles")
            .update({ subscription_tier: "free" })
            .eq("stripe_subscription_id", subscription.id);
    }

    return new NextResponse(null, { status: 200 });
}

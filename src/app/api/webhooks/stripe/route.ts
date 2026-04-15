import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase-admin";

// 1. Forzamos ruta dinámica para evitar el análisis estático del build
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    // 2. Inicialización LOCAL: Esto evita que falle si la API Key no está en el build
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
        apiVersion: '2025-01-27' as any,
    });

    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!webhookSecret || !signature) {
            // Durante el build, esto evitará que el proceso explote
            return new NextResponse("Webhook configuration missing", { status: 400 });
        }

        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const supabase = createAdminClient();

    // Procesamiento de eventos
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.metadata?.userId) {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
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
        const tier = subscription.status === 'active' ? 'pro' : 'free';
        await supabase
            .from("profiles")
            .update({ subscription_tier: tier })
            .eq("stripe_subscription_id", subscription.id);
    }

    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;
        await supabase
            .from("profiles")
            .update({
                subscription_tier: "free",
                stripe_subscription_id: null
            })
            .eq("stripe_subscription_id", subscription.id);
    }

    return new NextResponse(null, { status: 200 });
}
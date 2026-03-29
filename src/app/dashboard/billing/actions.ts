'use server';
import { createClient } from "@/lib/server-supabase";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSession() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    // Fetch profile to get existing stripe_customer_id if any (optional optim.)
    // For simplicity, we just create a session. Stripe handles customer creation or retrieval if we pass email.

    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "FreeFlow CRM Pro",
                        description: "Unlimited clients and advanced features",
                    },
                    unit_amount: 1900, // $19.00
                    recurring: {
                        interval: "month",
                    },
                },
                quantity: 1,
            },
        ],
        mode: "subscription",
        success_url: `${origin}/dashboard/billing?success=true`,
        cancel_url: `${origin}/dashboard/billing?canceled=true`,
        metadata: {
            userId: user.id,
        },
    });

    if (session.url) {
        redirect(session.url);
    }
}

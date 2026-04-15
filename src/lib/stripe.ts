import Stripe from 'stripe';

// El fallback 'sk_test_placeholder' evita que el build se rompa 
// cuando process.env no está disponible.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2025-01-27' as any,
    typescript: true,
});
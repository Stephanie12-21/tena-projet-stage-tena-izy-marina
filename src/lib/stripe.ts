import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!, {
  apiVersion: "2025-10-29.clover",
  typescript: true,
});
export default stripe;

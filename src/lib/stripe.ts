import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!, {
  apiVersion: "2025-09-30.clover",
  typescript: true,
});
export default stripe;

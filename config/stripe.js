const Stripe = require("stripe");

let stripe = null;
/**
 * For developers only : if stripe access key is not there, still the backend will
 * run (without stripe functionality)
 */
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.warn(
    "STRIPE_SECRET_KEY not found. Stripe functionality will be disabled."
  );
}

const checkStripeConnection = async () => {
  try {
    const balance = await stripe.balance.retrieve();
    console.log("Stripe Connected Successfully!", balance);
  } catch (error) {
    console.error("Stripe Connection Failed:", error.message);
  }
};

module.exports = {
  stripe,
  checkStripeConnection,
};

const express = require('express');
const { createDonation } = require('../../controllers/Forms/donationController.js');
const { validateDonation } = require('../../Validators/donationValidator.js');
const stripe = require('../../config/stripe.js');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../middleware/auth.js'); // Import auth middleware

const router = express.Router();

// Route for creating a donation (authenticated users only)
router.post(
  '/',
  authenticateUser,        // Require authentication
  validateDonation,
  createDonation
);

// Route for creating a payment intent (authenticated users only)
router.post('/create-payment-intent', authenticateUser, async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ message: 'Amount and currency are required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
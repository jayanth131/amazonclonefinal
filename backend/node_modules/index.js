// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stripePackage = require("stripe");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("❌ STRIPE_SECRET_KEY is not defined in your .env file.");
  process.exit(1);
}

const stripe = stripePackage(stripeSecretKey);

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("💰 Payment Request Received for amount >>>", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
    });

    console.log("✅ Created PaymentIntent:", paymentIntent.client_secret);

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("❌ Stripe Error:", error.message);
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

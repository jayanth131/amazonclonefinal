// index.js
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require('dotenv').config(); // At the top of the file

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey); // ✅ Real test secret key from Stripe

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("💰 Payment Request Received for amount >>>", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // e.g. 5000 = $50.00
      currency: "inr",
    });

    console.log("✅ Created PaymentIntent:", paymentIntent.client_secret);

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("❌ Stripe Error:", error.message);
    response.status(500).send({ error: error.message });
  }
});

// Expose the Express API as a single Cloud Function
exports.api = functions.https.onRequest(app);

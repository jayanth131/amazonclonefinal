// index.js
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51RMY3IRiXqTdx1bzAJS0LpzIR46cknyhbxF6jTKEFPtaf0iM8ywLEQAYiGabUY8bKsUSRQ5eZYSAd1kivTZUPis300gOcyff9F"); // ✅ Real test secret key from Stripe

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

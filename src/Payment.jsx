import React, { useEffect, useState } from 'react';
import { useStateValue } from './Stateproduct';
import Checkoutproduct from './Checkoutproduct';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from './axios';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const getBasketTotal = (basket) =>
    basket.reduce((amount, item) => amount + item.price * item.quantity, 0);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(getBasketTotal(basket));

  // Fetch client secret from backend
  useEffect(() => {
    const getClientSecret = async () => {
      const total = getBasketTotal(basket) * 100;
      console.log("🧮 Calculated basket total (in backend currency units):", total);

      try {
        const response = await axios.post(`/payments/create?total=${total}`);
        console.log("✅ Received clientSecret from backend:", response.data.clientSecret);
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("❌ Failed to fetch clientSecret:", err.message);
        setError("Failed to fetch payment authorization. Try again.");
      }
    };

    if (basket.length > 0) {
      getClientSecret();
    } else {
      console.log("🧺 Basket is empty. Skipping clientSecret fetch.");
    }
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    console.log("🚀 Payment submission started...");

    if (!stripe || !elements || !clientSecret) {
      console.error("⛔ Stripe not ready or missing clientSecret");
      setError("Payment setup is not complete.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    console.log("💳 CardElement fetched:", cardElement);
    console.log("🔑 clientSecret used in confirmCardPayment:", clientSecret);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user?.email || "no-email@example.com",
          },
        },
      });

      if (result.error) {
        console.error("❌ Payment failed:", result.error.message);
        setError(`Payment failed: ${result.error.message}`);
        setProcessing(false);
      } else {
        console.log("✅ Payment succeeded:", result.paymentIntent);
        const paymentIntent = result.paymentIntent;

        await setDoc(
          doc(db, 'users', user?.uid, 'orders', paymentIntent.id), // Correct path to nested doc
          {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          }
        );
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: 'EMPTY_BASKET'
        })

        alert(`✅ Payment successful${saveCard ? ' (Card saved)' : ''}`);
        navigate('/orders');
      }
    } catch (err) {
      console.error("💥 Payment exception:", err.message);
      setError("An unexpected error occurred.");
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
    console.log("✏️ CardElement changed:", event);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 md:px-12">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-6 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-500 border-b pb-4">
          Checkout ({basket?.length} items)
        </h2>

        {/* Delivery Address */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Delivery Address</h3>
          <div className="bg-orange-50 p-4 rounded-lg text-gray-800 space-y-1">
            <p>Hello, <span className="font-medium text-orange-700">{user?.email}</span></p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Review Items */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Review Items and Delivery</h3>
          {basket.map((item, index) => (
            <Checkoutproduct
              key={index}
              id={item.id}
              title={item.title}
              img={item.img}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))}
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Payment Method</h3>
          <div className="bg-orange-50 p-6 rounded-lg text-gray-700 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4 border border-gray-300 rounded-md bg-white shadow-sm">
                <CardElement
                  onChange={handleChange}
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#32325d',
                        '::placeholder': {
                          color: '#a0aec0',
                        },
                      },
                      invalid: {
                        color: '#e53e3e',
                      },
                    },
                  }}
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="saveCard" className="text-sm md:text-base">
                  Save card for future purchases
                </label>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <p className="text-lg">
                  Subtotal ({basket.length} items): <strong>{formattedTotal}</strong>
                </p>
                <button
                  type="submit"
                  disabled={processing || disabled || succeeded}
                  className="bg-orange-500 hover:bg-orange-600 transition text-white py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Processing...' : 'Buy Now'}
                </button>
              </div>

              {error && <div className="text-red-600 mt-2">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

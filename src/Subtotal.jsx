import React from 'react';
import { useStateValue } from './Stateproduct';
import { useNavigate } from 'react-router-dom';

const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => amount + item.price * item.quantity, 0);

const getTotalItemCount = (basket) =>
  basket.reduce((count, item) => count + item.quantity, 0);

function Subtotal() {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(getBasketTotal(basket));

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg border border-orange-300 w-full max-w-sm sticky top-24">
      <p className="text-sm text-gray-800 mb-4">
        Subtotal (
        <span className="font-semibold">{getTotalItemCount(basket)}</span> items):
        <strong className="ml-2 text-lg text-orange-600">{formattedTotal}</strong>
      </p>

      <button
        onClick={() => navigate('/payment')}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;

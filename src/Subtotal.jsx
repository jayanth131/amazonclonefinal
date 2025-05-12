import React from 'react';
import { useStateValue } from './Stateproduct';
import './subtotal.css';
import { useNavigate } from 'react-router-dom';

// ✅ Updated function to calculate total using quantity
const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => amount + item.price * item.quantity, 0);

// ✅ Updated function to calculate total item count
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
    <div className="subtotal">
      <p className='subtotalp'>
        Subtotal ({getTotalItemCount(basket)} items): <strong>{formattedTotal}</strong>
      </p>
      <small className="subtotal_gift">
        <input type="checkbox" className='input-box' />
        <p className='line'>This order contains a gift</p>
      </small>
      <button className='but' onClick={() => navigate('/payment')}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;

import React from 'react';
import './checkoutproduct.css';
import { useStateValue } from './Stateproduct';
import { toast } from 'react-toastify';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from './firebase'; // Assuming Firebase is initialized here

const db = getFirestore(app); // Initialize Firestore with the app

export default function Checkoutproduct({ id, img, title, price, rating, quantity }) {
  const [{ basket }, dispatch] = useStateValue();

  const updateFirebaseBasket = async (updatedBasket) => {
    const basketRef = doc(db, 'orders', 'currentBasket');
    try {
      await setDoc(basketRef, {
        items: updatedBasket,
        totalPrice: updatedBasket.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }, { merge: true });
      console.log('Firebase basket updated!');
    } catch (error) {
      console.error('Error updating Firebase:', error);
    }
  };

  const removeFromBasket = async () => {
    const confirmRemove = window.confirm(`Are you sure you want to remove ${title} from the basket?`);
    if (confirmRemove) {
      const updatedBasket = basket.filter(item => item.id !== id);
      dispatch({ type: 'REMOVE_FROM_BASKET', id });
      toast.info(`${title} removed from 🛒`);
      await updateFirebaseBasket(updatedBasket);
    }
  };

  const increaseQuantity = async () => {
    const updatedBasket = basket.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch({
      type: 'ADD_TO_BASKET',
      item: { id, title, img, price, rating },
    });
    await updateFirebaseBasket(updatedBasket);
  };

  const decreaseQuantity = async () => {
    if (quantity > 1) {
      const updatedBasket = basket.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      dispatch({ type: 'DECREASE_QUANTITY', id });
      await updateFirebaseBasket(updatedBasket);
    } else {
      const confirmRemove = window.confirm(`Are you sure you want to remove ${title} from the basket?`);
      if (confirmRemove) removeFromBasket();
    }
  };

  return (
    <div className="checkoutproduct">
      <img className="checkoutproduct__image" src={img} alt={title} />
      <div className="checkoutproduct_info">
        <p className="checkproduct_title">{title}</p>
        <p className="checkproduct_price">
          <small>₹</small><strong>{price}</strong>
        </p>
        <div className="flex items-center space-x-1 mt-2">
          {Array(rating).fill().map((_, i) => (
            <p key={i}>⭐</p>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={decreaseQuantity} className="px-2 py-1 border rounded">−</button>
          <span className="font-semibold">Qty: {quantity}</span>
          <button onClick={increaseQuantity} className="px-2 py-1 border rounded">+</button>
        </div>

        <button
          onClick={removeFromBasket}
          className="mt-4 self-start px-4 py-2 bg-orange-500 text-white font-semibold rounded"
        >
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

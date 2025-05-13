import React from 'react';
import { toast } from 'react-toastify';
import { useStateValue } from './Stateproduct';
import { useNavigate } from 'react-router-dom';

function Product({ id, img, title, price, rating }) {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const addToBasket = () => {
    if (!user) {
      toast.error("Please sign in to add items to your basket", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
      return navigate('/login');
    }

    dispatch({
      type: 'ADD_TO_BASKET',
      item: { id, title, img, price, rating },
    });

    toast.success(
      <div className="flex items-center text-white">
        <img
          src={img}
          alt={title}
          className="w-12 h-12 object-contain mr-3 border border-gray-300 rounded"
        />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-white-600">Added to your basket!</p>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "darkorange",
          color: 'white',
        },
      }
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between hover:shadow-xl transition duration-300 min-h-[400px]">
      <div className="mb-4 w-full h-48 flex items-center justify-center">
        <img src={img} alt={title} className="max-h-full object-contain" />
      </div>

      <div className="text-center flex-1 w-full">
        <p className="text-sm font-medium mb-2">{title}</p>
        <p className="text-lg font-semibold text-gray-800 mb-2">₹{price}</p>
        <div className="flex justify-center mb-4">
          {Array(rating).fill().map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
      </div>

      <button
        onClick={addToBasket}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition w-full"
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;

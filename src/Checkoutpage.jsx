import React from 'react';
import Subtotal from './Subtotal';
import { useStateValue } from './Stateproduct';
import Checkoutproduct from './Checkoutproduct';

export default function Checkoutpage() {
  const [{ basket }] = useStateValue();

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-4 gap-6">
      {/* Left Section */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
        <img
          className="w-full max-h-56 object-cover rounded-xl mb-6"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1.CB423492668_jpg"
          alt="Ad Banner"
        />

        {basket.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-orange-500 mb-4 underline">
              Your Shopping Basket is Empty
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              You have no items in your basket. To add items, click "Add to Basket" next to the product.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-orange-600 mb-5 border-b pb-2">
              Your Shopping Basket
            </h2>
            <div className="flex flex-col gap-6">
              {basket.map((item, index) => (
                <Checkoutproduct
                  key={index}
                  id={item.id}
                  title={item.title}
                  img={item.img}
                  price={item.price}
                  rating={item.rating}
                  quantity={item.quantity} // ✅ Pass quantity to child
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      {basket.length > 0 && (
        <div className="w-full md:w-1/3">
          <Subtotal />
        </div>
      )}
    </div>
  );
}

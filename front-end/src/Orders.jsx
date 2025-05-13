import React, { useEffect, useState } from 'react';
import { useStateValue } from './Stateproduct';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';

export default function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;

      try {
        const ordersRef = collection(db, 'users', user.uid, 'orders');
        const snapshot = await getDocs(ordersRef);
        const fetchedOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("⚠️ Error fetching orders:", err.message);
      } finally {
        setLoading(false); // Set loading to false when the data fetch is complete
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 md:px-12">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-6 space-y-8">
        <h2 className="text-3xl font-bold text-orange-500 border-b pb-4">Your Orders</h2>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-16 h-16 border-4 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* No Orders Message */}
        {!loading && orders.length === 0 && (
          <p className="text-gray-600">You have no orders yet.</p>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-lg shadow-sm p-4 space-y-4 bg-orange-50"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Order placed on:{" "}
                  <span className="font-semibold text-gray-800">
                    {moment(order.created * 1000).format("MMMM Do YYYY, h:mm a")}
                  </span>
                </p>
                <p className="text-sm font-medium text-orange-700">
                  Total: ₹{(order.amount / 100).toFixed(2)}
                </p>
              </div>

              <div className="space-y-4">
                {order.basket.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center gap-4 border-t pt-4"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-32 h-32 object-contain rounded"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                      <p>Quantity:{item.quantity}</p>

                      <p className="text-yellow-500">

                        {"⭐".repeat(item.rating)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

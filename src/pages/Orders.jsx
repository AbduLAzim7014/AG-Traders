import React from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No orders found</p>

          <Link
            to="/product"
            className="inline-block mt-4 bg-orange-500 text-white px-5 py-2 rounded"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div key={index} className="border rounded-lg p-5 shadow-sm">
              <div className="flex justify-between mb-3">
                <p className="font-semibold">Order ID : {order.id}</p>

                <p className="text-green-600">₹{order.total}</p>
              </div>

              <div className="text-sm text-gray-500 mb-3">
                Date : {order.date}
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-16 object-contain"
                    />

                    <div>
                      <p className="font-medium">{item.name}</p>

                      <p className="text-sm text-gray-500">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchOrders } from "../features/orderSlice";

export default function Orders() {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <p className="p-8">Loading your orders...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (orders.length === 0) return <p className="p-8">You have no orders yet.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <ul>
        {orders.map(({ _id, name, quantity, size, status, totalPrice, createdAt }) => (
          <li key={_id} className="border rounded p-4 mb-4 shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg">{name}</h3>
            {size && <p>Size: {size}</p>}
            <p>Quantity: {quantity}</p>
            {totalPrice !== undefined && <p>Total Price: ${totalPrice.toFixed(2)}</p>}
            <p>
              Status: <span className="capitalize">{status}</span>
            </p>
            <p className="text-sm text-gray-500">Ordered on: {new Date(createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

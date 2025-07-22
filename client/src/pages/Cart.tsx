import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeFromCart, updateQuantity, clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const token = localStorage.getItem("token");

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (productId: string, size: string | undefined, quantity: number) => {
    dispatch(updateQuantity({ productId, size, quantity }));
  };

  const handleCheckout = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      for (const item of items) {
        await axios.post(
          import.meta.env.VITE_API_URL + "/orders",
          {
            name: item.name,
            quantity: item.quantity,
            size: item.size,
            totalPrice: item.price * item.quantity,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      dispatch(clearCart());
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    }
  };

  if (items.length === 0) return <p className="p-8 text-center text-lg">Your cart is empty.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <ul>
        {items.map(({ productId, name, price, quantity, size, image }) => (
          <li key={productId + (size || "")} className="flex items-center mb-4 border p-4 rounded">
            <img src={image || "https://via.placeholder.com/80"} alt={name} className="w-20 h-20 object-cover rounded" />
            <div className="ml-4 flex-grow">
              <h3 className="font-semibold">{name}</h3>
              {size && <p className="text-sm text-gray-600">Size: {size}</p>}
              <p className="text-indigo-600 font-bold">${price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleQuantityChange(productId, size, quantity - 1)} className="border px-2 py-1 rounded">
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(productId, size, quantity + 1)} className="border px-2 py-1 rounded">
                +
              </button>
              <button onClick={() => dispatch(removeFromCart({ productId, size }))} className="ml-4 text-red-600 font-bold">
                X
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button onClick={handleCheckout} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
          Checkout
        </button>
      </div>
    </div>
  );
}

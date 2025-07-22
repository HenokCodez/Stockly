import React from "react";
import { useAppDispatch } from "../hooks";
import { addToCart } from "../features/cartSlice";

type Props = {
  productId: string;
  name: string;
  price: number;
  image?: string;
  size?: string;
};

export default function AddToCartButton({ productId, name, price, image, size }: Props) {
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(
      addToCart({
        productId,
        name,
        price,
        quantity: 1,
        size,
        image,
      })
    );
  };

  return (
    <button onClick={handleAdd} className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
      Add to Cart
    </button>
  );
}

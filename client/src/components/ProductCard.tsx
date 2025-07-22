import React from "react";
import AddToCartButton from "./AddToCartButton";

type Props = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

export default function ProductCard({ _id, name, price, image }: Props) {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
      <img src={image || "https://via.placeholder.com/300"} alt={name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-indigo-600 font-bold">${price.toFixed(2)}</p>
      <AddToCartButton productId={_id} name={name} price={price} image={image} />
    </div>
  );
}

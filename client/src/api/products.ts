import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/products";

export const fetchProducts = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

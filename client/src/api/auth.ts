import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/login`, data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res = await axios.post(API_URL, data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getMe = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

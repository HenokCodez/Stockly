import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="w-full border p-2 rounded" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {error && <p className="text-red-500">{error}</p>}
        <button className="w-full bg-indigo-600 text-white p-2 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

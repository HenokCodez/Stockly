import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { useAppSelector, useAppDispatch } from "./hooks";
import { logout } from "./features/authSlice";

export default function App() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <>
      <nav className="bg-indigo-600 text-white p-4 flex justify-between max-w-7xl mx-auto">
        <Link to="/" className="font-bold text-xl">
          MyShop
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="hover:underline">
            Cart
          </Link>
          {user ? (
            <>
              <span>Hi, {user.name}</span>
              <button onClick={() => dispatch(logout())} className="underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

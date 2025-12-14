import React, { useEffect, useState } from "react";
import axios from "axios";
import { SweetCard } from "../components/SweetCard.jsx";
import "./Home.css";

export const Home = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]); // Cart state

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sweets/");
        setSweets(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch sweets");
        setLoading(false);
      }
    };
    fetchSweets();
  }, []);

  const addToCart = (sweet) => {
    setCart((prev) => [...prev, sweet]); // add sweet to cart
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="home-page">
      
      <div className="main-content">
        {/* Sweets Grid */}
        <div className="sweets-grid">
          {sweets.map((s) => (
            <SweetCard key={s.id} sweet={s} addToCart={addToCart} />
          ))}
        </div>

        {/* Cart Sidebar */}
        <div className="cart-sidebar">
          <h2>Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <ul>
              {cart.map((item, idx) => (
                <li  className = "items-added" key={idx}>{item.name} - ₹{item.price}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

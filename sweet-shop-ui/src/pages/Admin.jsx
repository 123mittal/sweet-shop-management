import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import navigate
import "./Admin.css";

export const Admin = () => {
  const navigate = useNavigate(); // initialize navigate

  const [sweets, setSweets] = useState([
    {
      id: 1,
      name: "Ladoo",
      price: 50,
      quantity: 10,
      image: "https://via.placeholder.com/200?text=Ladoo",
    },
    {
      id: 2,
      name: "Barfi",
      price: 80,
      quantity: 5,
      image: "https://via.placeholder.com/200?text=Barfi",
    },
    {
      id: 3,
      name: "Gulab Jamun",
      price: 40,
      quantity: 12,
      image: "https://via.placeholder.com/200?text=Gulab+Jamun",
    },
  ]);

  const [newSweet, setNewSweet] = useState({
    name: "",
    price: "",
    image: "",
    quantity: 0,
  });

  const [restockQty, setRestockQty] = useState({});

  const handleAddSweet = (e) => {
    e.preventDefault();
    const id = sweets.length + 1;
    setSweets([...sweets, { id, ...newSweet }]);
    setNewSweet({ name: "", price: "", image: "", quantity: 0 });
  };

  const handleRestock = (id) => {
    const qty = Number(restockQty[id]);
    if (isNaN(qty) || qty <= 0) return;
    setSweets(
      sweets.map((s) => (s.id === id ? { ...s, quantity: s.quantity + qty } : s))
    );
    setRestockQty({ ...restockQty, [id]: "" });
  };

  const handleDelete = (id) => {
    setSweets(sweets.filter((s) => s.id !== id));
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn"); // remove admin login
    navigate("/"); // redirect to home
  };

  return (
    <div className="admin-page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin Panel</h1>
        <button className="log-out" onClick={handleLogout} style={{ padding: "8px 16px",cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <form className="admin-form" onSubmit={handleAddSweet}>
        <input
          type="text"
          placeholder="Sweet Name"
          value={newSweet.name}
          onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={newSweet.price}
          onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newSweet.image}
          onChange={(e) => setNewSweet({ ...newSweet, image: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newSweet.quantity}
          onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
          required
        />
        <button type="submit">Add Sweet</button>
      </form>

      <div className="admin-grid">
        {sweets.map((s) => (
          <div key={s.id} className="admin-card">
            <img src={s.image} alt={s.name} />
            <h3>{s.name}</h3>
            <p>Price: ₹{s.price}</p>
            <p>Quantity: {s.quantity}</p>

            <div className="restock-section">
              <input
                type="number"
                min="0"
                placeholder="Add Qty"
                value={restockQty[s.id] || ""}
                onChange={(e) =>
                  setRestockQty({ ...restockQty, [s.id]: e.target.value })
                }
              />
              <button className="restock-btn" onClick={() => handleRestock(s.id)}>
                Restock
              </button>
            </div>

            <button className="delete-btn" onClick={() => handleDelete(s.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

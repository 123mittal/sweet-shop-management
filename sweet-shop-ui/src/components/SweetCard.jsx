import React from "react";
import "./Sweetcard.css";

export const SweetCard = ({ sweet, addToCart }) => {
  return (
    <div className="sweet-card">
      <img
        src={sweet.image}
        alt={sweet.name}
        className="sweet-image"
      />
      <h3 className="sweet-name">{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Quantity: {sweet.quantity}</p>
      <button className="add-to-cart" onClick={() => addToCart(sweet)}>
        Add to Cart
      </button>
    </div>
  );
};

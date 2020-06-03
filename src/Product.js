import React, { useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ product, addToCart }) => {
  // Added a quantity selector
  // Pass the quantity as a parameter to addToCart
  const [quantity, setQuantity] = useState(0);

  const _addToCart = async () => {
    product.avail = product.avail - quantity;
    await addToCart(product, quantity);
    setQuantity(0);
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <li key={product.id}>
        <span>
          <Link to={`/product:${product.id}`}>{product.name} </Link>
        </span>
        <span>${Number(product.price).toFixed(2)}</span>
        <div>
          <label>Choose quantity:</label>
          <input
            key={product.id}
            value={quantity}
            onChange={(ev) => setQuantity(ev.target.value * 1)}
            id={product.id}
            type="number"
            name="quantity"
            min="0"
            max={product.avail}
          />
          <button type="button" disabled={!quantity} onClick={_addToCart}>
            Add to Cart
          </button>
        </div>
      </li>
    </form>
  );
};

export default Product;

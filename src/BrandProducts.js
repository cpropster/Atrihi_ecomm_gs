import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product.js";

const BrandProducts = (props) => {
  console.log(props);
  const brand = props.match.params.brand;
  const { addToCart } = props;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((_products) =>
        setProducts(
          _products.data.reduce((acc, product) => {
            if (`:${product.brand}` === brand) {
              acc.push(product);
            }
            return acc;
          }, [])
        )
      )
      .catch();
  }, []);
  console.log(products);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((_product) => {
          return (
            <Product
              key={_product.id}
              product={_product}
              addToCart={addToCart}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default BrandProducts;

import React, { useState } from "react";
import { Image, Card } from "react-bootstrap";

const Product = ({ product, addToCart }) => {
  return (
    <li key={product.id}>
      <a href={`/#/product:${product.id}`}>
        <Card border="light" href={`/product:${product.id}`} className="mb-5">
          <Image
            src={`../assets/img/productImgs/${product.brand.replace(
              " ",
              ""
            )}-${product.name.replace(" ", "")}-1.jpeg`}
            fluid
          />
          <span>{product.name}</span>
          <span>${Number(product.price).toFixed(2)}</span>
        </Card>
      </a>
    </li>
  );
};

export default Product;

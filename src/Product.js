import React from "react";
import { Image, Card } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const Product = ({ product, productVariants }) => {
  const productVariant = productVariants.find((pv) => {
    return pv.productId === product.id;
  });
  if (product && productVariants) {
    return (
      <>
        <li key={product.id}>
          <a href={`/#/product/:${product.id}`}>
            <Card border="light" className="mb-5 product-tile-container">
              <Image
                fluid
                src={productVariants.length && productVariant.image}
              />
              <span>{product.name}</span>
              <span>
                $
                {productVariants.length &&
                  Number(productVariant.price).toFixed(2)}
              </span>
            </Card>
          </a>
        </li>
      </>
    );
  }
};

export default Product;

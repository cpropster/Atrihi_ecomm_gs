import React from "react";
import { Image, Card } from "react-bootstrap";

const Product = ({ product, productVariants }) => {
  const productVariant = productVariants.find((pv) => {
    return pv.productId === product.id;
  });
  console.log(productVariant);
  if (product && productVariants) {
    return (
      <li key={product.id}>
        <a href={`/#/product:${product.id}`}>
          <Card border="light" href={`/product:${product.id}`} className="mb-5">
            <Image src={productVariants.length && productVariant.image} fluid />
            <span>{product.name}</span>
            <span>
              $
              {productVariants.length &&
                Number(productVariant.price).toFixed(2)}
            </span>
          </Card>
        </a>
      </li>
    );
  }
};

export default Product;

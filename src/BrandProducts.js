import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product.js";

const BrandProducts = ({ products, productVariants, addToCart, brand }) => {
  const brandProds = products.filter((product) => {
    return product.brand === localStorage.getItem("brand");
  });

  return (
    <Container className="mt-5">
      <Row>
        <h2 className="mx-5">All {brand || localStorage.getItem("brand")}</h2>
      </Row>
      <Row>
        {brandProds.map((product) => {
          return (
            <Col md={3} className="list-unstyled" key={product.id}>
              <Product
                key={product.id}
                product={product}
                addToCart={addToCart}
                productVariants={productVariants}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default BrandProducts;

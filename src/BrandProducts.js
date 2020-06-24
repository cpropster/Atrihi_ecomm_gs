import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "./Product.js";

const BrandProducts = ({ products, productVariants, addToCart, brand }) => {
  const brandProds = products.filter((product) => {
    return product.brand === brand;
  });
  console.log("products in brand products ", products);
  console.log("product vs in brand products ", productVariants);
  console.log("one comparison ", products[0]);
  console.log("brand in bp ", brand);

  return (
    <Container className="mt-5">
      <Row>
        <h2>All {brand}</h2>
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

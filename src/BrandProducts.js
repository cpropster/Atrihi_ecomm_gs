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
        <h2 className="mx-5 mb-5">
          All {brand || localStorage.getItem("brand")}
        </h2>
      </Row>
      <Row>
        {brandProds
          .sort((a, b) => {
            let fa = a.name.toLowerCase(),
              fb = b.name.toLowerCase();

            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          })
          .map((product) => {
            return (
              <Col
                md={4}
                className="list-unstyled product-card align-items-center"
                key={product.id}
              >
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

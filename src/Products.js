/* eslint-disable no-warning-comments */
import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import Product from "./Product.js";

const Products = ({ products, productVariants, addToCart }) => {
  return (
    <Container className="mt-5">
      <Row>
        <h2 className="mx-5 mb-5">All Products</h2>
      </Row>
      <Row>
        {products
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
                  productVariants={productVariants}
                  addToCart={addToCart}
                />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default Products;

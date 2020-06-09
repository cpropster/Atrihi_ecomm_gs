/* eslint-disable no-warning-comments */
import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import Product from "./Product.js";

const Products = ({ products, addToCart }) => {
  // TODO: Disable the addToCart button when available inventory reaches zero.
  // TODO: Update product.avail after Create Order event
  // Pass the quantity as a parameter to addToCart
  return (
    <Container className="mt-5">
      <Row>
        <h2>All Products</h2>
      </Row>
      <Row>
        {products.map((product) => {
          return (
            <Col md={4} className="list-unstyled">
              <Product
                key={product.id}
                product={product}
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

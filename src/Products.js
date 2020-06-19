/* eslint-disable no-warning-comments */
import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import Product from "./Product.js";

const Products = ({ products, productVariants, addToCart }) => {
  console.log("product variants in products ", productVariants);

  return (
    <Container className="mt-5">
      <Row>
        <h2>All Products</h2>
      </Row>
      <Row>
        {products.map((product) => {
          return (
            <Col md={3} className="list-unstyled" key={product.id}>
              <Product
                key={product.id}
                product={product}
                productVariant={productVariants.find((productV) => {
                  return productV.productId === product.id;
                })}
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

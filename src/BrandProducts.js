import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
    <Container className="mt-5">
      <Row>
        <h2>All Products</h2>
      </Row>
      <Row>
        {products.map((product) => {
          return (
            <Col md={4} className="list-unstyled" key={product.id}>
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

export default BrandProducts;

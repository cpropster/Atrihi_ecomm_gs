import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Form } from "react-bootstrap";
import axios from "axios";

const ProductDetails = (props) => {
  const id = props.match.params.id;
  const { addToCart } = props;
  //   const { toggleSearch } = props;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  // Added a quantity selector
  // Pass the quantity as a parameter to addToCart

  const _addToCart = async () => {
    product.avail = product.avail - quantity;
    await addToCart(product, quantity);
    setQuantity(0);
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
  };

  useEffect(() => {
    // if (
    //   !document.querySelector("#searchDisplay").classList.contains("hidden")
    // ) {
    //   toggleSearch();
    // }
    axios
      .get("/api/products")
      .then((products) =>
        setProduct(
          products.data.reduce((acc, _product) => {
            if (`:${_product.id}` === id) {
              acc = _product;
            }
            return acc;
          }, {})
        )
      )
      .catch();
  }, []);

  return (
    <Container>
      <Row>
        <Form onSubmit={onSubmit}>
          <li key={product.id}>
            <span>
              <Link to={`/product:${product.id}`}>{product.name} </Link>
            </span>
            <span>${Number(product.price).toFixed(2)}</span>
            <div>
              <Form.Label>Choose quantity:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantity"
                key={product.id}
                value={quantity}
                onChange={(ev) => setQuantity(ev.target.value * 1)}
                id={product.id}
                type="number"
                name="quantity"
                min="0"
                max={product.avail}
              />
              <button type="button" disabled={!quantity} onClick={_addToCart}>
                Add to Cart
              </button>
            </div>
          </li>
        </Form>
      </Row>
    </Container>
  );
};

export default ProductDetails;

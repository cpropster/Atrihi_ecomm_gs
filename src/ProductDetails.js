import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Form,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import axios from "axios";

const ProductDetails = (props) => {
  const id = props.match.params.id;
  const { addToCart } = props;
  // const { toggleSearch } = props;
  const [product, setProduct] = useState({});
  const [productVs, setProductVs] = useState([]);
  const [colors, setColors] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const _addToCart = async (ev) => {
    ev.preventDefault();
    product.avail = product.avail - quantity;
    await addToCart(product, quantity);
    setQuantity(0);
  };

  console.log("product variants in product details ", productVs);
  console.log("product in pd ", product);

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
          products.data.find((_product) => {
            return `:${_product.id}` === id;
          }) || {}
        )
      )
      .catch();
  }, []);

  useEffect(() => {
    if (product && product.id) {
      axios
        .get("/api/productVariants")
        .then((response) =>
          setProductVs(
            response.data.filter((productV) => {
              return productV.productId === product.id;
            })
          )
        )
        .catch();
    }
  }, [product]);

  return (
    <Container>
      <Row>
        <Form>
          <li key={product.id}>
            <span>
              <Link to={`/product:${product.id}`}>{product.name} </Link>
            </span>
            <span>${Number(product.price).toFixed(2)}</span>
            <div>
              <Form.Label>Choose quantity:</Form.Label>
              <Form.Control
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
              {/* look below note in slack short circuit so dont render until there is somethiung in the array */}
              {productVs.length && (
                <ToggleButtonGroup
                  type="radio"
                  name="sizes"
                  defaultValue={productVs[0].size}
                >
                  {productVs.map((pv) => {
                    return (
                      <ToggleButton key={pv.size} value={pv.size}>
                        {pv.size}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              )}
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

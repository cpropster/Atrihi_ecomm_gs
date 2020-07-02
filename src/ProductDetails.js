import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Image,
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
  const [sizes, setSizes] = useState([]);
  const [colorVs, setColorVs] = useState([]);
  const [activePV, setActivePV] = useState({});
  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  const _addToCart = async (ev) => {
    ev.preventDefault();
    product.avail = product.avail - quantity;
    await addToCart(product, quantity);
    setQuantity(0);
  };

  const acSet = (ev) => {
    setActiveColor(ev.target.value);
  };

  console.log(colorVs);

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

  useEffect(() => {
    if (productVs.length && product.id) {
      axios
        .get("/api/productVariants")
        .then((response) =>
          setColorVs(
            response.data.reduce((acc, productV) => {
              if (
                !acc.find((colorV) => {
                  return productV.color === colorV.color;
                })
              ) {
                acc.push(productV);
                setActiveColor(acc[0].color);
              }
              return acc;
            }, [])
          )
        )
        .catch();
    }
  }, [productVs]);

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={6}>
          <Image src="https://via.placeholder.com/450" fluid />
        </Col>
        <Col md={6}>
          <Form>
            <h1>{product.name}</h1>
            {productVs.length && (
              <>
                <h5>Size</h5>
                <ToggleButtonGroup
                  type="radio"
                  name="sizes"
                  defaultValue={productVs[0].size}
                >
                  {productVs.map((pv) => {
                    return (
                      <ToggleButton key={pv.id} value={pv.size}>
                        {pv.size}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </>
            )}
            <br />
            <br />
            {colorVs.length && (
              <>
                <h5>Color {activeColor} </h5>
                <ToggleButtonGroup
                  type="radio"
                  name="sizes"
                  defaultValue={colorVs[0].color}
                >
                  {colorVs.map((colorV) => {
                    return (
                      <ToggleButton
                        className="pdColorButton"
                        key={colorV.id}
                        value={colorV.color}
                        onClick={acSet}
                      >
                        <Image src={colorV.image} thumbnail />
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </>
            )}
            <br />
            <br />
            <Form.Label>Choose Quantity</Form.Label>
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

            <button type="button" disabled={!quantity} onClick={_addToCart}>
              Add to Cart
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

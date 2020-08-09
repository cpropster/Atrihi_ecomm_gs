import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Image,
  Form,
  ToggleButtonGroup,
  ToggleButton,
  Carousel,
} from "react-bootstrap";
import axios from "axios";
import Product from "./Product";

const ProductDetails = (props) => {
  const id = props.match.params.id;
  const { addToCart } = props;
  // const { toggleSearch } = props;
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [productVs, setProductVs] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [sizeVs, setSizeVs] = useState([]);
  const [colorVs, setColorVs] = useState([]);
  const [activePV, setActivePV] = useState({});
  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [arrCarProds, setArrCarProds] = useState([]);
  const [arrCar, setArrCar] = useState([]);

  console.log("this is products", products);

  const pushArrCarr = () => {
    const arrCaro = [];
    const size = 3;
    while (arrCarProds.length > 1) arrCaro.push(arrCarProds.splice(0, size));
    return arrCaro;
  };

  const _addToCart = async (ev) => {
    ev.preventDefault();
    activePV.avail = activePV.avail - quantity;
    await addToCart(activePV, quantity);
    setQuantity(0);
  };

  const acSet = (ev) => {
    setActiveColor(ev.target.value);
    setActiveSize(sizeVs[0].size);
  };

  const asSet = (ev) => {
    setActiveSize(ev.target.value);
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
            }) || []
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
            }, []) || []
          )
        )
        .catch();
    }
  }, [productVs]);

  useEffect(() => {
    if (productVs.length && product.id) {
      axios
        .get("/api/productVariants")
        .then((response) =>
          setSizeVs(
            response.data.reduce((acc, productV) => {
              if (
                !acc.find((sizeV) => {
                  return productV.size === sizeV.size;
                }) &&
                productV.color === activeColor
              ) {
                acc.push(productV);
                setActiveSize(acc[0].size);
              }
              return acc;
            }, []) || []
          )
        )
        .catch();
    }
  }, [activeColor]);

  useEffect(() => {
    if (activeColor && activeSize) {
      axios
        .get("/api/productVariants")
        .then((response) =>
          setActivePV(
            response.data.find((pv) => {
              return pv.color === activeColor && pv.size === activeSize;
            }) || {}
          )
        )
        .catch();
    }
  }, [activeSize && activeColor]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setProducts(response.data || []));
  }, []);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setArrCarProds(response.data || []));
  }, []);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setArrCar(pushArrCarr(response.data)));
  }, [arrCarProds]);

  useEffect(() => {
    axios
      .get("/api/productVariants")
      .then((response) => setProductVariants(response.data || []));
  }, [products]);

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={6}>
          <Image src={activePV && activePV.image} fluid />
        </Col>
        <Col md={6}>
          <Form>
            <h1>{product.name}</h1>
            {product.brand}
            <br />
            <hr />
            {product.description}
            <br />
            <br />
            {sizeVs.length && (
              <>
                <h5>Size</h5>
                <ToggleButtonGroup
                  type="radio"
                  name="sizes"
                  defaultValue={sizeVs[0].size}
                >
                  {sizeVs.map((sizeV) => {
                    return (
                      <ToggleButton
                        key={sizeV.id}
                        value={sizeV.size}
                        onClick={asSet}
                      >
                        {sizeV.size}
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
      <Row>
        <h2>Related Products</h2>
      </Row>
      <Carousel className="align-center" touch="true">
        {arrCar.map((prodArr, i) => {
          return (
            <Carousel.Item
              key={i}
              className="justify-content-center flex-md-row"
            >
              <Row>
                {prodArr.map((prod) => {
                  if (`:${prod.id}` !== product.id) {
                    return (
                      <Col
                        md={3}
                        className="list-unstyled mx-auto"
                        key={prod.id}
                      >
                        <Product
                          product={prod}
                          productVariants={productVariants}
                          addToCart={addToCart}
                        />
                      </Col>
                    );
                  }
                })}
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default ProductDetails;

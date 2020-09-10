import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const ProductCreate = ({
  error,
  createProduct,
  createProductVariant,
  deleteProduct,
  products,
}) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState("");
  const [image, setImage] = useState("");
  const [delProdId, setDelProdId] = useState("");
  const [price, setPrice] = useState();
  const [avail, setAvail] = useState();
  const [productId, setProductId] = useState("");

  const onSubmitDet = (ev) => {
    ev.preventDefault();
    const sizeArr = sizes.split(", ");
    sizeArr.forEach((size) => {
      createProductVariant(color, size, image, price, avail, productId);
      setProductId("");
    });
  };

  const onSubmitProd = (ev) => {
    ev.preventDefault();
    createProduct(name, brand, desc);
  };

  const prodDel = (ev) => {
    ev.preventDefault();
    deleteProduct(delProdId);
  };

  return (
    <Container>
      <Form onSubmit={onSubmitProd}>
        <h2>Create Products</h2>
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="(One at a time)"
          onChange={(ev) => setName(ev.target.value)}
        />
        <Form.Label>Brand</Form.Label>
        <Form.Control
          placeholder="(One at a time)"
          onChange={(ev) => setBrand(ev.target.value)}
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="(One at a time)"
          onChange={(ev) => setDesc(ev.target.value)}
        />
        <Button variant="primary" type="submit">
          Create Product
        </Button>
      </Form>

      <Form onSubmit={prodDel}>
        <h2>Delete Products</h2>
        <Form.Control
          as="select"
          value={delProdId}
          onChange={(ev) => setDelProdId(ev.target.value)}
        >
          <option value="">Choose Product</option>
          {products.map((product) => {
            return (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            );
          })}
        </Form.Control>
        <Button variant="primary" type="submit">
          Delete Product
        </Button>
      </Form>

      <Form onSubmit={onSubmitDet}>
        <h2>Create Product Variants</h2>
        <Form.Label>Color</Form.Label>
        <Form.Control
          placeholder="Color (One at a time)"
          onChange={(ev) => setColor(ev.target.value)}
        />
        <Form.Label>Sizes</Form.Label>
        <Form.Control
          placeholder="Sizes (Separated by commas eg. XS, S, M, L, XL)"
          onChange={(ev) => setSizes(ev.target.value)}
        />
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          placeholder="Image URL (One at a time)"
          onChange={(ev) => setImage(ev.target.value)}
        />
        <Form.Label>Price</Form.Label>
        <Form.Control
          placeholder="Price (e.g. 35.99 [NO $]!!!!!)"
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <Form.Label>Quantity Available</Form.Label>
        <Form.Control
          placeholder="Quantity expressed as a whole number (don't get cute)"
          onChange={(ev) => setAvail(ev.target.value)}
        />
        <Form.Control
          as="select"
          value={productId}
          onChange={(ev) => setProductId(ev.target.value)}
        >
          <option value="">Choose Product</option>
          {products.map((product) => {
            return (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            );
          })}
        </Form.Control>
        <Button variant="primary" type="submit">
          Create Product Variant
        </Button>
      </Form>
      {error}
    </Container>
  );
};

export default ProductCreate;

import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const ProductCreate = ({ createProductVariant, products }) => {
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState();
  const [avail, setAvail] = useState();
  const [productId, setProductId] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    const sizeArr = sizes.split(", ");
    sizeArr.forEach((size) => {
      console.log(color, size, image, price, avail, productId);
      createProductVariant(color, size, image, price, avail, productId);
      setProductId("");
    });
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <h2>Create Products</h2>
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
    </Container>
  );
};

export default ProductCreate;

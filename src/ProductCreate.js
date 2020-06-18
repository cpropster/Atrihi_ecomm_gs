import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ProductCreate = ({ createProduct, products }) => {
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState();
  const [avail, setAvail] = useState();
  const [productId, setProductId] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    const sizeArr = sizes.split(", ");
    sizeArr.map((size) => {
      createProduct(color, size, image, price, avail, productId);
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create Products</h2>
      <Form.Control
        placeholder="Color (One at a time)"
        onChange={(ev) => setColor(ev.target.value)}
      />
    </Form>
  );
};

export default ProductCreate;

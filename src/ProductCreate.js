import React, { useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import "draft-js/dist/Draft.css";
import "draft-js-mention-plugin/lib/plugin.css";
import { stateToHTML } from "draft-js-export-html";

const ProductCreate = ({
  error,
  createProduct,
  createProductVariant,
  deleteProduct,
  products,
}) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState("");
  const [image, setImage] = useState("");
  const [delProdId, setDelProdId] = useState("");
  const [price, setPrice] = useState();
  const [avail, setAvail] = useState();
  const [productId, setProductId] = useState("");
  const [desc, setDesc] = useState(() => EditorState.createEmpty());
  const [html, setHtml] = useState("");

  const setEditorState = (editorState) => {
    let _html = stateToHTML(editorState.getCurrentContent());
    setDesc(editorState);
    setHtml(_html);
  };

  const onSubmitProd = (ev) => {
    ev.preventDefault();
    createProduct(name, brand, html);
    setName("");
    setDesc(() => EditorState.createEmpty());
    console.log(name);
  };

  const prodDel = (ev) => {
    ev.preventDefault();
    deleteProduct(delProdId);
  };

  const onSubmitDet = (ev) => {
    ev.preventDefault();
    const sizeArr = sizes.split(", ");
    sizeArr.forEach((size) => {
      createProductVariant(color, size, image, price, avail, productId);
      setColor("");
      setImage("");
      setProductId("");
    });
  };

  return (
    <Container>
      <Form onSubmit={onSubmitProd}>
        <h2>Create Products</h2>
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="(One at a time)"
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <Form.Label>Brand</Form.Label>
        <Form.Control
          placeholder="(One at a time)"
          type="text"
          value={brand}
          onChange={(ev) => setBrand(ev.target.value)}
        />
        <Form.Label>Description</Form.Label>
        <Editor
          editorState={desc}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          placeholder="type description here...."
          onChange={setEditorState}
        />
        <Button
          variant="primary"
          onClick={onSubmitProd}
          disabled={!name || !brand}
        >
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
        <Button variant="primary" onClick={prodDel} disabled={!delProdId}>
          Delete Product
        </Button>
      </Form>

      <Form onSubmit={onSubmitDet}>
        <h2>Create Product Variants</h2>
        <Form.Label>Color</Form.Label>
        <Form.Control
          placeholder="Color (One at a time)"
          type="text"
          value={color}
          onChange={(ev) => setColor(ev.target.value)}
        />
        <Form.Label>Sizes</Form.Label>
        <Form.Control
          placeholder="Sizes (Separated by commas eg. XS, S, M, L, XL)"
          type="text"
          value={sizes}
          onChange={(ev) => setSizes(ev.target.value)}
        />
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          placeholder="Image URL (One at a time)"
          type="text"
          value={image}
          onChange={(ev) => setImage(ev.target.value)}
        />
        <Form.Label>Price</Form.Label>
        <Form.Control
          placeholder="Price (e.g. 35.99 [NO $]!!!!!)"
          type="text"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <Form.Label>Quantity Available</Form.Label>
        <Form.Control
          placeholder="Quantity expressed as a whole number (don't get cute)"
          type="text"
          value={avail}
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
        <Button
          variant="primary"
          onClick={onSubmitDet}
          disabled={
            !color || !sizes || !image || !price || !avail || !productId
          }
        >
          Create Product Variant
        </Button>
      </Form>
      {error}
    </Container>
  );
};

export default ProductCreate;

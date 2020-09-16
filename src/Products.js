/* eslint-disable no-warning-comments */
import React, { useState, useEffect } from "react";
import { Row, Container, Col, Dropdown } from "react-bootstrap";
import Product from "./Product.js";
import Pagination from "react-js-pagination";

const Products = ({ products, setProducts, productVariants, addToCart }) => {
  const [sortType, setSortType] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const indexOfLastProd = activePage * perPage;
  const indexOfFirstProd = indexOfLastProd - perPage;
  const currentProducts = products.slice(indexOfFirstProd, indexOfLastProd);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        // plh: "price",
        // phl: "price",
        name: "name",
        // zalph: "name",
        date: "date",
        brand: "brand",
      };
      const sortProperty = types[type];
      const sorted = [...products].sort((a, b) =>
        a[sortProperty] > b[sortProperty] ? 1 : -1
      );
      setProducts(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

  const handlePageChange = (pageNumber) => {
    console.log("active page is ", pageNumber);
    setActivePage(pageNumber);
  };

  const handleSelect = (ev) => {
    setSortType(ev);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-end">
        <Dropdown
          alignRight
          title="Dropdown Right"
          id="dropdown-menu-align-right"
          onSelect={handleSelect}
          className="mb-4"
        >
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Sort Products
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="name">A-Z</Dropdown.Item>
            <Dropdown.Item eventKey="brand">Brand</Dropdown.Item>
            <Dropdown.Item eventKey="date">Newest Items</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <Row>
        <h2 className="mx-5 mb-5">All Products</h2>
      </Row>
      <Row>
        {currentProducts.map((product) => {
          return (
            <Col
              md={4}
              className="result list-unstyled product-card align-items-center"
              key={product.id}
            >
              <Product
                key={product.id}
                product={product}
                productVariants={productVariants}
                addToCart={addToCart}
              />
            </Col>
          );
        })}
      </Row>
      <Row className="justify-content-center">
        <h5>
          <Pagination
            activePage={activePage}
            variant="outlined"
            color="primary"
            itemsCountPerPage={perPage}
            totalItemsCount={products.length}
            pageRangeDisplayed={6}
            onChange={handlePageChange}
          />
        </h5>
      </Row>
    </Container>
  );
};

export default Products;

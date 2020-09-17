import React, { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Product from "./Product.js";
import Pagination from "react-js-pagination";
import axios from "axios";

const BrandProducts = ({ productVariants, addToCart, brand }) => {
  const [sortType, setSortType] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [brandProds, setBrandProds] = useState([]);
  const [products, setProducts] = useState([]);

  const indexOfLastProd = activePage * perPage;
  const indexOfFirstProd = indexOfLastProd - perPage;
  const currentProducts = brandProds.slice(indexOfFirstProd, indexOfLastProd);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setProducts(response.data || []));
  }, [brand]);

  useEffect(() => {
    if (products) {
      setBrandProds(
        [...products].filter((product) => {
          return product.brand === localStorage.getItem("brand");
        })
      );
    }
  }, [products]);

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
      const sorted = [...brandProds].sort((a, b) =>
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
            <Dropdown.Item eventKey="date">Most Recent</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <Row>
        <h2 className="mx-5 mb-5">
          All {brand || localStorage.getItem("brand")}
        </h2>
      </Row>
      <Row>
        {brandProds.length &&
          currentProducts.map((product) => {
            return (
              <Col
                md={4}
                className="list-unstyled product-card align-items-center"
                key={product.id}
              >
                <Product
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  productVariants={productVariants}
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

export default BrandProducts;

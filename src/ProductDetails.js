import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = (props) => {
  const id = props.match.params.id;
  //   const { toggleSearch } = props;
  const [product, setProduct] = useState({});
  const [details, setDetails] = useState({});

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
              setDetails(_product);
              acc = _product;
            }
            return acc;
          }, {})
        )
      )
      .catch();
  }, []);

  return (
    <div id="">
      <ul className="">
        <li className="">Name: {product.name}</li>
        <li className="">
          <img className="" src={details.image} />
        </li>
        <li className="">Price: ${Number(details.price).toFixed(2)}</li>
        <li className="">Description: {details.description}</li>
        <li className="">Stock: {details.avail}</li>
      </ul>
      <h3>
        <Link to="/products">Back to Store</Link>
      </h3>
    </div>
  );
};

export default ProductDetails;

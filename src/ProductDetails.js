import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = (props) => {
  const id = props.match.params.id;
  console.log(id);
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
              console.log("i am the product", _product);
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
    <div id="product-details-root">
      <ul className="columnNW alignCenter detail-val">
        <li className="halfPad detail-val">Name: {details.name}</li>
        <li className="halfPad detail-val">
          <img className="productImage" src={details.image} />
        </li>
        <li className="halfPad detail-val">
          Price: ${Number(details.price).toFixed(2)}
        </li>
        <li className="halfPad detail-val">
          Description: {details.description}
        </li>
        <li className="halfPad detail-val">Stock: {details.avail}</li>
      </ul>
      <h3>
        <Link to="/products">Back to Store</Link>
      </h3>
    </div>
  );
};

export default ProductDetails;

/* eslint-disable complexity */
import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import BrandProducts from "./BrandProducts";
import ProductCreate from "./ProductCreate";

const headers = () => {
  const token = window.localStorage.getItem("token");

  return {
    headers: {
      authorization: token,
    },
  };
};

const App = () => {
  const [auth, setAuth] = useState({});
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [brand, setBrand] = useState("");

  const history = useHistory();

  const exchangeTokenForAuth = async () => {
    const response = await axios.get("/api/auth", headers());
    setAuth(response.data);
  };

  useEffect(() => {
    axios
      .get("/api/productVariants")
      .then((response) => setProductVariants(response.data || []));
  }, [products]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setProducts(response.data || []));
  }, []);

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  useEffect(() => {
    if (auth.id) {
      const token = window.localStorage.getItem("token");
      axios.get("/api/getLineItems", headers()).then((response) => {
        setLineItems(response.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get("/api/getCart", headers()).then((response) => {
        setCart(response.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get("/api/getOrders", headers()).then((response) => {
        setOrders(response.data);
      });
    }
  }, [auth]);

  const login = async (credentials) => {
    const token = (await axios.post("/api/auth", credentials)).data.token;
    window.localStorage.setItem("token", token);
    exchangeTokenForAuth();
  };

  const createAccount = async (newUser) => {
    try {
      const response = (await axios.post("/api/users", newUser)).data;
      window.localStorage.setItem("token", response.token);
      setAuth(response.user);
      setError("");
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    history.push("/#");
    setAuth({});
  };

  const addToCart = (product, quantity) => {
    axios
      .post(
        "/api/addToCart",
        { productId: product.id, quantity } /*, headers()*/
      )
      .then((response) => {
        const lineItem = response.data;
        console.log("In addToCart: lineItem=", lineItem);
        const found = lineItems.find(
          (_lineItem) => _lineItem.id === lineItem.id
        );
        if (!found) {
          setLineItems([...lineItems, lineItem]);
        } else {
          // a lineItem already exists for this product and user
          // update the existing lineItem
          const updatedLineItems = lineItems.map((_lineItem) =>
            _lineItem.id === lineItem.id ? lineItem : _lineItem
          );
          setLineItems(updatedLineItems);
        }
      })
      .then(() => {
        axios.put(
          "/api/products",
          { avail: product.avail, id: product.id },
          headers()
        );
      });
  };

  const createProductVariant = (
    color,
    size,
    image,
    price,
    avail,
    productId
  ) => {
    axios
      .post("/api/productVariants", {
        color,
        size,
        image,
        price,
        avail,
        productId,
      })
      .then((response) => {
        const variant = response.data;
        const found = productVariants.find(
          (_productVariant) => _productVariant.id === variant.id
        );
        if (!found) {
          setProductVariants([...productVariants, variant]);
        }
      })
      .catch((ex) => setError(ex.response.data.message));
  };

  const removeFromCart = (lineItemId, product) => {
    axios
      .delete(`/api/removeFromCart/${lineItemId}`, headers())
      .then(() => {
        setLineItems(
          lineItems.filter((_lineItem) => _lineItem.id !== lineItemId)
        );
      })
      .then(() => {
        axios.put(
          "/api/products",
          { avail: product.avail, id: product.id },
          headers()
        );
      });
  };

  const brandSet = (key, value) => {
    setBrand(value);
    localStorage.setItem(key, value);
  };

  return (
    <div>
      <NavBar
        login={login}
        logout={logout}
        auth={auth}
        createAccount={createAccount}
        brandSet={brandSet}
      />
      <Switch>
        <Route
          path="/productAdd"
          render={() => (
            <ProductCreate
              products={products}
              createProductVariant={createProductVariant}
            />
          )}
        />
        <Route
          //change this route
          path="/products:brand"
          render={() => (
            <BrandProducts
              products={products}
              productVariants={productVariants}
              brand={brand}
              addToCart={addToCart}
            />
          )}
        />
        <Route
          path="/products"
          render={() => (
            <Products
              addToCart={addToCart}
              products={products}
              productVariants={productVariants}
            />
          )}
        />
        <Route
          //change this route as well
          path="/product:id"
          render={(props) => <ProductDetails {...props} />}
        />
        <Route path="/about" render={() => <AboutUs />} />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </div>
  );
};

export default App;

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

  const history = useHistory();

  const exchangeTokenForAuth = async () => {
    const response = await axios.get("/api/auth", headers());
    setAuth(response.data);
  };

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  useEffect(() => {
    axios.get("/api/products").then((response) => setProducts(response.data));
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
      console.log("in account ", newUser);
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
  }; //end removeFromCart

  console.log(products);
  return (
    <div>
      <NavBar
        login={login}
        logout={logout}
        auth={auth}
        createAccount={createAccount}
      />
      <Switch>
        <Route
          path="/products:brand"
          render={(props) => <BrandProducts addToCart={addToCart} {...props} />}
        />
        <Route
          path="/products"
          render={() => <Products addToCart={addToCart} products={products} />}
        />
        <Route
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

/* eslint-disable complexity */
import React, { useState, useEffect } from "react";
import { Route, Redirect, Link, useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  NavbarBrand,
} from "react-bootstrap";
import axios from "axios";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
// import AccountForm from "./AccountForm";
import Home from "./Home";

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

  const createOrder = () => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/api/createOrder", null, headers())
      .then((response) => {
        setOrders([response.data, ...orders]);
        const token = window.localStorage.getItem("token");
        return axios.get("/api/getCart", headers());
      })
      .then((response) => {
        setCart(response.data);
      });
  };

  const addToCart = (product, quantity) => {
    // see app.js
    axios
      .post("/api/addToCart", { productId: product.id, quantity }, headers())
      .then((response) => {
        const lineItem = response.data;
        //console.log("In addToCart: lineItem=", lineItem);
        const found = lineItems.find(
          (_lineItem) => _lineItem.id === lineItem.id
        );
        if (!found) {
          // a lineItem for this product for this user does NOT exist
          // create a new lineItem
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

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/#">
          <img
            className="rounded-circle"
            src="../assets/img/orchid.png"
            width="40"
            height="40"
          />
        </Navbar.Brand>
        <Navbar.Brand>Atrihi Inc.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">About Us</Nav.Link>
            <NavDropdown title="Brands" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">All Brands</NavDropdown.Item>
              <NavDropdown.Item href="#">Tommy Hilfiger</NavDropdown.Item>
              <NavDropdown.Item href="#">Polo Ralph Lauren</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Contact Us</Nav.Link>
          </Nav>
          {!auth.id ? (
            <>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Login login={login} />
              <CreateAccount createAccount={createAccount} />
            </>
          ) : (
            <>
              <div>
                Welcome&nbsp;
                <a className="mr-3" href="">
                  {auth.firstName}
                </a>
              </div>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
                <Nav.Link variant="primary" onClick={logout}>
                  Logout
                </Nav.Link>
              </Form>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Home />
    </div>
  );
};

export default App;

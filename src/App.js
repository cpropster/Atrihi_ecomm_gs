/* eslint-disable complexity */
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
// import Login from "./Login";
// import CreateAccount from "./CreateAccount";
// import AccountForm from "./AccountForm";

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
  const [modal, setModal] = useState(false);

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  const exchangeTokenForAuth = async () => {
    const response = await axios.get("/api/users/auth", headers());
    setAuth(response.data);
  };

  const login = async (credentials) => {
    const token = (await axios.post("/api/users/auth", credentials)).data.token;
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

  const updateAccount = async (user) => {
    try {
      const updated = (await axios.put(`/api/users/${user.id}`, user)).data;
      setAuth(updated);
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

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/#">
          <img src="../assets/img/orchid.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/#">Home</Nav.Link>
            <Nav.Link href="#">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Action</NavDropdown.Item>
              <NavDropdown.Item href="#">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default App;

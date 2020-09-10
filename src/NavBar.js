import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

const NavBar = ({ logout, login, auth, createAccount, brandSet, history }) => {
  return (
    <>
      {auth.id ? (
        <Navbar bg="light" sticky="top" expand="md">
          <Navbar.Brand href="/#">
            <img
              className=""
              src="../assets/img/AtrihiLogo.png"
              width="198"
              height="60"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/#/about">About Us</Nav.Link>
              <NavDropdown title="Brands" id="basic-nav-dropdown">
                <NavDropdown.Item href="/#/products">
                  All Products
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:PoloRalphLauren"
                  onClick={() => brandSet("brand", "Polo Ralph Lauren")}
                >
                  Polo Ralph Lauren
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:TommyHilfiger"
                  onClick={() => brandSet("brand", "Tommy Hilfiger")}
                >
                  Tommy Hilfiger
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Calvin Klein"
                  onClick={() => brandSet("brand", "Calvin Klein")}
                >
                  Calvin Klein
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:DKNY"
                  onClick={() => brandSet("brand", "DKNY")}
                >
                  DKNY
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Champion"
                  onClick={() => brandSet("brand", "Champion")}
                >
                  Champion
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Dickies"
                  onClick={() => brandSet("brand", "Dickies")}
                >
                  Dickies
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Pendleton"
                  onClick={() => brandSet("brand", "Pendleton")}
                >
                  Pendleton
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Kavu"
                  onClick={() => brandSet("brand", "Kavu")}
                >
                  Kavu
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:BarefootDreams"
                  onClick={() => brandSet("brand", "Barefoot Dreams")}
                >
                  Barefoot Dreams
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Chums"
                  onClick={() => brandSet("brand", "Chums")}
                >
                  Chums
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#/contactUs">Contact Us</Nav.Link>
              <Nav.Link href="/#/productAdd">Add Product</Nav.Link>
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
      ) : (
        <Navbar bg="light" sticky="top" expand="md">
          <Navbar.Brand href="/#">
            <img
              className=""
              src="../assets/img/AtrihiLogo.png"
              width="198"
              height="60"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/#/about">About Us</Nav.Link>
              <NavDropdown title="Brands" id="basic-nav-dropdown">
                <NavDropdown.Item href="/#/products">
                  All Products
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:PoloRalphLauren"
                  onClick={() => brandSet("brand", "Polo Ralph Lauren")}
                >
                  Polo Ralph Lauren
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:TommyHilfiger"
                  onClick={() => brandSet("brand", "Tommy Hilfiger")}
                >
                  Tommy Hilfiger
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Calvin Klein"
                  onClick={() => brandSet("brand", "Calvin Klein")}
                >
                  Calvin Klein
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:DKNY"
                  onClick={() => brandSet("brand", "DKNY")}
                >
                  DKNY
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Champion"
                  onClick={() => brandSet("brand", "Champion")}
                >
                  Champion
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Dickies"
                  onClick={() => brandSet("brand", "Dickies")}
                >
                  Dickies
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Pendleton"
                  onClick={() => brandSet("brand", "Pendleton")}
                >
                  Pendleton
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Kavu"
                  onClick={() => brandSet("brand", "Kavu")}
                >
                  Kavu
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:BarefootDreams"
                  onClick={() => brandSet("brand", "Barefoot Dreams")}
                >
                  Barefoot Dreams
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/#/products:Chums"
                  onClick={() => brandSet("brand", "Chums")}
                >
                  Chums
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/#/contactUs">Contact Us</Nav.Link>
            </Nav>
            {!auth.id ? (
              <>
                {/* <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
                <Login login={login} />
                <CreateAccount
                  createAccount={createAccount}
                  history={history}
                />
                <Nav.Link href="/#/contactUs">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Nav.Link>
              </>
            ) : (
              <>
                <div>
                  Welcome&nbsp;
                  <a className="mr-3" href="">
                    {auth.firstName}
                  </a>
                </div>
                {/* <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button variant="outline-success">Search</Button> */}

                <Nav.Link variant="primary" onClick={logout}>
                  Logout
                </Nav.Link>
                <Nav.Link href="/#/contactUs">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Nav.Link>
                {/* </Form> */}
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
};

export default NavBar;

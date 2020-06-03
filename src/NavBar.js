import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

const NavBar = ({ logout, login, auth, createAccount }) => {
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
        <Navbar.Brand href="/#">Atrihi Inc.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/#/about">About Us</Nav.Link>
            <NavDropdown title="Brands" id="basic-nav-dropdown">
              <NavDropdown.Item href="/#/products">All Brands</NavDropdown.Item>
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
    </div>
  );
};

export default NavBar;

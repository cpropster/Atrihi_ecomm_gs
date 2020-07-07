import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const Footer = ({ logout, login, auth, createAccount, brandSet }) => {
  return (
    <>
      <Nav id="footer" bg="light" className="ml-auto">
        <Nav.Link href="/#/refundPolicy">Refund Policy</Nav.Link>
      </Nav>
    </>
  );
};

export default Footer;

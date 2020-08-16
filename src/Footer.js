import React from "react";
import { Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Nav id="footer" className="justify-content-center">
        <Nav.Item as="li">
          <Nav.Link href="/#/refundPolicy">Refund Policy</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/#/privacyPolicy">Privacy Policy</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/#">
            &copy; 2020 Atrihi Inc. or its affiliates
          </Nav.Link>{" "}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Footer;

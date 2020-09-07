import React from "react";
import { Container, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <Container>
      <div className="d-flex flex-column sticky-footer-wrapper">
        <Nav id="footer" className="justify-content-center">
          <Nav.Item as="li">
            <Nav.Link className="footer-link" href="/#/refundPolicy">
              Refund Policy
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="footer-link" href="/#/privacyPolicy">
              Privacy Policy
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="footer-link" href="/#">
              &copy; 2020 Atrihi Inc. or its affiliates
            </Nav.Link>{" "}
          </Nav.Item>
        </Nav>
        <main className="flex-fill" />
        <fotter />
      </div>
    </Container>
  );
};

export default Footer;

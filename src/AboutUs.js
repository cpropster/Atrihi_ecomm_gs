import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Container>
      <Row>
        <Col md={3} />
        <Col md={6}>
          <h1 className="text-center">Why Choose Atrihi Inc?</h1>
        </Col>
        <Col md={3} />
      </Row>
      <Row>
        <Col md={12}>
          <h5>
            Simply put, Atrihi is the best. We handle a wide range of both
            products and customers both international and domestic. Your next
            corporate event wouldn't be complete without products from our{" "}
            <Link to="/#/brands">catalog</Link>.
            <br />
            <br />
            Our sterling reputation in the gifting and events industry comes
            from over 20 years experience serving corporate clients in the tech
            and apparel industries. Our customer and employee gifting and
            incentive programs are custom tailored to each event and each
            company that we work with.
            <br />
            <br />
            As our reputation in Los Angeles has grown, so to have our custom
            tailored corporate event incentive solutions.{" "}
            <Link to="/#/contact">Contact us today</Link> to see for yourself.
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;

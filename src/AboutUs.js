import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const AboutUs = () => {
  return (
    <>
      <div className="video-container d-flex">
        <video
          src="../assets/img/bgVid.mp4"
          width="100%"
          height="100%"
          autoPlay
          muted
          loop
        />
        <Container className="align-self-center mb-5 d-md-flex flex-column">
          <Row>
            <Col md={6} className="text-left my-5">
              <h2 id="about-header" className="text-center mt-5">
                Why Choose Atrihi Inc?
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <h5 id="about-body">
                Simply put, Atrihi is the best.
                <br />
                <br />
                We handle a wide range of products and customers, both
                international and domestic. Your next corporate event wouldn't
                be complete without products from our{" "}
                <Link className="about-links" to="/products">
                  catalog
                </Link>
                .
                <br />
                <br />
                Our sterling reputation in the gifting and events industry comes
                from over 20 years experience serving corporate clients in the
                tech and apparel industries. Our customer and employee gifting
                and incentive programs are custom tailored to each event and
                each company that we work with.
                <br />
                <br />
                As our reputation in Los Angeles has grown, so to have our
                custom tailored corporate event incentive solutions.{" "}
                <Link className="about-links" to="/contactUs">
                  Contact us today
                </Link>{" "}
                to see for yourself.
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="about-div"></div>
    </>
  );
};

export default AboutUs;

import React from "react";
import { Container, Row, Col, Image, Figure, Card } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Row>
        <Col md={12}>
          <Image className="mw-100" src="../assets/img/testBanner.jpg" />
        </Col>
      </Row>
      <Container className="mb-5">
        <Row className="mt-5">
          <Col md={4} className="border-right">
            <Figure className="my-auto text-center">
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="holder.js/171x180"
              />
              <Figure.Caption>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </Figure.Caption>
            </Figure>
          </Col>
          <Col md={4} className="border-right">
            <Figure className="my-auto text-center">
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="holder.js/171x180"
              />
              <Figure.Caption>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </Figure.Caption>
            </Figure>
          </Col>
          <Col md={4}>
            <Figure className="my-auto text-center">
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="holder.js/171x180"
              />
              <Figure.Caption>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>
      </Container>
      <Row className="mb-5">
        <Col md={12}>
          <Image className="mw-100" src="../assets/img/testBanner.jpg" />
        </Col>
      </Row>
      <Container className="mb-5">
        <Row>
          <Col className="text-center" sm={12}>
            Featured Brands
          </Col>
        </Row>
        <Row>
          <Col sm={2} xs={6}>
            <Card>
              <Card.Img
                id="brand-card"
                variant="top"
                src="../assets/img/icon_pencil.png"
                href="#"
              />
            </Card>
          </Col>{" "}
          <Col sm={2} xs={6}>
            <Card>
              <Card.Img
                id="brand-card"
                variant="top"
                src="../assets/img/icon_pencil.png"
                href="#"
              />
            </Card>
          </Col>{" "}
          <Col sm={2} xs={6}>
            <Card>
              <Card.Img
                id="brand-card"
                variant="top"
                src="../assets/img/icon_pencil.png"
                href="#"
              />
            </Card>
          </Col>{" "}
          <Col sm={2} xs={6}>
            <Card>
              <Card.Img
                id="brand-card"
                variant="top"
                src="../assets/img/icon_pencil.png"
                href="#"
              />
            </Card>
          </Col>{" "}
          <Col sm={2} xs={6}>
            <Card>
              <Card.Img
                id="brand-card"
                variant="top"
                src="../assets/img/icon_pencil.png"
                href="#"
              />
            </Card>
          </Col>
          <Col sm={2} xs={6}>
            <Card>
              <Card.Img
                id="brand-card"
                variant="top"
                src="../assets/img/icon_pencil.png"
                href="#"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

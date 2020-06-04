import React from "react";
import { Container, Row, Col, Image, Figure, Card } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Row>
        <Col md={12}>
          <Image className="mw-100" src="../assets/img/banner-01.png" />
        </Col>
      </Row>
      <Container className="mb-5">
        <Row className="mt-5">
          <Col md={4} className="border-right">
            <Figure className="my-auto text-center">
              <Figure.Image
                width={100}
                height={100}
                alt="calendar icon"
                src="../assets/img/calendar.png"
              />
              <h4>Events Driven</h4>
              <Figure.Caption>
                Make your next event memorable. Let us worry about giving your
                event attendees the perfect gifts and promotional handouts so
                you don't have to.
              </Figure.Caption>
            </Figure>
          </Col>
          <Col md={4} className="border-right">
            <Figure className="my-auto text-center">
              <Figure.Image
                width={100}
                height={100}
                alt="measuring tape icon"
                src="../assets/img/measuring-tape.png"
              />
              <h4>Tailored Solutions</h4>
              <Figure.Caption>
                We work with you from beginning to end. Understanding your
                success metrics and event goals is what we do. Help us help you.
              </Figure.Caption>
            </Figure>
          </Col>
          <Col md={4}>
            <Figure className="my-auto text-center">
              <Figure.Image
                width={100}
                height={100}
                alt="gift icon"
                src="../assets/img/gift.png"
              />
              <h4>Promote Value</h4>
              <Figure.Caption>
                We drive value to each event. Employees will remember the gifts
                they receive. Potential clients will remember their promotional
                handouts.
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>
      </Container>
      <Row className="mb-5">
        <Col md={12}>
          <Image className="mw-100" src="../assets/img/Banner2-01.png" />
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

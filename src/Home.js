import React from "react";
import { Container, Row, Col, Image, Figure, Card } from "react-bootstrap";

const Home = ({ brandSet }) => {
  return (
    <>
      <header id="home-banner-container">
        <Container className="h-100">
          <Row className="h-100 align-items-center">
            <Col md={12} className="text-center">
              <h1 className="font-weight-light home-banner-text">
                The Best Gifts. The Best Samples. The Best Events.
                <br />
                Everytime
              </h1>
            </Col>
          </Row>
        </Container>
      </header>
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
          <Image className="mw-100" src="../assets/img/banner2sized.png" />
        </Col>
      </Row>
      <Container className="bottom-home">
        <Row>
          <Col className="text-center" sm={12}>
            <h3>Featured Brands</h3>
            <br />
          </Col>
        </Row>
        <Row>
          <Col sm={2} xs={6}>
            <a
              href="/#/products:TommyHilfiger"
              onClick={() => brandSet("brand", "Tommy Hilfiger")}
            >
              <Card>
                <Card.Img
                  id="brand-card"
                  variant="top"
                  src="../assets/img/edited-05.png"
                />
              </Card>
            </a>
          </Col>{" "}
          <Col sm={2} xs={6}>
            <a
              href="/#/products:Champion"
              onClick={() => brandSet("brand", "Champion")}
            >
              <Card>
                <Card.Img
                  id="brand-card"
                  variant="top"
                  src="../assets/img/edited-01.png"
                />
              </Card>
            </a>
          </Col>{" "}
          <Col sm={2} xs={6}>
            <a
              href="/#/products:CalvinKlein"
              onClick={() => brandSet("brand", "Calvin Klein")}
            >
              <Card>
                <Card.Img
                  id="brand-card"
                  variant="top"
                  src="../assets/img/edited-06.png"
                />
              </Card>
            </a>
          </Col>{" "}
          <Col sm={2} xs={6}>
            <a
              href="/#/products:PoloRalphLauren"
              onClick={() => brandSet("brand", "Polo Ralph Lauren")}
            >
              <Card>
                <Card.Img
                  id="brand-card"
                  variant="top"
                  src="../assets/img/edited-04.png"
                />
              </Card>
            </a>
          </Col>{" "}
          <Col sm={2} xs={6}>
            <a
              href="/#/products:Dickies"
              onClick={() => brandSet("brand", "Dickies")}
            >
              <Card>
                <Card.Img
                  id="brand-card"
                  variant="top"
                  src="../assets/img/edited-02.png"
                />
              </Card>
            </a>
          </Col>
          <Col sm={2} xs={6}>
            <a
              href="/#/products:Pendleton"
              onClick={() => brandSet("brand", "Pendleton")}
            >
              <Card>
                <Card.Img
                  id="brand-card"
                  variant="top"
                  src="../assets/img/edited-03.png"
                />
              </Card>
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

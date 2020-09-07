import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  Button,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiY3Byb3BzdGVyIiwiYSI6ImNrZHh4ZnEwYzB0ZWIyem53NjkwcHJkOGwifQ.CNQwVH7i-t3VE5Xqofh-lQ",
  });

  const submitMessage = () => {
    axios({
      method: "POST",
      url: "http://localhost:3000/api/send",
      data: {
        name: name,
        email: email,
        message: message,
      },
    }).then((response) => {
      if (response.data.msg === "success") {
        alert("Your message has been sent. Thank you for contacting Atrihi!");
      } else if (response.data.msg === "fail") {
        alert("Message failed to send.");
      }
    });
    setName("");
    setEmail("");
    setMessage("");
    handleClose();
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    submitMessage();
  };

  return (
    <Container>
      <Row>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "60vh",
            width: "100vw",
          }}
          center={[-118.45216, 34.02845]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "harbor-15" }}
          >
            <Feature coordinates={[-118.45216, 34.02845]} />
          </Layer>
        </Map>
      </Row>
      <Row className="mt-5 d-flex text-center justify-content-cente">
        <Col md={12}>
          Thank you for contacting Atrihi! Unfortunately we are only accepting
          orders from approved events customers at this time.
        </Col>
      </Row>
      <Row className="mt-2 mb-5 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShow}>
          Contact Us
        </Button>
        <Modal show={modal} onHide={handleClose}>
          <Form onSubmit={onSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Contact Us Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Contact our customer care team below to set up an account.
              <br />
              <br />
              <FormControl
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <br />
              <FormControl
                type="text"
                placeholder="E-Mail"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <br />
              <FormControl
                type="text"
                placeholder="Message"
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="button button-primary"
                variant="primary"
                onClick={onSubmit}
              >
                Send Message
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Row>
    </Container>
  );
};

export default ContactUs;

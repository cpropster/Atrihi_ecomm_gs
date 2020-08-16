import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  Button,
  Modal,
  Container,
  Row,
} from "react-bootstrap";
import axios from "axios";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

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
      <Row className="my-5 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShow}>
          Contact Us
        </Button>
        <Modal show={modal} onHide={handleClose}>
          <Form onSubmit={onSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Contact Us Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                className="button button-yellow"
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

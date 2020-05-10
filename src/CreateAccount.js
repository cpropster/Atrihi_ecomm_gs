import React, { useState } from "react";
import { Modal, Button, Form, FormControl, Nav } from "react-bootstrap";

const CreateAccount = ({ createAccount }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  //need to figure out a way to get this to display the check constraint on the front end
  const onSubmit = (ev) => {
    ev.preventDefault();
    createAccount({ username, firstName, lastName, password })
      .then(() => {
        setError("");
      })
      .catch((ex) => {
        setError(ex.response.data.message);
      });
  };
  return (
    <>
      <Nav.Link onClick={handleShow}>Sign Up</Nav.Link>
      <Modal show={modal} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Your Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error}
            <FormControl
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
            <br />
            <FormControl
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
            <br />
            <FormControl
              type="text"
              placeholder="Username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <br />
            <FormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onSubmit}>
              Create Account
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAccount;

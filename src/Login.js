import React, { useState, useEffect } from "react";
import { Modal, Button, Form, FormControl, Nav } from "react-bootstrap";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  const onSubmit = (ev) => {
    ev.preventDefault();
    login({ username, password }).catch(() =>
      setError("Incorrect Username Or Password")
    );
  };

  return (
    <>
      <Nav.Link onClick={handleShow}>Login</Nav.Link>
      <Modal show={modal} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Login To Your Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error}
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
            <Button variant="primary" type="submit" onClick={onSubmit}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Login;

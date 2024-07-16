import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((userName === "admin" && password === "admin")) {
      navigate("/patients");
    } else {
      setError("Login failed");
    }
  };

  return (
    <div className="col-lg-6 mx-auto">
      <h2>Login</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>PassWord</Form.Label>
          <Form.Control
            type="password"
            value={password}
            required
            onChange={(e) => setPassWord(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mt-3">
        <Button className="btn-danger form-control" type="submit">
          Login
        </Button>

        </Form.Group>
        
      </Form>
    </div>
  );
}

export default LoginForm;

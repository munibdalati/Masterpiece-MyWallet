import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/AdminPanel.css"


function AddUserForm() {
  const [validated, setValidated] = useState(false);
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/register",
        { username, email, password, age, gender },
        config
      );
      localStorage.setItem("authToken", data.token);
      console.log(data.token);

      navigate("/");
      console.log(gender)
    } catch (error) {
      console.log(error.response); // Add this line to log the error response
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };



  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/");
    }
  }, []);


  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit} >
        {/* First Row */}
        <Row className="mb-3 justify-content-center align-items-center">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Add Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Second Row */}
        <Row className="mb-3 justify-content-center align-items-center">
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Add User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Second Row */}
        <Row className="mb-3 justify-content-center align-items-center">
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Add User Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-center align-items-center">
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Add User Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-center align-items-center">
          <Form.Group as={Col} md="6">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Choose...</option>
              <option>male</option>
              <option>female</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

        </Row>

        <Row className="mb-3 justify-content-center align-items-center">
          <Col md="6" className="text-center">
            <Button type="submit" className="btn-orange w-100">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

    </Container>
  );
}

export default AddUserForm;

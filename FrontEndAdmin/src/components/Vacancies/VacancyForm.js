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


function VacancyForm() {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

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
        "http://localhost:5000/api/vacancy/addVacancy",
        { title, description, deadline },
        config
      );
      localStorage.setItem("authToken", data.token);
      console.log(data.token);

      navigate("/Vacancies");
    } catch (error) {
      console.log(error.response); // Add this line to log the error response
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/Vacancies");
    }
  }, []);


  return (
    <Container style={{ paddingTop: 50 }}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* First Row */}
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Add Title title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Second Row */}
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>Title Description</Form.Label>
            <Form.Control
              required
              type="text"
              as="textarea"
              rows={3}
              placeholder="Add Title description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Third Row */}
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom05">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              required
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit" className="btn-orange">Submit</Button>
      </Form>
    </Container>
  );
}

export default VacancyForm;

import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthService from "../../services/auth.service";
import { redirect, useNavigate } from "react-router-dom";
const DEFAULT_DATA = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    DEFAULT_DATA,
  });
  const [errors, setErrors] = useState(DEFAULT_DATA);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setErrors(DEFAULT_DATA);
      const response = await AuthService.register(formData);
      console.log(response);
      navigate("/");
      if (response) {
        setFormData(DEFAULT_DATA);
      }
    } catch (error) {
      const _errors = error?.response?.data?.errors;

      if (_errors) {
        const keys = Object.keys(_errors);
        setErrors({
          first_name: _errors?.first_name?.join(" ") || "",
          last_name: _errors?.last_name?.join(" ") || "",
          email: _errors?.email?.join(" ") || "",
          password: _errors?.password?.join(" ") || "",
          password_confirmation:
            _errors?.password_confirmation?.join(" ") || "",
        });
      }
    }
  }
  return (
    <Container className="mt-2">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First name</Form.Label>
          <Form.Control
            onChange={(e) => {
              setFormData({ ...formData, first_name: e.target.value });
            }}
            required
            type="text"
            placeholder="Enter first name"
          />
        </Form.Group>
        {errors.first_name && (
          <Alert style={{ border: 0 }} variant="danger">
            {errors.first_name}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            onChange={(e) => {
              setFormData({ ...formData, last_name: e.target.value });
            }}
            required
            type="text"
            placeholder="Enter last name"
          />
        </Form.Group>
        {errors.last_name && (
          <Alert style={{ border: 0 }} variant="danger">
            {errors.last_name}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            required
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        {errors.email && (
          <Alert style={{ border: 0 }} variant="danger">
            {errors.email}
          </Alert>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {errors.password && (
          <Alert style={{ border: 0 }} variant="danger">
            {errors.password}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Password confirmation</Form.Label>
          <Form.Control
            required
            onChange={(e) => {
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              });
            }}
            type="password"
            placeholder="Confirm your password"
          />
        </Form.Group>
        {errors.password_confirmation && (
          <Alert style={{ border: 0 }} variant="danger">
            {errors.password_confirmation}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Accepted terms and conditions"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

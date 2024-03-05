import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const DEFAULT_DATA = {
  email: "",
  password: "",
  credentials: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const [errors, setErrors] = useState(DEFAULT_DATA);
  const { setAuth } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setErrors(DEFAULT_DATA);
      const response = await AuthService.login(formData);
      if (response) {
        setFormData(DEFAULT_DATA);
        setAuth(response.token, response.user);
        navigate("/");
      }
    } catch (error) {
      const _errors = error?.response?.data;
      if (_errors) {
        setErrors({ credentials: _errors.message });
      }
    }
  }
  return (
    <Container className="mt-2">
      <Form onSubmit={onSubmit}>
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
        <Button variant="primary" type="submit">
          Login
        </Button>
        {errors.credentials && (
          <Alert className="mt-3" style={{ border: 0 }} variant="danger">
            {errors.credentials}
          </Alert>
        )}
      </Form>
    </Container>
  );
}

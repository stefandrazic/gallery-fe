import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
const DEFAULT_DATA = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const [errors, setErrors] = useState(DEFAULT_DATA);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setErrors(DEFAULT_DATA);
      const response = await AuthService.login(formData);
      console.log(response);
      if (response) {
        setFormData(DEFAULT_DATA);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (error) {
      const _errors = error?.response?.data?.errors;

      if (_errors) {
        const keys = Object.keys(_errors);
        setErrors({
          email: _errors?.email?.join(" ") || "",
          password: _errors?.password?.join(" ") || "",
        });
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
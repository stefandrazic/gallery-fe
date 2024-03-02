import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useAuth } from "../context/auth";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const { authToken, setLogin, setLogout } = useAuth();

  const logout = async () => {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      if (response) {
        setLogout();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Galleries
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to={"/"}>
            All Galleries
          </Nav.Link>
          <Nav.Link as={Link} to={"/create"}>
            Create Gallery
          </Nav.Link>
          <Nav.Link as={Link} to={"/login"}>
            Login
          </Nav.Link>
          <Nav.Link as={Link} to={"/register"}>
            Register
          </Nav.Link>
          <Nav.Link as={Button} onClick={() => logout()}>
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

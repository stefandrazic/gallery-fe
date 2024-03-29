import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useAuth } from "../context/auth";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const { authToken, setLogout, user } = useAuth();

  const logout = async () => {
    try {
      const response = await AuthService.logout();

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
          {authToken && (
            <>
              <Nav.Link as={Link} to={"/my-galleries"}>
                My Galleries
              </Nav.Link>
              <Nav.Link as={Link} to={"/create"}>
                Create Gallery
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {!authToken && (
            <>
              <Nav.Link as={Link} to={"/login"}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to={"/register"}>
                Register
              </Nav.Link>
            </>
          )}
          {authToken && (
            <Nav.Link as={Link} to={`/my-galleries`}>
              {user.first_name + " " + user.last_name}
            </Nav.Link>
          )}
          {authToken && (
            <Nav.Link as={Button} onClick={() => logout()}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

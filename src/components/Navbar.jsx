import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
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
        </Nav>
      </Container>
    </Navbar>
  );
}
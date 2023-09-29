import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../../style/AdminPanel.css"

function NavComponent() {
  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Link style={linkStyle} to="/">
          <Navbar.Brand
            href="#"
            className="NavTitle"
          >
            My Wallet
          </Navbar.Brand>
        </Link>

      </Container>
    </Navbar>
  );
}

export default NavComponent;


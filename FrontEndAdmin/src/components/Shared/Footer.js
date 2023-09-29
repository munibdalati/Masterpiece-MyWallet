import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import "../../style/AdminPanel.css";
import { Link } from "react-router-dom";

function Footer() {
  // Get the current year using JavaScript
  const currentYear = new Date().getFullYear();

  const facebookPageUrl = 'https://www.facebook.com/munib.aldalati'
  const twitterPageUrl = 'hhttps://twitter.com/munibaldalati'
  const linkedinPageUrl = 'https://www.linkedin.com/in/munib-dalati/'
  const email = 'munib.dalati@gmail.com'; 

  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <Container className="footer">
      <Row
        className="align-items-center text-center justify-content-center py-3 footer__row"
      >
        <Col className="">
          <Link style={linkStyle} to="/">

            <p className="footerTitle">My Wallet</p>
          </Link>
        </Col>
        <Col className="footer__copyright mb-4">
          Copyright {currentYear} Powered by Munib Al Dalati
        </Col>
        <Col className="d-flex justify-content-center gap-3">

          <a href={facebookPageUrl}>
            <i
              className="fa-brands fa-facebook-f"
              style={{ color: "#C08261", cursor: "pointer" }}
            ></i>
          </a>
          <a href={twitterPageUrl}>

            <i
              className="fa-brands fa-twitter"
              style={{ color: "#C08261", cursor: "pointer" }}
            ></i>
          </a>
          <a href={linkedinPageUrl}>

            <i
              className="fa-brands fa-linkedin-in"
              style={{ color: "#C08261", cursor: "pointer" }}
            ></i>
          </a>
          <a href={`mailto:${email}`}>

            <i
              class="fa-solid fa-envelope"
              style={{ color: "#C08261", cursor: "pointer" }}
            ></i>
          </a>

        </Col>
      </Row>
    </Container>
  );
}

export default Footer;

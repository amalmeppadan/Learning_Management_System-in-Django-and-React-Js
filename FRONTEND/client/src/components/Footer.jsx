import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Welcome to our learning platform, where knowledge meets
              innovation. Explore courses, enhance your skills, and stay ahead
              in your career with our expert-led content.
            </p>
          </Col>
          <Col md={4} className="offset-md-4 text-md-end">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  LinkedIn
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} LearningApp. All Rights
              Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Navbars = () => {
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Navbar.Brand href="#home">Learn Online</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/all-courses"}>
              Courses
            </Nav.Link>

            <NavDropdown title="Teacher" id="basic-nav-dropdown">
              {teacherLoginStatus != "true" && (
                <>
                  <NavDropdown.Item as={Link} to={"/teacher-login"}>
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/teacher-register"}>
                    Register
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                </>
              )}
              {teacherLoginStatus == "true" && (
                <>
                  <NavDropdown.Item as={Link} to={"/teacher-dashboard"}>
                    Dashboad
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/teacher-logout"}>
                    Logout
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <NavDropdown title="User" id="basic-nav-dropdown">
              {studentLoginStatus != "true" && (
                <>
                  <NavDropdown.Item as={Link} to={"/user-login"}>
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/user-register"}>
                    Register
                  </NavDropdown.Item>
                </>
              )}
              <NavDropdown.Divider />

              {studentLoginStatus == "true" && (
                <>
                  <NavDropdown.Item as={Link} to={"/user-dashboard"}>
                    Dashboad
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/user-logout"}>
                    Logout
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;

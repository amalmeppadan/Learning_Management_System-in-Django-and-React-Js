import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";
const Login = () => {
  const [studentLoginData, SetstudentLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, SeterrorMsg] = useState(""); //showing for error messages..

  const handleChange = (event) => {
    SetstudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    const studentFormData = new FormData();
    studentFormData.append("email", studentLoginData.email);
    studentFormData.append("password", studentLoginData.password);

    try {
      axios
        .post(baseURL + "student-login", studentFormData)
        .then((response) => {
          // local storage setup
          if (response.data.bool == true) {
            localStorage.setItem("studentLoginStatus", true);
            localStorage.setItem("studentId", response.data.student_id);
            window.location.href = "/user-dashboard";
          } else {
            SeterrorMsg("Invalid Email or Password");
          }
        });
    } catch (error) {
      console.log(error);
      SeterrorMsg("An error occurred during login. Please try again.");
    }
  };

  // redirect to the dashboard

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus == "true") {
    window.location.href = "/user-dashboard";
  }

  useEffect(() => {
    document.title = "Student Login";
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">User Login</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={studentLoginData.email}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={studentLoginData.password}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

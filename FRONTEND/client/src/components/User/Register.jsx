import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/student/";

const Register = () => {
  const [studentData, SetstudentData] = useState({
    full_name: "",
    email: "",
    password: "",
    username: "",
    intrested_categories: "",
    status: "",
  });

  // Change element value

  const handleChange = (event) => {
    SetstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  //submit form
  const submitForm = (event) => {
    event.preventDefault();

    // Validate all fields are filled
    if (
      !studentData.full_name ||
      !studentData.email ||
      !studentData.password ||
      !studentData.username ||
      !studentData.intrested_categories
    ) {
      SetstudentData({
        ...studentData,
        status: "error",
        errorMessage: "Please fill in all required fields.", // Set the error message
      });
      return;
    }

    const StudentFormData = new FormData();
    StudentFormData.append("full_name", studentData.full_name);
    StudentFormData.append("email", studentData.email);
    StudentFormData.append("password", studentData.password);
    StudentFormData.append("username", studentData.username);
    StudentFormData.append(
      "intrested_categories",
      studentData.intrested_categories
    );

    try {
      axios.post(baseURL, StudentFormData).then((response) => {
        SetstudentData({
          full_name: "",
          email: "",
          password: "",
          username: "",
          intrested_categories: "",
          status: "success",
        });
      });
    } catch (error) {
      console.log({ status: "error" });
      SetstudentData({ status: "error" });
    }
  };

  useEffect(() => {
    document.title = "Student Register";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {studentData.status == "success" && (
            <p className="text-success">Thanks for your Registeration</p>
          )}
          {studentData.status == "error" && (
            <p className="text-danger">All fields are required</p>
          )}
          <div className="card">
            <h5 className="card-header">User Registeration</h5>
            <div className="card-body">
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-3">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    value={studentData.full_name}
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    placeholder="Enter Fullname"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={studentData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={studentData.username}
                    onChange={handleChange}
                    name="username"
                    type="text"
                    placeholder="Enter username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={studentData.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Intrests</Form.Label>
                  <textarea
                    value={studentData.intrested_categories}
                    onChange={handleChange}
                    name="intrested_categories"
                    className="form-control"
                  ></textarea>
                  <div className=" form-text">Php,Python,Javascript,etc</div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

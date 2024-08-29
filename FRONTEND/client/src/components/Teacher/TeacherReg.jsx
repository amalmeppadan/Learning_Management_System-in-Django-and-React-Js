import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/teacher/";

const TeacherReg = () => {
  const [teacherData, SetTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobileno: "",
    skills: "",
    status: "",
  });

  // Change element value

  const handleChange = (event) => {
    SetTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  //submit form
  const submitFormData = (event) => {
    event.preventDefault();

    const TeacherFormData = new FormData();
    TeacherFormData.append("full_name", teacherData.full_name);
    TeacherFormData.append("email", teacherData.email);
    TeacherFormData.append("password", teacherData.password);
    TeacherFormData.append("qualification", teacherData.qualification);
    TeacherFormData.append("mobileno", teacherData.mobile_no);
    TeacherFormData.append("skills", teacherData.skills);

    try {
      axios.post(baseURL, TeacherFormData).then((response) => {
        SetTeacherData({
          full_name: "",
          email: "",
          password: "",
          qualification: "",
          mobileno: "",
          skills: "",
          status: "success",
        });
      });
    } catch (error) {
      console.log({ status: "error" });
    }
  };

  // redirect to the dashboard

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus == "true") {
    window.location.href = "/teacher-dashboard";
  }

  useEffect(() => {
    document.title = "Teacher Register";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {/* toast message */}
          {teacherData.status == "success" && (
            <p className="text-success">Thanks for your Registeration</p>
          )}
          {teacherData.status == "error" && (
            <p className="text-danger">Something went wrong</p>
          )}
          <div className="card">
            <h5 className="card-header">Teacher Registeration</h5>
            <div className="card-body">
              <Form onSubmit={submitFormData}>
                <Form.Group className="mb-3">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    value={teacherData.full_name}
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    placeholder="Enter Fullname"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={teacherData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={teacherData.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    value={teacherData.qualification}
                    onChange={handleChange}
                    name="qualification"
                    type="text"
                    placeholder="Enter qualification"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    value={teacherData.mobileno}
                    onChange={handleChange}
                    name="mobileno"
                    type="text"
                    placeholder="Enter mobile number"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Skills</Form.Label>
                  <textarea
                    value={teacherData.skills}
                    onChange={handleChange}
                    name="skills"
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

export default TeacherReg;

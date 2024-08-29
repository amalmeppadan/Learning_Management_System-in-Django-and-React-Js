import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logos from "/src/assets/pys.jpg";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { AiOutlineYoutube } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";
const siteURL = "http://127.0.0.1:8000/";

const CourseDetail = () => {
  const { course_id } = useParams();
  const studentId = localStorage.getItem("studentId");

  const [courseData, SetcourseData] = useState([]);
  const [chapterData, SetchapterData] = useState([]);
  const [teacherData, SetteacherData] = useState([]);
  const [relatedCourseData, SetrelatedCourseData] = useState([]);
  const [userLoginStatus, SetuserLoginStatus] = useState();
  const [enrollStatus, SetenrollStatus] = useState();
  const [ratingStatus, SetratingStatus] = useState();
  const [AvgStatus, SetAvgStatus] = useState(0);

  //fetch data...

  useEffect(() => {
    //fetch data...
    try {
      axios.get(baseURL + "course/" + course_id).then((res) => {
        SetcourseData(res.data);
        SetteacherData(res.data.teacher);
        SetchapterData(res.data.course_chapter);
        SetrelatedCourseData(JSON.parse(res.data.related_videos));
        if (res.data.course_rating != "" && res.data.course_rating != null) {
          SetAvgStatus(res.data.course_rating);
        }
      });
    } catch (error) {
      console.log(error);
    }

    //fetch the enroll status..
    try {
      axios
        .get(baseURL + "student_enroll_status/" + studentId + "/" + course_id)
        .then((res) => {
          if (res.data.bool == true) {
            SetenrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    //fetch the rating status..
    try {
      axios
        .get(baseURL + "fetch-rating-status/" + studentId + "/" + course_id)
        .then((res) => {
          if (res.data.bool == true) {
            SetratingStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus == "true") {
      SetuserLoginStatus("success");
    }
  }, []);

  // enroll course

  const enrollCourse = (event) => {
    event.preventDefault();
    const studentId = localStorage.getItem("studentId");
    const courseFormData = new FormData();

    courseFormData.append("course", course_id);
    courseFormData.append("student", studentId);
    courseFormData.append("title", courseData.title);

    try {
      axios
        .post(baseURL + "student-enroll-course/", courseFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "You have successfully enrolled in this course",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            SetenrollStatus("success");
            // window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [shows, setShows] = useState(false);

  const handleClosed = () => setShow(false);
  const handleSee = () => setShow(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  //add review..

  const [ratingData, SetratingData] = useState({
    rating: "",
    review: "",
  });

  const handleChange = (event) => {
    SetratingData({
      ...ratingData,
      [event.target.name]: event.target.value,
    });
  };

  //submitting review....

  const submitForm = (event) => {
    event.preventDefault();

    const courseFormData = new FormData();

    courseFormData.append("course", course_id);
    courseFormData.append("student", studentId);
    courseFormData.append("rating", ratingData.rating);
    courseFormData.append("reviews", ratingData.review);

    try {
      axios.post(baseURL + "course-rating/", courseFormData).then((res) => {
        Swal.fire({
          title: "Rating has been saved",
          icon: "success",
          toast: true,
          timer: 5000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });

        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img
            src={courseData.featured_img}
            height={"300px"}
            width={"350px"}
            className="thumbnail"
          />
        </div>
        <div className="col-md-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p className="fw-bold">
            Course By:
            <Link to={`/teacher-detail/${teacherData.id}`}>
              {teacherData.full_name}
            </Link>
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 Minuts</p>
          <p className="fw-bold">
            Total Enrolled:{" "}
            {courseData.total_enrolled_students
              ? `${courseData.total_enrolled_students} Students`
              : "0 Students"}
          </p>
          <p className="fw-bold">
            Rating:{AvgStatus}/5
            {enrollStatus === "success" && userLoginStatus === "success" && (
              <>
                {ratingStatus != "success" && (
                  <button
                    className="btn btn-warning btn-sm ms-2"
                    onClick={handleShow}
                    variant="primary"
                  >
                    Rating
                  </button>
                )}
                {ratingStatus == "success" && (
                  <small className="badge bg-warning text-dark ms-2">
                    You already rated this course
                  </small>
                )}

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Rate for {courseData.title ? courseData.title : "Course"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Rating</Form.Label>
                        <select
                          value={ratingData.rating}
                          onChange={handleChange}
                          className="form-control"
                          name="rating"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <Form.Text className="text-muted"></Form.Text>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          name="review"
                          value={ratingData.review}
                          onChange={handleChange}
                          as="textarea"
                          rows={10}
                          placeholder="Enter your review here"
                        />
                      </Form.Group>
                      <Button
                        onClick={submitForm}
                        variant="primary"
                        type="button"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </>
            )}
          </p>

          {enrollStatus === "success" && userLoginStatus === "success" && (
            <p>
              <span className="">You are already enroll this course</span>
            </p>
          )}
          {userLoginStatus === "success" && enrollStatus !== "success" && (
            <p>
              <button
                onClick={enrollCourse}
                type="button"
                className="btn btn-success"
              >
                Enroll in this course
              </button>
            </p>
          )}

          {userLoginStatus !== "success" && (
            <p>
              <Link to={"/user-login"}>Please login to enroll this course</Link>
            </p>
          )}
        </div>
      </div>
      {/* course videos */}
      {enrollStatus === "success" && userLoginStatus === "success" && (
        <div className="col-2">
          <Card className=" mt-4 " style={{ width: "65rem" }}>
            <Card.Header>
              <h5>In this Course</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {chapterData.map((chapter, index) => (
                <ListGroup.Item key={index}>
                  {chapter.title}
                  <span className="float-end">
                    <span className="me-5">1 Hour 30 minuts</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={handleSee}
                    >
                      <AiOutlineYoutube size={20} />
                    </button>
                  </span>
                  {/* Video Modal */}
                  <Modal shows={shows} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {courseData.title ? courseData.title : "Course"}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="ratio ratio-16x9">
                        <iframe
                          // src={chapter.video}
                          title="YouTube video"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClosed}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* video modal end */}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>
      )}

      {/* related courses */}

      <h3 className=" pb-1 mb-4 mt-3">Related Courses</h3>
      <div className="row">
        {relatedCourseData.map((rcourse, index) => (
          <div key={index} className="col-md-3">
            <Card style={{ width: "16rem" }}>
              <Link target="__blank" to={`/detail/${rcourse.pk}`}>
                <Card.Img
                  variant="top"
                  src={`${siteURL}media/${rcourse.fields.featured_img}`}
                  alt={rcourse.fields.title}
                />
              </Link>
              <Card.Body>
                <Card.Title>
                  <a href="#">
                    <Link to={`/detail/${rcourse.pk}`}>
                      {" "}
                      {rcourse.fields.title}
                    </Link>
                  </a>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;

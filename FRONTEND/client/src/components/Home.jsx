import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import logo from "../assets/rect.jpg";
import { Link } from "react-router-dom";
import AllCourses from "./Courses/AllCourses";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const Home = () => {
  const [courseData, SetcourseData] = useState([]);
  const [popularCourseData, SetpopularCourseData] = useState([]);
  const [popularTeacherData, SetpopularTeacherData] = useState([]);

  //fetch all course data,,
  useEffect(() => {
    try {
      axios.get(baseURL + "course/?result=4").then((res) => {
        SetcourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    //fetching all popular coures

    try {
      axios.get(baseURL + "popular-courses/?popular=1").then((res) => {
        SetpopularCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    //fetching all popular teachers....

    try {
      axios.get(baseURL + "popular-teachers/?popular=1").then((res) => {
        SetpopularTeacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "LMS | Homepage";
  }, []);
  return (
    <div className="container mt-4">
      {/* latest courses */}
      <h3 className=" pb-1 mb-4">
        Latest Courses
        <Link to={"/all-courses"} className="float-end btn btn-primary">
          See all
        </Link>
      </h3>
      <div className="row">
        {courseData &&
          courseData.map((course, index) => (
            <div key={index} className="col-md-3 mb-4">
              <Card style={{ width: "16rem" }}>
                <Link to={`/detail/${course.id}`}>
                  <Card.Img
                    variant="top"
                    src={course.featured_img}
                    alt={course.title}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>
                    <a href="#">
                      <Link to={`/detail/${course.id}`}> {course.title} </Link>
                    </a>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
      {/* end lates courses */}

      {/* Popular courses */}
      <h3 className=" pb-1 mb-4 mt-5">
        Popular Courses
        <Link to={"/popular-courses"} className="float-end btn btn-primary">
          See all
        </Link>
      </h3>
      <div className="row">
        {popularCourseData &&
          popularCourseData.map((row, index) => (
            <div key={index} className="col-md-3">
              <Card style={{ width: "16rem" }}>
                <Link to={`detail/${row.course.id}`}>
                  <Card.Img variant="top" src={row.course.featured_img} />
                </Link>
                <Card.Body>
                  <Card.Title>
                    <Link to={`detail/${row.course.id}`}>
                      {row.course.title}
                    </Link>
                  </Card.Title>
                </Card.Body>
                <Card.Footer>
                  <span>Rating: {row.rating}/5</span>
                  <span className="float-end">Views:748873</span>
                </Card.Footer>
              </Card>
            </div>
          ))}
      </div>
      {/* end popular courses */}

      {/* Popular teachers */}
      <h3 className=" pb-1 mb-4 mt-5">
        Our Featured Teachers{" "}
        <Link to={"/popular-teacher"} className="float-end btn btn-primary">
          See all
        </Link>
      </h3>
      <div className="row">
        {popularTeacherData.map((teacher, index) => (
          <div key={index} className="col-md-3">
            <Card style={{ width: "16rem" }}>
              <Link to={`teacher-detail/${teacher.id}`}>
                <Card.Img variant="top" src={teacher.profile_img} />
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link to={`teacher-detail/${teacher.id}`}>
                    {teacher.full_name}
                  </Link>
                </Card.Title>
              </Card.Body>
              <Card.Footer>
                <span>Total Courses: {teacher.total_teacher_courses}</span>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
      {/* end popular teachers */}
    </div>
  );
};

export default Home;
